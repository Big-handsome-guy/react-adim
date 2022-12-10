import React, { useEffect, useState } from "react";
import { Button, Table, Drawer, Space, Popconfirm, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import UserForm from "./components/UserForm";
import { IRoleParams, userGet } from "@/api/user";

const User: React.FC = () => {
  const [loading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<Array<IRoleParams>>([]);
  const columns: ColumnsType<IRoleParams> = [
    {
      title: "账号ID",
      dataIndex: "objectId",
      width: "260px",
    },
    {
      title: "用户名称",
      dataIndex: "username",
    },
    {
      title: "用户头像",
      dataIndex: "avatar",
      // render(url) {
      //   return <img src={url} alt="" style={{ height: "50px" }} />;
      // },
      render(url: any) {
        return (
          <Space>
            <Image height={50} src={url} />
          </Space>
        );
      },
    },
    {
      title: "用户角色",
      dataIndex: "rolename",
    },
    {
      title: "操作",
      render(text, record: IRoleParams, index) {
        return (
          <Space>
            <Button type="primary" size="small">
              编辑
            </Button>
            <Popconfirm
              title="确定不是手抖点错?"
              okText="确定"
              cancelText="取消"
            >
              <Button type="primary" size="small" danger>
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  useEffect(() => {
    userGet().then((res) => {
      setData(res.data.results);
    });
  }, []);

  const handleTableUpdate = () => {};

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => {
            setOpen(true);
          }}
          loading={loading}
        >
          新增账号
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
      <Drawer title="新增角色" placement="right" onClose={onClose} open={open}>
        {open ? <UserForm handleTableUpdate={handleTableUpdate} /> : ""}
      </Drawer>
    </div>
  );
};

export default User;
