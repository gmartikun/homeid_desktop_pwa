import { useContext } from "react";

import { DrawerContext } from "../contexts";

export const useDrawer = () => {
  return useContext(DrawerContext);
};

export default useDrawer;
