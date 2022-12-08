import { Button, Col, Modal, Row, Space, Switch, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState, useEffect } from "react";
import ClassifyForm from "./components/ClassifyForm";
import { classifyGet, classifyUpdate } from "../../api/course";
import { ClassifyType } from "../../types/course";

interface ClassifyTableType extends ClassifyType {
  children: ClassifyType[];
}
const Classify: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<Array<ClassifyTableType>>([]);
  const columns: ColumnsType<ClassifyType> = [
    {
      title: "类目ID",
      dataIndex: "objectId",
      key: "objectId",
      width: "270px",
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
      render: (bool, record, index) => {
        return (
          <Switch
            checked={bool}
            onChange={() => {
              handleState(record, index);
            }}
          />
        );
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
  const handleState = (record: ClassifyType, index: number) => {
    console.log(record, index);
    let { dadId, state, objectId } = record;
    classifyUpdate(objectId, !state).then((res) => {
      if (dadId === "0-0") {
        //修改父级类目
        data[index].state = !state;
      } else {
        //获取父级类目的序号
        let dIdx = data.findIndex((item) => item.objectId === dadId);
        console.log(dIdx, index);
        data[dIdx].children[index].state = !state;
      }
      setData([...data]);
    });
  };

  useEffect(() => {
    classifyGet().then((res) => {
      // console.log(res);
      let arr: ClassifyTableType[] = []; //按照类目层级存放类目数据
      let { results } = res.data;
      // console.log(results); //处理前的数据
      arr = results.filter((item: ClassifyTableType) => item.dadId === "0-0"); //找出主类目
      arr.forEach((item: ClassifyTableType) => {
        //遍历主类目
        let children = results.filter(
          (child: ClassifyTableType) => item.objectId === child.dadId
        );
        item.children = children; //向指定主类目下，追加对应的子类目数据
      });
      // console.log(arr); //处理后的数据
      setData(arr);
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

export default Classify;
