import { Layout } from "antd";
import React from "react";
import AppConent from "./components/AppConent";
import AppFooter from "./components/AppFooter";
import APPHeader from "./components/APPHeader";
import AppSider from "./components/AppSider";
import "./index.css";

const MainLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppSider />
      <Layout className="site-layout">
        <APPHeader />
        <AppConent />
        <AppFooter />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
