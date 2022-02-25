import { ChangeEvent, FC, memo } from "react";

import classes from "./style.module.css";

const CheckboxRaw: FC<CheckboxProps> = (props) => {
  const { id, name, label, checked, onChange } = props;

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    onChange(name, value);
  };

  return (
    <div className={classes.checkbox}>
      <input
        className={classes.checkboxInput}
        type="checkbox"
        id={`${id}`}
        onChange={onChangeInput}
        checked={checked}
      />
      <label className={classes.checkboxLabel} htmlFor={`${id}`}>
        {label}
      </label>
    </div>
  );
};

type CheckboxProps = {
  id: string | number;
  name: string;
  label: string;
  checked: boolean;
  onChange: (key: string, value: boolean) => void;
};

export const Checkbox = memo(CheckboxRaw);
export default Checkbox;
