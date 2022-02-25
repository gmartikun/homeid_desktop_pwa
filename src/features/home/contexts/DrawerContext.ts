import { createContext } from "react";

import { EmDrawerStatuses } from "@src/types";

type TpDrawerContext = {
  status: EmDrawerStatuses;
  onCloseDrawer: () => void;
  onOpenDrawer: () => void;
};

export const DrawerContext = createContext<TpDrawerContext>({
  status: EmDrawerStatuses.CLOSE,
  onCloseDrawer: () => {},
  onOpenDrawer: () => {},
});

export default DrawerContext;
