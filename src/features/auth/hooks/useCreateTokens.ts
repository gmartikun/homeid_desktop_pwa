import { useMutation } from "react-query";

import { createTokens } from "@src/api";
import { TpCreateTokensReq } from "@src/types";

export const useCreateTokens = () => {
  return useMutation((values: TpCreateTokensReq) => createTokens(values));
};

export default useCreateTokens;
