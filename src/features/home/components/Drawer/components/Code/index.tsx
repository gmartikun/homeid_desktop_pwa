import { FC, memo } from "react";

import classes from "./style.module.css";

const CodeRaw: FC<CodeProp> = (props) => {
  const { code } = props;
  return (
    <div className={classes.code}>
      <span className={classes.label}>Код двери</span>
      <span className={classes.value}>{`#${code}`}</span>
    </div>
  );
};

type CodeProp = {
  code: string;
};

export const Code = memo(CodeRaw);
export default Code;
