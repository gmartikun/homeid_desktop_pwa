import { FC, memo, ReactNode, useCallback, useMemo, useState } from "react";

import { TpNotify } from "@src/types";

import { NotifyContext } from "../contexts";

import Notify from "../components/Notify";

const defaultNotify: TpNotify = {
  type: "",
  title: "HomeID",
  description: "",
};

const NotifyProviderRaw: FC<NotifyProviderProps> = (props) => {
  const { children } = props;

  const [notify, setNotify] = useState<TpNotify>(defaultNotify);

  const onShowNotify = useCallback((notify: TpNotify) => {
    setNotify((prevNotify) => {
      return { ...prevNotify, ...notify };
    });
  }, []);

  const onHideNotify = useCallback(() => {
    setNotify(defaultNotify);
  }, []);

  const value = useMemo(() => {
    return {
      notify,
      onShowNotify,
      onHideNotify,
    };
  }, [notify, onShowNotify, onHideNotify]);

  return (
    <NotifyContext.Provider value={value}>
      {Boolean(notify.type) && (
        <Notify notify={notify} onHideNotify={onHideNotify} />
      )}
      {children}
    </NotifyContext.Provider>
  );
};

type NotifyProviderProps = {
  children: ReactNode;
};

export const NotifyProvider = memo(NotifyProviderRaw);
export default NotifyProvider;
