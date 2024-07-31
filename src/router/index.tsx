import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Budget,
  Categories,
  Dashboard,
  Home,
  Login,
  Payments,
  Register,
  Tags,
  Transactions,
} from "../pages";
import PrivateRoute from "./PrivateRoute";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="tags" element={<Tags />} />
          <Route path="categories" element={<Categories />} />
          <Route path="budgets" element={<Budget />} />
          <Route path="payments" element={<Payments />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>
      </Route>
    </Routes>
  );
};
