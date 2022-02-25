import axios from "@src/axios";

import { TpPanel } from "@src/types";

export const getPanelHierarchy = async (
  panel_id: number
): Promise<TpPanel[]> => {
  const { data } = await axios.get(
    `/mobile-api/v1/panels/${panel_id}/hierarchy`
  );
  return data;
};

export const panelLock = async (
  panel_id: number,
  internal_id: number
): Promise<any> => {
  const { data } = await axios.delete(
    `/mobile-api/v1/panels/${panel_id}/lock/${internal_id}`
  );
  return data;
};

export const panelOpen = async (panel_id: number): Promise<any> => {
  const { data } = await axios.delete(
    `/mobile-api/v1/panels/${panel_id}/door-lock`
  );
  return data;
};
