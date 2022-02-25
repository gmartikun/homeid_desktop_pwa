export enum EmNotifyTypes {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
}

export type TpNotify = {
  type: EmNotifyTypes | "";
  title?: string;
  description?: string;
};
