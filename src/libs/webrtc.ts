let pc: RTCPeerConnection | null;
let localStream: MediaStream | null;

const configuration = {
  iceServers: [
    { url: "stun:stun.l.google.com:19302" } as any,
    {
      url: "turn:turn.homeid.gmar.by:3478",
      username: "gmar",
      credential: "gmar",
    },
  ],
};

export const init = () => {
  pc = new RTCPeerConnection(configuration);
  return pc;
};

export const start = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    stream.getTracks().forEach((track) => pc?.addTrack(track, stream));
    localStream = stream;
  } catch (e) {
    throw new Error("WebRtc start failure");
  }
};

export const close = () => {
  if (localStream) localStream.getTracks().forEach((track) => track.stop());
  pc?.close();
  pc = null;
};
