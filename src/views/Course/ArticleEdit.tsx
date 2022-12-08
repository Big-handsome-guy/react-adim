import ImgUpload from "../../components/ImageUpload";
import { Button, Cascader, Form, Input, Switch } from "antd";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { classifyGet, articlePut } from "../../api/course";
import { ClassifyTableType, ArticleType } from "../../types/course";
import RichText from "../../components/RichText";
import { useLocation } from "react-router-dom";
import qs from "query-string";
const { TextArea } = Input;

interface CacaderType {
  value: string;
  label: string;
  children: CacaderType[];
}
const ArticleEdit: React.FC = () => {
  const location = useLocation();
  const [casOption, setCasOption] = useState<Array<CacaderType>>([]);
  const [form] = Form.useForm(); //获取表单对象
  let initData = qs.parse(location.search);
  useLayoutEffect(() => {
    // console.log("Edit", initData);
    form.setFieldsValue(initData); //为表单设置默认值
  }, []);
  const handleSubmit = (values: ArticleType) => {
    // console.log(initData);
    let [classv1, classv2] = values.classify;
    values.classv1 = classv1; //单独存放主分类id
    values.classv2 = classv2; //单独存放子分类id
    articlePut(initData.objectId as string, values).then((res) => {
      console.log(res);
    });
  };
  const handleClassify = (cateArr: ClassifyTableType[]) => {
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
    cateArr.forEach((item) => {
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
      cateArr.forEach((child) => {
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
      form={form}
    >
      <Form.Item label="课程名称" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="课程封面" name="poster">
        <ImgUpload />
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
          确认修改
        </Button>
        <Button htmlType="button">重置</Button>
      </Form.Item>
    </Form>
  );
};

export default ArticleEdit;
