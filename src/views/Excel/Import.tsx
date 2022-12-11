import { Button } from "antd";
import { useState } from "react";
import * as XLSX from "xlsx";
import request from "@/utils/request";

type ImportProps = {};
interface DataType {
  proid: string;
  proname: string;
  img1: string;
  originprice: number;
  discount: number;
  sales: number;
  stock: number;
  category: string;
  brand: string;
  issale: number;
  isrecommend: number;
  isseckill: number;
}
export default function Import(props: ImportProps) {
  const [banner, setBanner] = useState([]);
  const importExcel = () => {
    // 1. 导入数据
    const file = (document.getElementById("fileRef") as HTMLInputElement)
      .files![0];
    const reader = new FileReader();
    reader.readAsBinaryString(file); // 转成 二进制格式
    reader.onload = function () {
      const workbook = XLSX.read(this.result, { type: "binary" });
      const t = workbook.Sheets["轮播数据"]; // 【！注意！】拿到表格数据,需要跟表格文件内部的表名一致
      // console.log(t)
      const r: any = XLSX.utils.sheet_to_json(t); // 2. 转换成json格式
      // console.log(r)
      setBanner(r);
      // 将r的数据上传至服务器
      console.log("json数据", r);

      //方法2，导出为html
      var container = document.getElementById("cont");
      (container as HTMLDivElement).innerHTML = XLSX.utils.sheet_to_html(t);
      console.log("html数据", XLSX.utils.sheet_to_html(t));
    };
  };

  //3. 将表格数据批量传入数据库
  const handleBatch = () => {
    let requests = banner.map((item) => {
      return {
        method: "POST",
        path: "/1.1/classes/Banner",
        body: item,
      };
    });
    request.post("/batch", { requests });
  };

  return (
    <>
      <Button
        onClick={() => {
          // 触发文件选择器
          (document.getElementById("fileRef") as HTMLInputElement).click();
        }}
      >
        导入数据
      </Button>
      <input type="file" hidden id="fileRef" onChange={importExcel} />
      <Button type="primary" onClick={handleBatch}>
        将导入的数据批量录入数据库
      </Button>
      <div id="cont"></div>
    </>
  );
}
