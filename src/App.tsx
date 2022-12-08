import React from "react";
import "./App.less";
import { Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import { renderRoutes } from "./router/utils";
import { mainroutes } from "./router/index";
import RequireAuth from "./guard/RequireAuth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RequireAuth></RequireAuth>}>
          {/* 1.手写路由 */}
          {/* <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/course/classify" element={<Classify />} />
          <Route path="/course/article/list" element={<ArticleList />} />
          <Route path="/manager/role" element={<Role />} /> */}
          {/* 2.动态渲染路由 */}
          {renderRoutes(mainroutes)}
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
