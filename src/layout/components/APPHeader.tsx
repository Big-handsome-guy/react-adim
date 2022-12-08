import { Layout, Dropdown, Row, Col, Avatar, Image } from "antd";
import React from "react";
import { SettingOutlined, LockOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { loginFail } from "@/store/modules/user";

const { Header } = Layout;

export default function APPHeader() {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    // message.info("Click on menu item.");
    // console.log("click", e);
    //退出登录
    if (e.key === "2") {
      dispatch(loginFail());
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "个人设置",
      key: "1",
      icon: <SettingOutlined />,
    },
    {
      label: "退出登录",
      key: "2",
      icon: <LockOutlined />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <Row justify="end" align="middle" style={{ height: "100%" }}>
        <Col span={4}>
          <Dropdown.Button
            menu={menuProps}
            icon={
              <Avatar
                src={
                  <Image
                    src={
                      userInfo?.avatar
                        ? userInfo.avatar
                        : "https://little-potato.twohcar.top/jPY3WjAawEJfPAMRrDjXvXfiv3l9Df9R/image.png"
                    }
                    style={{ width: 30 }}
                  />
                }
              />
            }
          >
            {userInfo?.username}
          </Dropdown.Button>
        </Col>
      </Row>
    </Header>
  );
}
