//处理动态路由渲染相关逻辑
import { Fragment, ReactNode } from "react";
import { Route } from "react-router-dom";
import { IMenuProps } from "./interface";

//方法1：根据数据包动态生成Route
// export const renderRoutes = () => {
//   let arr: IMenuProps[] = [];
//   mainroutes.forEach((item) => {
//     if (item.children) {
//       arr = [...arr, ...item.children];
//     } else {
//       arr.push(item);
//     }
//   });
//   return arr.map((item) => {
//     return <Route path={item.key} element={item.element} key={item.key} />;
//   });
// };

//方法2：根据数据包动态生成Route，递归写法，调用时需要传递路由数据包
export const renderRoutes = (routes: IMenuProps[]): ReactNode[] => {
  return routes.map((item: IMenuProps) => {
    if (item.children) {
      return <Fragment key={item.key}>{renderRoutes(item.children)}</Fragment>;
    } else {
      return <Route key={item.key} path={item.key} element={item.element} />;
    }
  });
};
