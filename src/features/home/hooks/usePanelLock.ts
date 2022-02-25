import { useMutation } from "react-query";

import { panelLock } from "@src/api";

export const usePanelLock = () => {
  return useMutation(
    ({ panel_id, internal_id }: { panel_id: number; internal_id: number }) =>
      panelLock(panel_id, internal_id)
  );
};

export default usePanelLock;
