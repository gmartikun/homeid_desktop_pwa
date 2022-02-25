import { FC, FormEvent, ChangeEvent, memo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";

import { useUser } from "@src/hooks";

import { useLinkUser } from "../../hooks";

import classes from "./style.module.css";

const AuthCodeRaw: FC = () => {
  const [value, setValue] = useState("");
  const [inputError, setInputError] = useState("");

  const navigate = useNavigate();
  const { mutateAsync: linkUser } = useLinkUser();
  const { user, updateUser } = useUser();

  const onValueChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (inputError) setInputError("");
      setValue(e.target.value);
    },
    [inputError]
  );

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user?.user_id) {
      try {
        const { panel_id } = await linkUser({
          user_id: user.user_id,
          link_code: value,
        });
        updateUser({ panel_id });

        const savedUser = localStorage.getItem("user");

        if (savedUser) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...JSON.parse(savedUser),
              panel_id,
            })
          );
        }

        navigate(`/home`);
      } catch (e) {
        setInputError("Введен неверный код");
      }
    }
  };

  return (
    <form className={classes.layout} onSubmit={onFormSubmit}>
      <h2 className={classes.title}>Ввод кода авторизации</h2>

      <div className={classes.field}>
        <input
          className={cn(classes.input, {
            [classes.inputFill]: value,
            [classes.inputError]: inputError,
          })}
          maxLength={255}
          autoFocus
          onChange={onValueChange}
          placeholder="Ваш код"
        />
        {inputError && (
          <span className={classes.inputErrorText}>{inputError}</span>
        )}
      </div>

      <button disabled={!value} className={classes.btn}>
        Продолжить
      </button>
    </form>
  );
};

export const AuthCode = memo(AuthCodeRaw);
export default AuthCode;
