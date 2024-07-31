import { Layout } from "antd";
import React, { ReactNode } from "react";
import { Header } from "../components";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout>
      <Header />
      {children}
    </Layout>
  );
};
