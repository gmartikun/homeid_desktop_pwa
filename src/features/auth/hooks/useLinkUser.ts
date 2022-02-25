import { useMutation } from "react-query";

import { linkUser } from "@src/api";
import { TpLinkUserReq } from "@src/types";

export const useLinkUser = () => {
  return useMutation((values: TpLinkUserReq) => linkUser(values));
};

export default useLinkUser;
