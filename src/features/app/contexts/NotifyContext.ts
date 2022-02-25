import { createContext } from "react";

import { TpNotify } from "src/types";

type TpNotifyContext = {
  notify: TpNotify;
  onShowNotify: (notify: TpNotify) => void;
  onHideNotify: () => void;
};

export const NotifyContext = createContext<TpNotifyContext>({
  notify: {
    type: "",
    title: "",
    description: "",
  },
  onShowNotify: (notify) => {},
  onHideNotify: () => {},
});
