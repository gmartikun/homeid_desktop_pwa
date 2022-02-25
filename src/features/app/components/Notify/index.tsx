import { FC, memo, useEffect, useMemo } from "react";
import cn from "classnames";

import { TpNotify, EmNotifyTypes } from "@src/types";

import { ReactComponent as SuccessIcon } from "../../assets/notify-success.svg";
import { ReactComponent as ErrorIcon } from "../../assets/notify-error.svg";
import { ReactComponent as WarningIcon } from "../../assets/notify-warning.svg";
import { ReactComponent as CrossIcon } from "../../assets/notify-cross.svg";

import classes from "./style.module.css";

const NotifyRaw: FC<NotifyProps> = (props) => {
  const { notify, onHideNotify } = props;
  const { type, title, description } = notify;

  const renderIcon = useMemo(() => {
    if (type === EmNotifyTypes.SUCCESS) {
      return <SuccessIcon />;
    } else if (type === EmNotifyTypes.ERROR) {
      return <ErrorIcon />;
    } else if (type === EmNotifyTypes.WARNING) {
      return <WarningIcon />;
    }

    return null;
  }, [type]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onHideNotify();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onHideNotify]);

  return (
    <div className={cn(classes.notify, classes[type])}>
      <button type="button" onClick={onHideNotify} className={classes.cross}>
        <CrossIcon />
      </button>
      <div className={classes.icon}>{renderIcon}</div>
      {title && <h3 className={classes.title}>{title}</h3>}
      {description && (
        <span className={classes.description}>{description}</span>
      )}
    </div>
  );
};

type NotifyProps = {
  notify: TpNotify;
  onHideNotify: () => void;
};

export const Notify = memo(NotifyRaw);
export default Notify;
