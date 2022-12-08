import ImageUpload from "../../components/ImageUpload";
import { Button, Cascader, Form, Input, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { classifyGet, articlePost } from "../../api/course";
import { ClassifyTableType, ArticleType } from "../../types/course";
import RichText from "../../components/RichText";

const { TextArea } = Input;
// let initData = {
//   name: "腾讯第三季度调整后净利润 322.5 亿元，同比增长 2%",
//   poster:
//     "https://file2204.h5project.cn/aiWFkyesUBefFCOCctTT3JHyfOClsfIK/picture.png",
//   isvip: true,
//   info: `腾讯第三季度营收 1401 亿元，同比下滑 2%；净利润 399.4 亿元，同比增长 1%，非国际财
//   务报告准则下，净利润 322.5 亿元，同比增长 2%`,
// };
interface CacaderType {
  value: string;
  label: string;
  children: CacaderType[];
}
const ArticPublic: React.FC = () => {
  const [casOption, setCasOption] = useState<Array<CacaderType>>([]);
  const handleSubmit = (values: ArticleType) => {
    // console.log(values);
    let [classv1, classv2] = values.classify;
    values.classv1 = classv1; //单独存放主分类id
    values.classv2 = classv2; //单独存放子分类id
    articlePost(values).then((res) => {
      console.log(res);
    });
  };
  const handleClassify = (classifyArr: ClassifyTableType[]) => {
    // 将分类数据包处理为如下格式
    // [
    //   {
    //     value: "zhejiang",
    //     label: "Zhejiang",
    //     children: [
    //       {
    //         value: "hangzhou",
    //         label: "Hangzhou",
    //       },
    //     ],
    //   },
    // ]
    let arr: CacaderType[] = [];
    classifyArr.forEach((item) => {
      //提取主分类
      if (item.dadId === "0-0") {
        arr.push({
          value: item.objectId,
          label: item.cateName,
          children: [],
        });
      }
    });
    // console.log(arr);
    arr.forEach((item) => {
      classifyArr.forEach((child) => {
        if (item.value === child.dadId) {
          item.children.push({
            value: child.objectId,
            label: child.cateName,
            children: [],
          });
        }
      });
    });
    // console.log(arr);
    setCasOption(arr);
  };
  useEffect(() => {
    classifyGet().then((res) => {
      handleClassify(res.data.results);
    });
  }, []);
  return (
    <Form
      onFinish={handleSubmit}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      layout="horizontal"
      // initialValues={initData}
    >
      <Form.Item label="课程名称" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="课程封面" name="poster">
        <ImageUpload />
      </Form.Item>
      <Form.Item label="归属分类" name="classify">
        <Cascader options={casOption} />
      </Form.Item>
      <Form.Item label="会员课程" valuePropName="checked" name="isvip">
        <Switch />
      </Form.Item>
      <Form.Item label="课程简介" name="info">
        <TextArea />
      </Form.Item>
      <Form.Item label="课程详情" name="desc">
        <RichText />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
        <Button htmlType="button">重置</Button>
      </Form.Item>
    </Form>
  );
};

export default ArticPublic;
