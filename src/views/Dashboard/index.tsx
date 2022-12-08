import React from "react";
import { Button } from "antd";
import "./index.less";

type Props = {};

export default function Dashboard({}: Props) {
  return (
    <div>
      <div className="box">
        <span>Dashboard</span>
      </div>
      <Button type="primary">按钮</Button>
    </div>
  );
}
