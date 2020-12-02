import React, { useState, useEffect } from "react";
import { Layout, Menu, Avatar, Dropdown } from "antd";
import axios from "axios";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  VideoCameraOutlined,
  UserOutlined,
  HomeOutlined,
  UsergroupAddOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const WebLayout = ({ children }) => {
  const [collapsed, setcollapsed] = useState(false);
  const [selectedKey, setselectedKey] = useState("0");

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    address: "",
    phone_number: "",
    gender: "",
    password: "",
  });

  useEffect(() => {
    axios
      .post("http://localhost:5000/users/fetchusersettngs", {
        email: localStorage.getItem("useremail"),
      })
      .then((response) => {
        setLoading(false);
        setProfile({
          first_name: response.data[0].first_name,
          last_name: response.data[0].last_name,
          address: response.data[0].address,
          phone_number: response.data[0].phone_number,
          gender: response.data[0].gender,
        });
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }, []);

  const shiftprofile = () => {
    setselectedKey("2");
    if (localStorage.getItem("profile") === "admin") {
      localStorage.setItem("profile", "normal");
      window.location.reload();
    } else if (localStorage.getItem("profile") === "normal") {
      localStorage.setItem("profile", "admin");
      window.location.reload();
    }
  };

  const toggle = () => {
    setcollapsed(!collapsed);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserAddOutlined />}>
        <Link to="/request-admin-access">Admin Access</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<UsergroupAddOutlined />}>
        <Link to="/settings">Settings</Link>
      </Menu.Item>
      <Menu.Divider />

      <Menu.Item
        key="3"
        icon={<UsergroupAddOutlined style={{ fontSize: "1rem" }} />}
      >
        <Link to="/logout">Logout</Link>
      </Menu.Item>
    </Menu>
  );

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
            <Link to="/profile" onClick={() => setselectedKey("1")}>
              Profile
            </Link>
          </Menu.Item>
          {localStorage.getItem("admin") === "true" && (
            <Menu.Item
              key="2"
              icon={<HomeOutlined />}
              onClick={() => shiftprofile()}
            >
              Shift To Admin
            </Menu.Item>
          )}
          <Menu.Item
            key="3"
            icon={<HomeOutlined />}
            onClick={() => setselectedKey("3")}
          >
            <Link to="/main" onClick={() => setselectedKey("3")}>
              Main
            </Link>
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<VideoCameraOutlined />}
            onClick={() => setselectedKey("4")}
          >
            <Link to="/videos" onClick={() => setselectedKey("4")}>
              My Videos
            </Link>
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<VideoCameraOutlined />}
            onClick={() => setselectedKey("5")}
          >
            <Link to="/suspiciousvideos" onClick={() => setselectedKey("5")}>
              My Suspicious Videos
            </Link>
          </Menu.Item>
          <Menu.Item
            key="6"
            icon={<VideoCameraOutlined />}
            onClick={() => setselectedKey("6")}
          >
            <Link to="/staticvideos" onClick={() => setselectedKey("6")}>
              My Static Videos
            </Link>
          </Menu.Item>
          <Menu.Item
            key="7"
            icon={<VideoCameraOutlined />}
            onClick={() => setselectedKey("7")}
          >
            <Link to="/normalvideos" onClick={() => setselectedKey("7")}>
              My Normal Videos
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header className="navbar" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}

          <Dropdown overlay={menu} trigger={["click"]}>
            <Avatar
              loading={loading}
              style={{ margin: "0px 50px", cursor: "pointer" }}
              size="large"
              onClick={(e) => e.preventDefault()}
            >
              {profile.first_name[0]}
            </Avatar>
          </Dropdown>
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
