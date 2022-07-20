import { FC, memo } from "react";

import { TpPanelLockUI } from "@src/types";

import { ReactComponent as DoorLargeIcon } from "../../assets/door-large.svg";
import { ReactComponent as DoorIcon } from "../../assets/door.svg";
import { ReactComponent as BasementIcon } from "../../assets/basement.svg";
import { ReactComponent as BikeIcon } from "../../assets/bike.svg";
import { ReactComponent as BarrierIcon } from "../../assets/barrier.svg";
import { ReactComponent as Gateicon } from "../../assets/gate.svg";

import classes from "./style.module.css";

const icons: Record<string, any> = {
  door: DoorIcon,
  basement: BasementIcon,
  bike: BikeIcon,
  barrier: BarrierIcon,
  gate: Gateicon,
};

const ButtonsRaw: FC<ButtonsProps> = (props) => {
  const { items, onClickButton } = props;

  const renderItem = (button: TpPanelLockUI) => {
    const { is_main_door, internal_id, icon_type, title } = button;

    if (is_main_door) {
      return (
        <div className={classes.colMain} key={internal_id}>
          <button
            className={classes.btnMain}
            type="button"
            onClick={() => onClickButton(button)}
          >
            <DoorLargeIcon />
            <span>Главный вход</span>
          </button>
        </div>
      );
    }

    const Icon = icons[icon_type] || DoorIcon;

    return (
      <div className={classes.col} key={internal_id}>
        <button
          className={classes.btnCommon}
          type="button"
          onClick={() => onClickButton(button)}
        >
          <span className={classes.btnCommonIcon}>
            <Icon />
          </span>
          <span className={classes.btnCommonText}>{title}</span>
        </button>
      </div>
    );
  };

  return <div className={classes.row}>{items.map(renderItem)}</div>;
};

type ButtonsProps = {
  items: TpPanelLockUI[];
  onClickButton: (button: TpPanelLockUI) => void;
};

export const Buttons = memo(ButtonsRaw);
export default Buttons;
