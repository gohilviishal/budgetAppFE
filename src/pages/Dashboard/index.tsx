import React from "react";
import { HomeLayout } from "../../layouts";
import { Outlet } from "react-router-dom";

export const Dashboard: React.FC = () => {
  return (
    <HomeLayout>
      <Outlet />
    </HomeLayout>
  );
};
