import { useQuery } from "react-query";

import { getPanelHierarchy } from "@src/api";

export const useGetPanelHierarchy = (panel_id: number) => {
  return useQuery("hierarchy", () => getPanelHierarchy(panel_id));
};

export default useGetPanelHierarchy;
