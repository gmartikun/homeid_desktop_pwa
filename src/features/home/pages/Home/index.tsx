import { FC, memo, useCallback, useEffect, useMemo } from "react";

import { useUser, useNotify } from "@src/hooks";
import { EmPanelRoles, EmNotifyTypes, TpPanelLockUI } from "@src/types";

import { DrawerProvider } from "../../providers";
import { useGetPanelHierarchy, usePanelLock } from "../../hooks";

import Header from "../../components/Header";
import Buttons from "../../components/Buttons";

import classes from "./style.module.css";

const HomePageRaw: FC = () => {
  const { user, updateUser } = useUser();
  const { onShowNotify } = useNotify();
  const { data } = useGetPanelHierarchy(user.panel_id);
  const { mutateAsync: panelLock } = usePanelLock();

  const onClickButton = useCallback(
    async (button: TpPanelLockUI) => {
      try {
        await panelLock({
          panel_id: button.panel_id,
          internal_id: button.internal_id,
        });
        onShowNotify({
          type: EmNotifyTypes.SUCCESS,
          description: "Дверь успешно открыта",
        });
      } catch (e) {
        onShowNotify({
          type: EmNotifyTypes.ERROR,
          description: "Произошла ошибка, попробуйте позже",
        });
      }
    },
    [panelLock, onShowNotify]
  );

  const buttons = useMemo(() => {
    if (data) {
      let main: TpPanelLockUI | null = null;
      const locks = data.reduce<TpPanelLockUI[]>((panels, panel) => {
        if (panel.locks) {
          panel.locks.forEach((lock) => {
            if (lock.is_main_door) {
              panels.unshift({
                ...lock,
                panel_id: panel.panel_id,
              });
            } else {
              panels.push({
                ...lock,
                panel_id: panel.panel_id,
              });
            }
          });
        }

        return panels;
      }, []);

      return main ? [main, ...locks] : locks;
    }

    return [];
  }, [data]);

  useEffect(() => {
    if (data) {
      const master = data.find(
        (panel) => panel.panel_role === EmPanelRoles.MASTER
      );

      if (master) {
        const { address, door_code, number } = master;
        updateUser({ address, door_code, number });

        const savedUser = localStorage.getItem("user");

        if (savedUser) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...JSON.parse(savedUser),
              address,
              door_code,
              number,
            })
          );
        }
      }
    }
  }, [data, updateUser]);

  return (
    <DrawerProvider>
      <Header />
      <div className={classes.container}>
        <Buttons items={buttons} onClickButton={onClickButton} />
      </div>
    </DrawerProvider>
  );
};

export const HomePage = memo(HomePageRaw);
export default HomePage;
