import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import request from "@/utils/request";

const ExportJsonExcel = require("js-export-excel");

const columns: any = [
  {
    title: "BannerID",
    dataIndex: "objectId",
    key: "objectId",
  },
  {
    title: "轮播名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "图片链接",
    dataIndex: "img",
    key: "img",
  },
  {
    title: "轮播描述",
    key: "interduce",
    dataIndex: "interduce",
  },
];

export default function Export() {
  const [data, setData] = useState([]);
  useEffect(() => {
    request.get("/classes/Banner").then((res) => {
      setData(res.data.results);
    });
  }, []);
  let handleExport = () => {
    var option: any = {}; //导出文件相关配置

    option.fileName = "轮播图数据"; //导出的文件名

    option.datas = [
      //配置excel内部数据。一个对象为一张表
      {
        sheetData: data,
        sheetName: "轮播数据", //表名
        sheetFilter: ["name", "img", "interduce"], //控制每一列中需要渲染的字段
        sheetHeader: ["name", "img", "interduce"], //每一列的头部标题信息
        columnWidths: [20, 20],
      },
    ];

    var toExcel = new ExportJsonExcel(option); //new
    toExcel.saveExcel(); //保存
  };
  return (
    <div>
      <Button onClick={handleExport}>导出为Excel</Button>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
