import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { IRoleParams, roleGet, userReg, UserRegParams } from "@/api/user";
const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
interface IProps {
  handleTableUpdate: any;
}
const UserForm: React.FC<IProps> = (props) => {
  const [form] = Form.useForm();
  const [roleList, setRoleList] = useState<Array<IRoleParams>>([]);
  useEffect(() => {
    roleGet().then((res) => {
      setRoleList(res.data.results);
    });
  }, []);
  const onFinish = (values: UserRegParams) => {
    console.log(values);
    let { objectId, roleName } = roleList[values.roleidx];
    values.roleid = objectId;
    values.rolename = roleName;
    userReg(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="username" label="账号名称" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="默认密码" rules={[{ required: true }]}>
        <Input type="password" />
      </Form.Item>
      <Form.Item name="roleidx" label="账号角色">
        <Select>
          {roleList.map((item, index) => {
            return (
              <Option value={index} key={item.objectId}>
                {item.roleName}
              </Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
        <Button htmlType="button" onClick={onReset}>
          重置
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
