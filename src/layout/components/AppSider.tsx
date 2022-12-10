import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

const { Sider } = Layout;
type MenuEventType = {
  key: string;
  keyPath: Array<string>;
};

export default function AppSider() {
  const [collapsed, setCollapsed] = useState(false);
  const roleData = useAppSelector((state) => state.user.userInfo?.roleData);
  const navigate = useNavigate();
  const handleMenu = (obj: MenuEventType) => {
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
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={roleData?.tree}
        onClick={handleMenu}
      />
    </Sider>
  );
}
