import React from "react";
import { Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import AppBreadcrumb from "./AppBreadcrumb";
import { useAppSelector } from "@/store/hooks";

const { Content } = Layout;

export default function AppConent() {
  //路由白名单
  let normal: Array<string> = [
    //固定白名单
    "/map",
    "/excel",
    "/excel/export",
    "/excel/import",
    "/big",
  ];
  let whiteList: Array<string> = useAppSelector(
    (state) => state.user.userInfo!.roleData.checkedKeys
  );
  whiteList = normal.concat(whiteList);
  let { pathname } = useLocation();
  return (
    <Content style={{ margin: "0 16px" }}>
      <AppBreadcrumb />
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        {whiteList?.includes(pathname) ? <Outlet /> : "没有权限，请联系管理员"}
      </div>
    </Content>
  );
}
