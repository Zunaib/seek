import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  VideoCameraOutlined,
  UserOutlined,
  HomeOutlined,
  DownOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Dropdown } from "antd";

const { Header, Sider, Content } = Layout;

const WebLayout = ({ children }) => {
  const [collapsed, setcollapsed] = useState(false);
  const [selectedKey, setselectedKey] = useState("0");

  const shiftprofile = () => {
    if(localStorage.getItem("profile") === "admin"){
      localStorage.setItem("profile","normal")
      window.location.reload()
    }else if(localStorage.getItem("profile") === "normal"){
      localStorage.setItem("profile","admin")
      window.location.reload()
    }
  }

  const menu = (
    <Menu>
    {
      localStorage.getItem("admin") === "true" &&
      <Menu.Item onClick={()=>shiftprofile()}>Shift To Admin</Menu.Item>
    }
      <Menu.Item>Settings</Menu.Item>
      <Menu.Item>
        <Link to="/logout">
          Logout
        </Link>
      </Menu.Item>
    </Menu>
  );

  const toggle = () => {
    setcollapsed(!collapsed);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img src={require("../../assets/locked-white.png")} alt="logo" />
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
          <Menu.Item
            key="1"
            icon={<UserOutlined />}
            onClick={() => setselectedKey("1")}
          >
            <Dropdown overlay={menu} trigger={['click']}>
              <a href="#profile">
              Profile <DownOutlined />
              </a>
            </Dropdown>
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<HomeOutlined />}
            onClick={() => setselectedKey("2")}
          >
            <Link to="/main" onClick={() => setselectedKey("2")}>
              Main
            </Link>
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<VideoCameraOutlined />}
            onClick={() => setselectedKey("3")}
          >
            <Link to="/videos" onClick={() => setselectedKey("3")}>
              My Videos
            </Link>
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<UserAddOutlined />}
            onClick={() => setselectedKey("4")}
          >
            <Link to="/request-admin-access" onClick={() => setselectedKey("4")}>
              Admin Access
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <main className="app">{children}</main>
        </Content>
      </Layout>
    </Layout>
  );
};

export default WebLayout;
