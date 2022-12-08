import { IMenuProps } from "@/router/interface";
import React from "react";
import { useLocation } from "react-router-dom";
import { mainroutes } from "@/router";
import { Breadcrumb } from "antd";

//   2.将路由数据包转为面包屑映射数据包的方法
const breadcrumbNameMap: Record<string, string> = {};

function getBreadcrumbData(menus: IMenuProps[]) {
  menus.forEach((item) => {
    if (item.children) {
      getBreadcrumbData(item.children);
    }
    breadcrumbNameMap[item.key] = item.title;
  });
}

getBreadcrumbData(mainroutes);
// console.log("面包屑数据包", breadcrumbNameMap);

export default function AppBreadcrumb() {
  // 1.获取用户当前所处的路由路径
  const location = useLocation();
  //   console.log(location);

  // 3.整理路径
  let pathParams = location.pathname.split("/").filter((i) => i);
  //   console.log("切割后的pathname", pathParams);

  const BuildBreadcrumbItems = pathParams.map((item, index) => {
    let url = `/${pathParams.slice(0, index + 1).join("/")}`;
    // console.log("路径", url);
    return <Breadcrumb.Item>{breadcrumbNameMap[url]}</Breadcrumb.Item>;
  });

  return (
    <Breadcrumb style={{ margin: "16px 0" }}>{BuildBreadcrumbItems}</Breadcrumb>
  );
}
