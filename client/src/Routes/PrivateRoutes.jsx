import { Navigate, Outlet } from "react-router-dom";
import { isLoginStatus } from "../Service/AuthUserDetail";
import React, { useState, useEffect } from "react";

const PrivateRoutes = (value) => {
  let auth = { token: false };

  return auth.token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
