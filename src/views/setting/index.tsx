import ImageUpload from "../../components/ImageUpload";
import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { UserInfoUpdateType, userUpdate } from "@/api/user";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginSuccess } from "@/store/modules/user";

const Setting: React.FC = () => {
  const { userInfo } = useAppSelector((state) => state.user);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  useEffect(() => {
    form.setFieldsValue(userInfo);
  }, []);
  const handleSubmit = (values: UserInfoUpdateType) => {
    console.log(values);
    userUpdate(userInfo?.objectId as string, values).then((res) => {
      // eslint-disable-next-line no-eval
      let remember = eval(localStorage.getItem("remember") as string);
      console.log(typeof remember);

      dispatch(
        loginSuccess({
          info: { ...userInfo, ...values }, //更新用户信息
          remember,
        })
      );
    });
  };

  return (
    <Form
      onFinish={handleSubmit}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      layout="horizontal"
      form={form}
    >
      <Form.Item label="账号名称" name="username">
        <Input readOnly />
      </Form.Item>
      <Form.Item label="用户昵称" name="nickname">
        <Input />
      </Form.Item>
      <Form.Item label="用户头像" name="avatar">
        <ImageUpload />
      </Form.Item>
      <Form.Item label="邮箱" name="email">
        <Input />
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

export default Setting;
