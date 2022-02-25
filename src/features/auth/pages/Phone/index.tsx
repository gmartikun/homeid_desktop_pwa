import { FC, FormEvent, memo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";
import cn from "classnames";

import { getBrowserName } from "@src/services";
import { useUser } from "@src/hooks";

import CtxLoader from "@src/components/CtxLoader";

import { useCreateOtp } from "../../hooks";

import classes from "./style.module.css";

const AuthPhoneRaw: FC = () => {
  const [value, setValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [commonError, setCommonError] = useState("");
  const navigate = useNavigate();
  const { mutateAsync: createOtp, isLoading: createOtpIsLoading } =
    useCreateOtp();
  const { user, updateUser } = useUser();

  const onValueChange = useCallback(
    (values) => {
      if (inputError) setInputError("");

      setValue(values.value);
    },
    [inputError]
  );

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const phone_number = "375" + value;

      const { ttl } = await createOtp({
        phone_number,
        country_code: "BY",
        platform: getBrowserName(),
      });

      localStorage.setItem("ttl", `${ttl}`);
      localStorage.setItem("user", JSON.stringify({ phone_number }));
      updateUser({ phone_number });
      navigate(`/auth/sms`, { replace: true });
    } catch (e: any) {
      if (e && e.response && e.response.status === 406) {
        setCommonError(
          "Превышено допустимое количество попыток, попробуйте позже"
        );
      } else {
        setInputError("Введен неверный номер телефона");
      }
    }
  };

  useEffect(() => {
    if (user && user.token && !user.panel_id) {
      navigate("/auth/code");
    }
  }, [user, navigate]);

  return (
    <form className={classes.layout} onSubmit={onFormSubmit}>
      <h2 className={classes.title}>Введите номер телефона</h2>
      <span className={classes.desc}>СМС с кодом придет на ваш номер</span>

      <div className={classes.field}>
        <NumberFormat
          className={cn(classes.input, {
            [classes.inputFill]: value,
            [classes.inputError]: inputError,
          })}
          autoFocus
          onValueChange={onValueChange}
          placeholder="+375 "
          format="+375 ## ###-##-##"
          mask="_"
        />

        {inputError && (
          <span className={classes.inputErrorText}>{inputError}</span>
        )}
      </div>

      {commonError && <div className={classes.commonError}>{commonError}</div>}

      <button
        disabled={Boolean(commonError) || value.length !== 9}
        className={classes.btn}
      >
        Отправить
      </button>

      {createOtpIsLoading && (
        <div className={classes.loader}>
          <CtxLoader />
        </div>
      )}
    </form>
  );
};

export const AuthPhone = memo(AuthPhoneRaw);
export default AuthPhone;
