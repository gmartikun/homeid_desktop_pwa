import axios from "@src/axios";

import { TpCall } from "@src/types";

export const callEvent = async (
  callUuid: string,
  event: string
): Promise<TpCall> => {
  const { data } = await axios.post(`/mobile-api/v1/calls/${callUuid}/events`, {
    event,
  });
  return data;
};
