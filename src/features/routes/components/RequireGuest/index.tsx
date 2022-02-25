import { FC, memo } from "react";
import { Navigate } from "react-router-dom";

import { useUser } from "@src/hooks";

const RequireGuestRaw: FC<RequireGuestProps> = (props) => {
  const { children } = props;
  const { user } = useUser();

  if (user.panel_id) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

type RequireGuestProps = {
  children: JSX.Element;
};

export const RequireGuest = memo(RequireGuestRaw);
export default RequireGuest;
