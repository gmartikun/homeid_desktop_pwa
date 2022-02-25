import { useQuery } from "react-query";

import { getVAPIDKey } from "@src/api";

export const useGetVapidKey = () => {
  return useQuery("vapid", getVAPIDKey, { staleTime: 0 });
};

export default useGetVapidKey;
