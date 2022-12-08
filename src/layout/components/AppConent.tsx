import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppBreadcrumb from "./AppBreadcrumb";
const { Content } = Layout;

type Props = {};

export default function AppConent({}: Props) {
  return (
    <Content style={{ margin: "0 16px" }}>
      <AppBreadcrumb />
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <Outlet />
      </div>
    </Content>
  );
}
