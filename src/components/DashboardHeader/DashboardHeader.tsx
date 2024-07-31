import { Layout } from "antd";
import React from "react";
import styles from "./DashboardHeader.module.scss"
const { Header } = Layout;
export const DashboardHeader: React.FC = () => {
  return (
    <Header className={styles.header}>
      <div className={styles.logoContainer}>
        <div className={styles.demoLogo} />
        <span className={styles.dashboardText}>Dashboard</span>
      </div>
    </Header>
  );
};