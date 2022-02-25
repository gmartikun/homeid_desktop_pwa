import { useContext } from "react";

import { AuthContext } from "@src/features/auth";

export const useUser = () => {
  return useContext(AuthContext);
};

export default useUser;
