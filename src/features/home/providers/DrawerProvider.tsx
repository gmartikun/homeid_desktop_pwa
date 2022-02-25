import { FC, memo, ReactNode, useCallback, useMemo, useState } from "react";

import { EmDrawerStatuses } from "@src/types";
import { useUser } from "@src/hooks";

import { DrawerContext } from "../contexts";

import Drawer from "../components/Drawer";

const DrawerProviderRaw: FC<DrawerProviderProps> = (props) => {
  const { children } = props;

  const { user, logoutUser } = useUser();
  const [status, setStatus] = useState(EmDrawerStatuses.CLOSE);

  const onOpenDrawer = useCallback(() => {
    setStatus(EmDrawerStatuses.OPEN);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setStatus(EmDrawerStatuses.CLOSE);
  }, []);

  const onLogout = useCallback(() => {
    logoutUser();
  }, [logoutUser]);

  const value = useMemo(() => {
    return {
      status,
      onOpenDrawer,
      onCloseDrawer,
    };
  }, [status, onOpenDrawer, onCloseDrawer]);

  return (
    <DrawerContext.Provider value={value}>
      {user && <Drawer user={user} onLogout={onLogout} />}
      {children}
    </DrawerContext.Provider>
  );
};

type DrawerProviderProps = {
  children: ReactNode;
};

export const DrawerProvider = memo(DrawerProviderRaw);
export default DrawerProvider;
