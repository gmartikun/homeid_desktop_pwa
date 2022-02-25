import { TpUserAddress } from "./user";

export enum EmPanelRoles {
  MASTER = "master",
  SLAVE = "slave",
}

export enum EmPanelTypes {
  MAIN = "main",
  NANO = "nano",
  GATE = "gate",
}

export type TpPanelLock = {
  internal_id: number;
  is_main_door: boolean;
  title: string;
  icon_type: string;
};

export type TpPanelLockUI = {
  panel_id: number;
} & TpPanelLock;

export type TpPanel = {
  door_code: string;
  number: number;
  apartment_id: number;
  panel_id: number;
  panel_role: EmPanelRoles;
  panel_type: EmPanelTypes;
  address: TpUserAddress;
  locks: TpPanelLock[];
};
