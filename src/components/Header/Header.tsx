import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import styles from "./Header.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

const { Header: AntHeader } = Layout;

const items = [
  { key: "home", label: "Home" },
  { key: "login", label: "Login" },
  { key: "register", label: "Register" },
];

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState<string>("");

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setSelectedKey(path);
  }, [location]);

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(`/${key}`);
  };
  return (
    <AntHeader className={styles.header}>
      <div className={styles.demoLogo} />
      <Menu
        mode="horizontal"
        selectedKeys={[selectedKey]}
        items={items}
        className={styles.menu}
        onClick={handleMenuClick}
      />
    </AntHeader>
  );
};
