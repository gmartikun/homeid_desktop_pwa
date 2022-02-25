import { FC, memo, useEffect, useState } from "react";

import { setSubscription } from "@src/services";
import axios from "@src/axios";

import Routes from "@src/features/routes";
import { AuthProvider } from "@src/features/auth";

import classes from "./style.module.css";

const AppRaw: FC = () => {
  const [error, setError] = useState<{
    title: string;
    description: string;
  } | null>(null);
  const [sub, setSub] = useState<PushSubscription | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (sub) {
      setSubscription(sub);
      setIsReady(true);
    }
  }, [sub]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then(function (registration) {
        if (!registration.pushManager) {
          setError({
            title: "Ошибка!",
            description:
              "Push-сообщения не поддерживаются браузером. Воспользуйтесь браузером Google Chrome или Firefox.",
          });
          return;
        }

        // Проверяем не запретил ли пользователь прием уведомлений
        if (Notification.permission === "denied") {
          setError({
            title: "Ошибка!",
            description:
              "Пользователь запретил прием уведомлений. Необходимо разрешить сайту получать уведомления.",
          });
          return;
        }

        registration.pushManager.getSubscription().then((subscription) => {
          setError(null);
          if (!subscription) {
            axios
              .get<string>("/mobile-api/v1/auth/keys")
              .then(({ data: key }) => {
                registration.pushManager
                  .subscribe({
                    applicationServerKey: key,
                    userVisibleOnly: true,
                  })
                  .then((newSubscription) => {
                    setSub(newSubscription);
                  })
                  .catch((e) => {
                    if (Notification.permission === "denied") {
                      setError({
                        title: "Ошибка!",
                        description:
                          "Пользователь запретил прием уведомлений. Необходимо разрешить сайту получать уведомления.",
                      });
                    } else {
                      console.error(
                        "An error ocurred during the subscription process.",
                        e
                      );
                    }
                  });
              })
              .catch((e) => {
                setError({
                  title: "Техническия ошибка!",
                  description:
                    "Попробуйте перезагрузить страницу или обратиться в службу поддержки",
                });
              });
          } else {
            setSub(subscription);
          }
        });
      });
    }
  }, []);

  if (isReady) {
    return (
      <AuthProvider>
        <Routes />
      </AuthProvider>
    );
  }

  if (error) {
    return (
      <div className={classes.error}>
        <div className={classes.errorTitle}>{error.title}</div>
        <div className={classes.errorDesc}>{error.description}</div>
      </div>
    );
  }

  return null;
};

export const App = memo(AppRaw);
export default App;
