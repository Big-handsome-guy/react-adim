import React from "react";
import "./index.less";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Card, Col, Row, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { userLoginAsync } from "@/store/modules/user";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { isLoading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    userLoginAsync(dispatch, values, navigate); //触发状态机异步请求
  };

  let initData = {
    remember: true,
    username: "老六",
    password: "666",
  };

  return (
    <Row justify="center" align="middle" className="login_box">
      <Col span={8}>
        <Spin spinning={isLoading}>
          <Card title="知识付费管理平台">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={initData}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>记住密码</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  忘记密码
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  block
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Spin>
      </Col>
    </Row>
  );
};

export default Login;
