import {
  FC,
  memo,
  useState,
  useMemo,
  ReactNode,
  useCallback,
  useEffect,
} from "react";

import axios from "@src/axios";
import { TpUser, CustomHeaders } from "@src/types";

import { AuthContext } from "../contexts";
import { useLogoutUser } from "../hooks";

const default_user = {
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
};

const AuthProviderRaw: FC<AuthProps> = (props) => {
  const { children } = props;
  const { mutateAsync: logoutUser } = useLogoutUser();

  const [user, setUser] = useState<TpUser>(default_user);
  const [isUserChecked, setIsUserChecked] = useState(false);

  const onUpdateUser = useCallback((values: Partial<TpUser>) => {
    setUser((prevUser) => {
      return {
        ...prevUser,
        ...values,
      };
    });
  }, []);

  const onLogoutUser = useCallback(async () => {
    try {
      await logoutUser(user.user_id);
      setUser(default_user);
      localStorage.removeItem("user");
      localStorage.removeItem("user-settings");
    } catch (e) {
      console.warn("Logout user error");
    }
  }, [logoutUser, user]);

  const value = useMemo(() => {
    return {
      user,
      updateUser: onUpdateUser,
      logoutUser: onLogoutUser,
    };
  }, [user, onUpdateUser, onLogoutUser]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      const user: TpUser = JSON.parse(savedUser);
      if (user.token) {
        (axios.defaults.headers as CustomHeaders)["Authorization"] = user.token;
      }
      setUser({
        ...default_user,
        ...user,
      });
    }

    // (axios.defaults.headers as CustomHeaders)["Authorization"] =
    //   "fLFUnfksXTQk3n4+rcc/yvWVOX2cUD6psOhqH5xCslGnh4ENCDjq7kCOjW7Ef2ufZ+lLPiZLxqw1MMqedK3j6w==";

    // setUser({
    //   centrifugo_token:
    //     "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyXzUwMDQ4NyJ9.Rb9e9CUjQSkhgp2Kzv0UmyHyg5RZGRbzxjiFDDcgCq4",
    //   panel_id: 456267,
    //   phone_number: "375292646861",
    //   token:
    //     "fLFUnfksXTQk3n4+rcc/yvWVOX2cUD6psOhqH5xCslGnh4ENCDjq7kCOjW7Ef2ufZ+lLPiZLxqw1MMqedK3j6w==",
    //   user_id: 500487,
    //   address: {
    //     city: "Minsk",
    //     street: "Minsk",
    //     building: "1",
    //     entrance: "1",
    //   },
    //   door_code: "1234",
    //   number: 3,
    // });

    setIsUserChecked(true);
  }, []);

  if (!isUserChecked) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

type AuthProps = {
  children: ReactNode;
};

export const AuthProvider = memo(AuthProviderRaw);
export default AuthProvider;
