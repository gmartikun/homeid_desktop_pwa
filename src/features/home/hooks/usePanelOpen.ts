import { useMutation } from "react-query";

import { panelOpen } from "@src/api";

export const usePanelOpen = () => {
  return useMutation(({ panel_id }: { panel_id: number }) =>
    panelOpen(panel_id)
  );
};

export default usePanelOpen;
