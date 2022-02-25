import { FC, memo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthPhone, AuthSms, AuthCode } from "@src/features/auth";
import { MainPage, HomePage, CallPage } from "@src/features/home";

import RequireAuth from "../RequireAuth";
import RequireGuest from "../RequireGuest";

const AppRoutesRaw: FC = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Navigate to="/home" />} />
        <Route path="*" element={<Navigate to="/home" />} />
        <Route
          path="home"
          element={
            <RequireAuth>
              <MainPage />
            </RequireAuth>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="call" element={<CallPage />} />
        </Route>
        <Route path="auth">
          <Route index element={<Navigate to="/auth/phone" />} />
          <Route path="*" element={<Navigate to="/auth/phone" />} />
          <Route
            path="phone"
            element={
              <RequireGuest>
                <AuthPhone />
              </RequireGuest>
            }
          />
          <Route
            path="sms"
            element={
              <RequireGuest>
                <AuthSms />
              </RequireGuest>
            }
          />
          <Route
            path="code"
            element={
              <RequireGuest>
                <AuthCode />
              </RequireGuest>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};

export const AppRoutes = memo(AppRoutesRaw);
export default AppRoutes;
