import { FC, memo } from "react";
import cn from "classnames";

import classes from "./style.module.css";

const LoaderRaw: FC<LoaderProps> = (props) => {
  const { hasText = true, width = 20, height = 20, skin = "dark" } = props;

  return (
    <div className={classes.container}>
      <div
        className={cn(classes.wheel, classes[skin])}
        style={{ width: width + "px", height: height + "px" }}
      />
      {hasText && (
        <div className={cn(classes.text, classes[`${skin}Text`])}>
          Загрузка...
        </div>
      )}
    </div>
  );
};

type LoaderProps = {
  hasText?: boolean;
  width?: number;
  height?: number;
  skin?: "dark" | "light";
};

const Loader = LoaderRaw;
export default memo(Loader);
