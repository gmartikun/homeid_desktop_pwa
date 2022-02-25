import { useMutation } from "react-query";

import { logoutUser } from "@src/api";

export const useLogoutUser = () => {
  return useMutation((user_id: number) => logoutUser(user_id));
};

export default useLogoutUser;
