import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks";

const PrivateRoute: React.FC = () => {
  const { token } = useAuth();

  const isAuthenticated = !!token;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
