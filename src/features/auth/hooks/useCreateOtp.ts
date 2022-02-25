import { useMutation } from "react-query";

import { createOtp } from "@src/api";
import { TpCreateOtpReq } from "@src/types";

export const useCreateOtp = () => {
  return useMutation((params: TpCreateOtpReq) => createOtp(params));
};
