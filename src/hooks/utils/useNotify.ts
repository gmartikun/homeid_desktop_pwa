import { useContext } from "react";

import { NotifyContext } from "@src/features/app";

export const useNotify = () => {
  return useContext(NotifyContext);
};

export default useNotify;
