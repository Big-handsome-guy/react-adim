import React, { useEffect } from "react";
import { Row, Col, Card } from "antd";
import "./index.less";
import * as echarts from "echarts";
import bar from "./Options/bar";
import line from "./Options/line";
import pie from "./Options/pie";
import { chartGet } from "@/api/course";

type Props = {};

export default function Dashboard({}: Props) {
  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    // 1.柱状图
    let barChart = echarts.init(
      document.getElementById("bar") as HTMLDivElement
    );
    barChart.setOption(bar);
    // 2.折线图
    let lineChart = echarts.init(
      document.getElementById("line") as HTMLDivElement
    );
    lineChart.setOption(line);
    // 3.饼状图
    (async () => {
      let pieChart = echarts.init(
        document.getElementById("pie") as HTMLDivElement
      );
      let res1 = await chartGet("6381d3221d35662164c6676f"); //正念冥想
      let res2 = await chartGet("6381d3531d35662164c667c5"); //睡眠助手
      let res3 = await chartGet("6381d34360195e6845b8f8fc"); //舒缓音乐
      console.log(res1, res2, res3);
      pie.series[0].data[0].value = res1.data.count;
      pie.series[0].data[1].value = res2.data.count;
      pie.series[0].data[2].value = res3.data.count;
      pieChart.setOption(pie);
    })();
  }, []);
  return (
    <div>
      <Row>
        <Col span={24}>
          <Card>
            <div className="chart" id="line"></div>
          </Card>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={12}>
          <Card>
            <div className="chart" id="bar"></div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div className="chart" id="pie"></div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
