export type TpCreateOtpReq = {
  phone_number: string;
  country_code: string;
  platform: string;
};

export type TpCreateOtpRes = {
  ttl: number;
};

export type TpCreateTokensReq = {
  otp: string;
  phone_number: string;
  push_token: string;
  platform: string;
};

export type TpCreateTokensRes = {
  token: string;
  centrifugo_token: string;
  user_id: number;
};

export type TpLinkUserReq = {
  user_id: number;
  link_code: string;
};

export type TpLinkUserRes = {
  panel_id: number;
};
