import { FC, memo } from "react";
import { Navigate } from "react-router-dom";

import { useUser } from "@src/hooks";

const RequireAuthRaw: FC<RequireAuthProps> = (props) => {
  const { children } = props;
  const { user } = useUser();

  if (!user.panel_id) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

type RequireAuthProps = {
  children: JSX.Element;
};

export const RequireAuth = memo(RequireAuthRaw);
export default RequireAuth;
