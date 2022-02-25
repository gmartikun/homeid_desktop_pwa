export enum EmCallEvents {
  PICKUP = "pickup",
  UNMUTE = "unmute",
  FINISH = "finish",
}

export type TpCall = {
  event: EmCallEvents;
};
