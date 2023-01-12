/* eslint-disable prefer-const */
import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";
import storage from "./storage";

const PrivateRoutes = () => {
  const authToken = storage.getToken();
  return authToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
