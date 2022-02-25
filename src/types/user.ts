export type TpUserPhone = {
  phone_number: string;
};

export type TpUserTokens = {
  token: string;
  centrifugo_token: string;
  user_id: number;
};

export type TpUserPanel = {
  panel_id: number;
};

export type TpUserAddress = {
  city: string;
  street: string;
  building: string;
  entrance: string;
};

export type TpUser = TpUserPhone &
  TpUserTokens &
  TpUserPanel & { address: TpUserAddress; door_code: string; number: number };

export type TpUserSettings = {
  receive_voip_notifications: boolean;
};
