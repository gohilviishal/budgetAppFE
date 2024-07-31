import { Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { useNavigate } from "react-router-dom";
import { items } from "./SidebarItems";

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(`/dashboard/${key}`);
  };
  return (
    <Sider width={200} style={{ background: colorBgContainer }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["tags"]}
        style={{ height: "100%", borderRight: 0 }}
        items={items}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};
