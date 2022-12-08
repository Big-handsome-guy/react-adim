import React, { useEffect, useState } from "react";
import { Button, Table, Drawer, Space, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import RoleForm from "./components/RoleForm";
import { roleGet, IRoleParams, roleDel, roleBatchDel } from "@/api/user";

const Role: React.FC = () => {
  const [loading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<Array<IRoleParams>>([]);
  const [editRole, setEditRole] = useState<IRoleParams>(); //被编辑的角色数据
  const [idx, setIdx] = useState<number>(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<Array<IRoleParams>>([]);
  const columns: ColumnsType<IRoleParams> = [
    {
      title: "角色ID",
      dataIndex: "objectId",
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
    },
    {
      title: "角色级别",
      dataIndex: "roleLevel",
    },
    {
      title: "操作",
      render(text, record: IRoleParams, index) {
        return (
          <Space>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setEditRole(record);
                setIdx(index);
                setOpen(true);
              }}
            >
              编辑
            </Button>
            <Popconfirm
              title="确定不是手抖点错?"
              onConfirm={() => {
                confirm(record, index);
              }}
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
    roleGet().then((res) => {
      let { results } = res.data;
      results.forEach((item: IRoleParams, index: number) => {
        item.key = index;
      });
      setData(results);
    });
  }, []);
  const confirm = (record: IRoleParams, index: number) => {
    // console.log("点了确认");
    roleDel(record.objectId).then((res) => {
      data.splice(index, 1);
      setData([...data]);
    });
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleTableUpdate = (roleObj: IRoleParams, type: 1 | 2) => {
    //为表格追加新数据、修改数据
    console.log(roleObj);
    if (type === 1) {
      setData([...data, roleObj]); //新增
    } else {
      data[idx] = roleObj; //修改
      setData([...data]);
    }
    //关闭遮罩
    setOpen(false);
  };

  //表格勾选变化时触发
  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    selectedRows: any,
    info: any
  ) => {
    console.log(
      "selectedRowKeys changed: ",
      newSelectedRowKeys,
      selectedRows,
      info
    );
    setSelectedRowKeys(newSelectedRowKeys); //记录被勾选行的序号
    setSelectedRows(selectedRows); //记录被勾选行的数据包，为了拿到objectId
  };
  //批量删除操作
  const handleBatchDel = () => {
    roleBatchDel(selectedRows).then((res) => {
      for (let i = data.length - 1; i >= 0; i--) {
        if (selectedRowKeys.includes(i)) {
          data.splice(i, 1);
        }
      }
      setData([...data]);
    });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => {
            setOpen(true);
            setEditRole(undefined);
          }}
          loading={loading}
        >
          新增角色
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? (
            <Button type="primary" danger onClick={handleBatchDel}>
              批量删除
            </Button>
          ) : (
            ""
          )}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      <Drawer title="新增角色" placement="right" onClose={onClose} open={open}>
        {open ? (
          <RoleForm handleTableUpdate={handleTableUpdate} editRole={editRole} />
        ) : (
          ""
        )}
      </Drawer>
    </div>
  );
};

export default Role;
