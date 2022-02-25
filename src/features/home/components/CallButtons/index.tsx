import { FC, memo } from "react";
import cn from "classnames";

import { Timer } from "@src/features/app";
import { EmCallEvents } from "@src/types";

import { ReactComponent as CancelIcon } from "../../assets/cancel.svg";
import { ReactComponent as MicIcon } from "../../assets/mic.svg";
import { ReactComponent as LockIcon } from "../../assets/lock.svg";

import classes from "./style.module.css";

const CallButtonsRaw: FC<CallButtonsProps> = (props) => {
  const { onCancel, onUnmute, onOpen, callStatus } = props;

  const isUnmute = callStatus === EmCallEvents.UNMUTE;

  return (
    <div className={classes.buttons}>
      <button className={classes.button} type="button" onClick={onCancel}>
        <div className={cn(classes.icon, classes.cancel)}>
          <CancelIcon />
        </div>
        <span className={classes.label}>Завершить</span>
      </button>
      {isUnmute ? (
        <div className={classes.button}>
          <Timer className={classes.timer} time={0} isPlus />
        </div>
      ) : (
        <button className={classes.button} type="button" onClick={onUnmute}>
          <div className={cn(classes.icon, classes.mic)}>
            <MicIcon />
          </div>
          <span className={classes.label}>Говорить</span>
        </button>
      )}

      <button className={classes.button} type="button" onClick={onOpen}>
        <div className={cn(classes.icon, classes.lock)}>
          <LockIcon />
        </div>
        <span className={classes.label}>Открыть</span>
      </button>
    </div>
  );
};

type CallButtonsProps = {
  onCancel: () => void;
  onUnmute: () => void;
  onOpen: () => void;
  callStatus: EmCallEvents | "";
};

export const CallButtons = memo(CallButtonsRaw);
export default CallButtons;
