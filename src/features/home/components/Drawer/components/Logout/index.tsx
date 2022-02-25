import { FC, memo } from "react";

import classes from "./style.module.css";

const LogoutRaw: FC<LogoutProps> = (props) => {
  const { onClick } = props;

  return (
    <button type="button" onClick={onClick} className={classes.logout}>
      Выйти
    </button>
  );
};

type LogoutProps = {
  onClick: () => void;
};

export const Logout = memo(LogoutRaw);
export default Logout;
