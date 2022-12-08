import { Button, Col, Modal, Row, Space, Switch, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState, useEffect } from "react";
import ClassifyForm from "./components/ClassifyForm";
import { classifyGet } from "../../api/course";
import { ClassifyType } from "../../types/course";

const columns: ColumnsType<ClassifyType> = [
  {
    title: "类目ID",
    dataIndex: "objectId",
    key: "objectId",
    width: "220px",
  },
  {
    title: "类目名称",
    dataIndex: "cateName",
    key: "cateName",
  },
  {
    title: "上架状态",
    dataIndex: "state",
    key: "state",
    render: (bool) => {
      return <Switch checked={bool} />;
    },
  },
  {
    title: "操作",
    render: () => {
      return (
        <Space>
          <Button type="primary" size="small">
            编辑
          </Button>
          <Button type="primary" danger size="small">
            删除
          </Button>
        </Space>
      );
    },
    width: "120px",
  },
];

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<Array<ClassifyType>>([]);

  useEffect(() => {
    classifyGet().then((res) => {
      console.log(res);
      setData(res.data.results);
    });
  }, []);
  return (
    <div>
      <Row justify="space-between" align="middle">
        <Col>课程分类管理</Col>
        <Col>
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            新增分类
          </Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} rowKey="objectId" />
      <Modal
        title="类目管理"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={null}
      >
        <ClassifyForm setIsModalOpen={setIsModalOpen} cateList={data} />
      </Modal>
    </div>
  );
};

export default App;
