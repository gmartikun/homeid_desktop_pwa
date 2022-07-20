import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import throttle from "lodash/throttle";

import { centrifuge, webrtc } from "@src/libs";
import { EmCallEvents, EmNotifyTypes } from "@src/types";
import { useQuery, useNotify } from "@src/hooks";

import { useCallEvent, usePanelOpen } from "../../hooks";
import { getIsPickup } from "../../services";

import CallButtons from "../../components/CallButtons";

import classes from "./style.module.css";

const CallRaw: FC = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const { onShowNotify } = useNotify();
  const { mutateAsync: callEvent } = useCallEvent();
  const { mutateAsync: panelOpen } = usePanelOpen();

  const callUuid = query.get("callUuid");
  const panel_id = query.get("panel_id");

  const channel = `calls_${callUuid}`;
  const [canSubscribe, setCanSubscribe] = useState(false);
  const [callStatus, setCallStatus] = useState<EmCallEvents | "">("");

  const remoteStreamRef = useRef<any>(null);
  const callStatusRef = useRef(callStatus);
  callStatusRef.current = callStatus;

  const onOpenDoorThrottle = useMemo(
    () =>
      throttle(() => {
        if (panel_id) panelOpen({ panel_id: parseInt(panel_id) });

        if (callUuid && callStatus !== EmCallEvents.UNMUTE) {
          callEvent({ callUuid, event: "FINISH" });

          onShowNotify({
            type: EmNotifyTypes.SUCCESS,
            description: "Дверь успешно открыта",
          });

          navigate("/home", { replace: true });
        }
      }, 5000),
    [
      callUuid,
      callEvent,
      callStatus,
      panel_id,
      panelOpen,
      onShowNotify,
      navigate,
    ]
  );

  const onCancelCall = useCallback(() => {
    if (callUuid && callStatus === EmCallEvents.UNMUTE) {
      callEvent({ callUuid, event: "FINISH" });
    }

    onShowNotify({
      type: EmNotifyTypes.SUCCESS,
      description: "Звонок успешно завершен",
    });

    navigate("/home", { replace: true });
  }, [callEvent, callUuid, callStatus, onShowNotify, navigate]);

  const onUnmuteCall = useCallback(() => {
    if (callUuid) callEvent({ callUuid, event: "UNMUTE" });
    setCallStatus(EmCallEvents.UNMUTE);
  }, [callUuid, callEvent]);

  const onOpenDoor = useCallback(onOpenDoorThrottle, [onOpenDoorThrottle]);

  useEffect(() => {
    if (canSubscribe) {
      const pc = webrtc.init();
      webrtc
        .start()
        .then(() => {
          const onIceCandidate = (event: any) => {
            if (event.candidate) {
              centrifuge.send(channel, {
                sender: "mobile",
                event: "candidate",
                candidate: event.candidate.candidate,
                sdpMLineIndex: event.candidate.sdpMLineIndex,
                sdpMid: event.candidate.sdpMid,
              });
            }
          };

          const onSignalingStateChange = ({ currentTarget }: any) => {
            const { signalingState } = currentTarget;

            if (signalingState === "closed") {
              navigate("/home", { replace: true });
            }
          };

          const onTrack = (event: any) => {
            if (!remoteStreamRef.current.srcObject) {
              remoteStreamRef.current.srcObject = event.streams[0];
            }
          };

          pc.addEventListener("icecandidate", onIceCandidate);
          pc.addEventListener("signalingstatechange", onSignalingStateChange);
          pc.addEventListener("track", onTrack);

          centrifuge.send(channel, {
            sender: "mobile",
            event: "register",
          });

          centrifuge.signed(channel).on("publish", async ({ data }: any) => {
            if (
              callStatusRef.current !== EmCallEvents.FINISH &&
              data.event === EmCallEvents.FINISH
            ) {
              onShowNotify({
                type: EmNotifyTypes.SUCCESS,
                description: "Звонок успешно завершен",
              });
              navigate("/home", { replace: true });
            } else {
              if (data.event === "offer" && data.sender !== "mobile") {
                if (data.sdp) {
                  const sdp = { sdp: data.sdp, type: data.type };
                  await pc.setRemoteDescription(sdp);
                  const answer = await pc.createAnswer();

                  centrifuge.send(channel, {
                    sender: "mobile",
                    event: "answer",
                    type: answer.type,
                    sdp: answer.sdp,
                  });
                }
              }
              if (
                data.event === "candidate" &&
                data.candidate &&
                data.sender !== "mobile"
              ) {
                const candidate = {
                  candidate: data.candidate,
                  sdpMLineIndex: data.sdpMLineIndex,
                  sdpMid: data.sdpMid,
                };
                await pc.addIceCandidate(candidate);
              }
            }
          });
        })
        .catch((e) => {
          onShowNotify({
            type: EmNotifyTypes.WARNING,
            description: "Микрофон не обнаружен",
          });
          navigate("/home", { replace: true });
        });

      return () => {
        webrtc.close();
      };
    }
  }, [canSubscribe, callUuid, navigate, channel, onShowNotify]);

  useEffect(() => {
    if (callUuid) {
      centrifuge.subscribe(channel);
      centrifuge
        .signed(channel)
        .history()
        .then((message: any) => {
          if (getIsPickup(message)) {
            navigate("/home", { replace: true });
          } else {
            callEvent({ callUuid, event: "PICKUP" })
              .then(() => {
                setCanSubscribe(true);
              })
              .catch(() => {
                onShowNotify({
                  type: EmNotifyTypes.WARNING,
                  description: "На звонок уже ответили",
                });
                navigate("/home", { replace: true });
              });
          }
        });

      return () => {
        centrifuge.unsubscribe(channel);
      };
    }
  }, [callUuid, callEvent, channel, navigate, onShowNotify]);

  return (
    <div className={classes.call}>
      <video
        className={classes.callVideo}
        ref={remoteStreamRef}
        style={{
          height:
            (window.innerHeight / window.innerWidth) * window.innerWidth + "px",
        }}
        playsInline
        autoPlay
      />

      <CallButtons
        callStatus={callStatus}
        onCancel={onCancelCall}
        onUnmute={onUnmuteCall}
        onOpen={onOpenDoor}
      />
    </div>
  );
};

export const Call = memo(CallRaw);
export default Call;
