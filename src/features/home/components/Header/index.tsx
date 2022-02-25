import { FC, memo } from "react";

import { ReactComponent as LogoIcon } from "../../assets/homeid.svg";
import { ReactComponent as InfoIcon } from "../../assets/info.svg";

import { useDrawer } from "../../hooks";

import classes from "./style.module.css";

const HeaderRaw: FC = () => {
  const { onOpenDrawer } = useDrawer();

  return (
    <div className={classes.header}>
      <div className={classes.logo}>
        <LogoIcon />
      </div>
      <button className={classes.info} type="button" onClick={onOpenDrawer}>
        <InfoIcon />
      </button>
    </div>
  );
};

export const Header = memo(HeaderRaw);
export default Header;
