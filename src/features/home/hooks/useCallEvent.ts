import { useMutation } from "react-query";

import { callEvent } from "@src/api";

export const useCallEvent = () => {
  return useMutation(
    ({ callUuid, event }: { callUuid: string; event: string }) =>
      callEvent(callUuid, event)
  );
};

export default useCallEvent;
