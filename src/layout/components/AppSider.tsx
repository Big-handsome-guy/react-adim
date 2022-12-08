import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { mainroutes } from "../../router/index";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

type Props = {};

export default function AppSider({}: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const handleMenu = (obj: any) => {
    // console.log(obj);
    navigate(obj.key);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="logo">知识付费平台</div>
      <Menu
        onClick={handleMenu}
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={mainroutes}
      />
    </Sider>
  );
}
