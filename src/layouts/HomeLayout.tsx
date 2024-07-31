import React, { ReactNode } from "react";
import { DashboardHeader, Sidebar } from "../components";
import { Breadcrumb, Layout, theme } from "antd";
import { useLocation } from "react-router-dom";

const { Content } = Layout;

interface HomeLayoutProps {
  children: ReactNode;
}

export const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();

  const breadcrumbItems = [
    { title: "Home" },
    { title: "List" },
    {
      title:
        location.pathname.split("/")[2].charAt(0).toUpperCase() +
        location.pathname.split("/")[2].slice(1),
    },
  ];

  return (
    <Layout>
      <DashboardHeader/>
      <Layout>
        <Sidebar />
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumbItems} />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
