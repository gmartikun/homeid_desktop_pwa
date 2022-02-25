import axios from "@src/axios";

import {
  TpCreateOtpReq,
  TpCreateOtpRes,
  TpCreateTokensReq,
  TpCreateTokensRes,
  TpLinkUserReq,
  TpLinkUserRes,
  TpUserSettings,
} from "@src/types";

export const createOtp = async (
  params: TpCreateOtpReq
): Promise<TpCreateOtpRes> => {
  const { data } = await axios.post("/mobile-api/v1/auth/otp", params);
  return data;
};

export const createTokens = async (
  params: TpCreateTokensReq
): Promise<TpCreateTokensRes> => {
  const { data } = await axios.post("/mobile-api/v1/auth/tokens", params);
  return data;
};

export const getVAPIDKey = async (): Promise<string> => {
  const { data } = await axios.get("/mobile-api/v1/auth/keys");
  return data;
};

export const linkUser = async (
  params: TpLinkUserReq
): Promise<TpLinkUserRes> => {
  const { user_id, link_code } = params;
  const { data } = await axios.post(`/mobile-api/v2/users/${user_id}/links`, {
    link_code,
  });
  return data;
};

export const updateUserSettings = async (
  user_id: number,
  params: TpUserSettings
) => {
  const { data } = await axios.put<TpUserSettings>(
    `/mobile-api/v1/users/${user_id}/settings`,
    params
  );
  return data;
};

export const logoutUser = async (user_id: number) => {
  const { data } = await axios.delete(`/mobile-api/v1/users/${user_id}`);
  return data;
};
