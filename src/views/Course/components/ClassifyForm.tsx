import { Button, Form, Input, Select, Switch } from "antd";
import React, { Dispatch, SetStateAction } from "react";
import { classifyAdd } from "../../../api/course";
import { ClassifyType } from "../../../types/course";

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface ModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  cateList: Array<ClassifyType>;
}
const ClassifyForm: React.FC<ModalProps> = (props) => {
  const [form] = Form.useForm();

  const onFinish = (values: ClassifyType) => {
    console.log(values);
    classifyAdd(values).then((res) => {
      props.setIsModalOpen(false);
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="cateName" label="类目名称" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="dadId" label="父级类目" rules={[{ required: true }]}>
        <Select placeholder="请选择父级类目" allowClear>
          <Option value="0-0">顶级类目</Option>
          {/* 列表渲染主类目 */}
          {props.cateList.map(({ objectId, cateName }) => {
            return (
              <Option value={objectId} key={objectId}>
                {cateName}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item name="state" label="是否上架" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          录入
        </Button>
        <Button htmlType="button" onClick={onReset}>
          重置
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ClassifyForm;
