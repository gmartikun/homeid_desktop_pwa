import { EmCallEvents } from "@src/types";

export const getIsPickup = (message: any): boolean => {
  const history = message && message.publications;
  return !!history.find(
    (item: any) =>
      item.data && item.data.event && item.data.event === EmCallEvents.PICKUP
  );
};

export default getIsPickup;
