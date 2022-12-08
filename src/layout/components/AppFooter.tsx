import { Layout } from "antd";
import React from "react";
const { Footer } = Layout;

type Props = {};

export default function AppFooter({}: Props) {
  return (
    <Footer style={{ textAlign: "center" }}>
      Ant Design ©2018 Created by Ant UED
    </Footer>
  );
}
