import { FC, memo, useCallback, useEffect, useState, useMemo } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";

import { EmDrawerStatuses, TpUser, TpUserSettings } from "@src/types";
import { useUser } from "@src/hooks";

import { useDrawer, useUpdateUserSettings } from "../../hooks";

import Address from "./components/Address";
import Code from "./components/Code";
import Checkbox from "./components/Checkbox";
import Logout from "./components/Logout";

import classes from "./style.module.css";

const DrawerRaw: FC<DrawerProps> = () => {
  const { user, logoutUser } = useUser();

  const [isReady, setIsReady] = useState(false);
  const [settings, setSettings] = useState<TpUserSettings>(
    {} as TpUserSettings
  );

  const { status, onCloseDrawer } = useDrawer();
  const { mutateAsync: updateUserSettings } = useUpdateUserSettings();

  const isOpened = EmDrawerStatuses.OPEN === status;

  const onClickLogout = useCallback(() => {
    const success = window.confirm("Вы действительно хотите выйти?");

    if (success) {
      logoutUser();
    }
  }, [logoutUser]);

  const onDebounceUpdateSettings = useMemo(
    () =>
      debounce(async ({ key, value }: { key: string; value: boolean }) => {
        const savedUserSettings = localStorage.getItem("user-settings");
        let newUserSettings = {
          [key]: value,
        } as TpUserSettings;
        if (savedUserSettings) {
          newUserSettings = {
            ...JSON.parse(savedUserSettings),
            ...newUserSettings,
          };
          localStorage.setItem(
            "user-settings",
            JSON.stringify(newUserSettings)
          );
        }
        try {
          await updateUserSettings({
            user_id: user.user_id,
            params: newUserSettings,
          });
        } catch (e) {
          console.warn("Error update user settings");
        }
      }, 300),
    [user, updateUserSettings]
  );

  const onUpdateSettings = useCallback(
    (key: string, value: boolean) => {
      setSettings((prevSettings) => {
        return {
          ...prevSettings,
          [key]: value,
        };
      });

      onDebounceUpdateSettings({ key, value });
    },
    [onDebounceUpdateSettings]
  );

  useEffect(() => {
    const savedUserSettings = localStorage.getItem("user-settings");

    if (savedUserSettings) {
      setSettings(JSON.parse(savedUserSettings));
    } else {
      const newUserSettings = {
        receive_voip_notifications: true,
      };
      setSettings(newUserSettings);
      localStorage.setItem("user-settings", JSON.stringify(newUserSettings));
    }

    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <>
      {isOpened && <div className={classes.overlay} onClick={onCloseDrawer} />}
      <div
        className={cn(classes.drawer, {
          [classes.opened]: isOpened,
        })}
      >
        <Address address={user.address} number={user.number} />
        <div className={classes.content}>
          <Checkbox
            id="voip"
            name="receive_voip_notifications"
            label="Получение звонков"
            onChange={onUpdateSettings}
            checked={settings.receive_voip_notifications}
          />
          <Code code={user.door_code} />
          <Logout onClick={onClickLogout} />
        </div>
      </div>
    </>
  );
};

type DrawerProps = {
  user: TpUser;
  onLogout: () => void;
};

export const Drawer = memo(DrawerRaw);
export default Drawer;
