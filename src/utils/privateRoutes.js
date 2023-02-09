/* eslint-disable prefer-const */
import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";
import storage from "./storage";
import { verifyUser } from "../lib/auth";

const PrivateRoutes = () => {
  let user = null;
  const authToken = storage.getToken();
  if (authToken) {
    user = verifyUser();
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
