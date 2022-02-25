import { createContext } from "react";

import { TpUser } from "@src/types";

type TpAuthContext = {
  user: TpUser;
  updateUser: (value: Partial<TpUser>) => void;
  logoutUser: () => void;
};

export const AuthContext = createContext<TpAuthContext>({
  user: {
    phone_number: "",
    panel_id: 0,
    user_id: 0,
    token: "",
    centrifugo_token: "",
    address: {
      city: "",
      street: "",
      building: "",
      entrance: "",
    },
    door_code: "",
    number: 0,
  },
  updateUser: (value) => {},
  logoutUser: () => {},
});
