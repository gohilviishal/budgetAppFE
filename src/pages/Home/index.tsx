import React from "react";
import { Layout } from "antd";
import styles from "./Home.module.scss";
import { MainLayout } from "../../layouts";

const { Content } = Layout;

export const Home: React.FC = () => {
  return (
    <MainLayout>
      <div className={styles.home}>
        <Layout className={styles.homeLayout}>
          <Content>
            <h1 className={styles.title}>Welcome to the Home Page</h1>
            <p className={styles.description}>
              This is a simple home page.
            </p>
          </Content>
        </Layout>
      </div>
    </MainLayout>
  );
};
