import { FC, FormEvent, memo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";
import cn from "classnames";

import axios from "@src/axios";

import { useUser } from "@src/hooks";
import { CustomHeaders } from "@src/types";
import { getBrowserName, getSubscription } from "@src/services";

import CtxLoader from "@src/components/CtxLoader";

import { Timer } from "@src/features/app";

import { useCreateTokens, useCreateOtp } from "../../hooks";

import classes from "./style.module.css";

const AuthSmsRaw: FC = () => {
  const [value, setValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [ttl, setTtl] = useState<number | null>(null);

  const { user, updateUser } = useUser();
  const { mutateAsync: createOtp, isLoading: createOtpIsLoading } =
    useCreateOtp();
  const { mutateAsync: createTokens, isLoading: createTokensIsLoading } =
    useCreateTokens();
  const navigate = useNavigate();

  const onCreateTokens = useCallback(
    async (value: string) => {
      const subscription = getSubscription();

      if (user && user.phone_number && subscription) {
        try {
          const { token, centrifugo_token, user_id } = await createTokens({
            phone_number: user.phone_number,
            platform: getBrowserName().toLocaleUpperCase(),
            push_token: JSON.stringify(subscription),
            otp: value,
          });

          (axios.defaults.headers as CustomHeaders)["Authorization"] = token;

          updateUser({ token, centrifugo_token, user_id });

          const savedUser = localStorage.getItem("user");

          if (savedUser) {
            localStorage.setItem(
              "user",
              JSON.stringify({
                ...JSON.parse(savedUser),
                token,
                centrifugo_token,
                user_id,
              })
            );
          }

          localStorage.removeItem("ttl");
          navigate(`/auth/code`);
        } catch (e) {
          setInputError("Введен неверный код");
        }
      }
    },
    [user, navigate, createTokens, updateUser]
  );

  const onValueChange = useCallback(
    (values) => {
      const nextValue = values.value;
      if (inputError) setInputError("");

      setValue(nextValue);

      if (nextValue.length === 6) {
        onCreateTokens(nextValue);
      }
    },
    [inputError, onCreateTokens]
  );

  const onTimerOver = useCallback(() => {
    setIsDisabled(false);
  }, []);

  const onReRequestSms = async () => {
    if (user && user.phone_number) {
      const { ttl } = await createOtp({
        phone_number: user.phone_number,
        country_code: "BY",
        platform: getBrowserName(),
      });

      setIsDisabled(true);
      setTtl(ttl);
      setValue("");
    }
  };

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreateTokens(value);
  };

  useEffect(() => {
    const ttl = localStorage.getItem("ttl");
    if (ttl) {
      setTtl(parseInt(ttl));
    } else {
      navigate("/auth/phone", { replace: true });
    }
  }, [navigate]);

  return (
    <form className={classes.layout} onSubmit={onFormSubmit}>
      <h2 className={classes.title}>Введите ваш код</h2>

      <div className={classes.field}>
        <NumberFormat
          className={cn(classes.input, {
            [classes.inputFill]: value,
            [classes.inputError]: inputError,
          })}
          autoFocus
          onValueChange={onValueChange}
          placeholder="Ваш код"
          format="######"
          mask="_"
        />

        {inputError && (
          <span className={classes.inputErrorText}>{inputError}</span>
        )}
      </div>

      <div className={classes.timer}>
        {isDisabled && (
          <>
            <span className={classes.timerText}>
              Повторно запросить СМС через
            </span>
            {ttl && (
              <Timer
                onTimerOver={onTimerOver}
                time={ttl}
                className={classes.timerCount}
              />
            )}
          </>
        )}
      </div>

      <button
        disabled={isDisabled}
        className={classes.btn}
        type="button"
        onClick={onReRequestSms}
      >
        Отправить код повторно
      </button>

      {(createOtpIsLoading || createTokensIsLoading) && (
        <div className={classes.loader}>
          <CtxLoader />
        </div>
      )}
    </form>
  );
};

export const AuthSms = memo(AuthSmsRaw);
export default AuthSms;
