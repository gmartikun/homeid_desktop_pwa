import { FC, memo, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { useUser } from "@src/hooks";
import { centrifuge } from "@src/libs";

import { NotifyProvider } from "@src/features/app";

const MainRaw: FC = () => {
  const { user } = useUser();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (user.centrifugo_token) {
      centrifuge.init({
        url: `${process.env.REACT_APP_WS_HOST}/connection/websocket`,
        token: user.centrifugo_token,
      });

      centrifuge.on("connect", () => {
        setIsConnected(true);
      });
    }
  }, [user.centrifugo_token]);

  if (!isConnected) {
    return null;
  }

  return (
    <NotifyProvider>
      <Outlet />
    </NotifyProvider>
  );
};

export const Main = memo(MainRaw);
export default Main;
