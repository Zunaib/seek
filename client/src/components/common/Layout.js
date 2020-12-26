import React, { useState, useEffect } from "react";
import { Layout, Menu, Avatar, Dropdown } from "antd";
import axios from "axios";
import {
  MenuUnfoldOutlined,
  SettingOutlined,
  CameraOutlined,
  MessageOutlined,
  MenuFoldOutlined,
  VideoCameraOutlined,
  UserOutlined,
  HomeOutlined,
  ContainerOutlined,
  UsergroupAddOutlined,
  UserSwitchOutlined,
  LogoutOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const AdminLayout = ({ children }) => {
  const [collapsed, setcollapsed] = useState(false);
  const [selectedKey, setselectedKey] = useState("0");
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    address: "",
    phone_number: "",
    picture: null,
    gender: "",
    password: "",
  });

  useEffect(() => {
    axios
      .post("http://localhost:5000/users/fetchusersettngs", {
        email: localStorage.getItem("useremail"),
      })
      .then((response) => {
        console.log(response);
        setLoading(false);
        setProfile({
          first_name: response.data[0].first_name,
          last_name: response.data[0].last_name,
          address: response.data[0].address,
          phone_number: response.data[0].phone_number,
          picture: response.data[0].picture,
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
    <Menu style={{ padding: "10px", borderRadius: "2px" }}>
      <Menu.Item
        key="1"
        icon={
          <LogoutOutlined
            style={{ fontSize: "1.2em", verticalAlign: "0.05em" }}
          />
        }
      >
        <Link to="/logout" style={{ fontSize: "1rem" }}>
          Logout
        </Link>
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
          {localStorage.getItem("admin") === "true" && (
            <Menu.Item
              key="1"
              icon={<UserSwitchOutlined />}
              onClick={() => shiftprofile()}
            >
              Shift To Normal
            </Menu.Item>
          )}

          <Menu.Item
            key="2"
            icon={<HomeOutlined />}
            onClick={() => setselectedKey("2")}
          >
            <Link to="/dashboard" onClick={() => setselectedKey("2")}>
              Dashboard
            </Link>
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<VideoCameraOutlined />}
            onClick={() => setselectedKey("3")}
          >
            <Link to="/allvideos" onClick={() => setselectedKey("3")}>
              All Videos
            </Link>
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<VideoCameraOutlined />}
            onClick={() => setselectedKey("4")}
          >
            <Link to="/allsuspvid" onClick={() => setselectedKey("4")}>
              All Suspicious Videos
            </Link>
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<VideoCameraOutlined />}
            onClick={() => setselectedKey("5")}
          >
            <Link to="/allstaticvid" onClick={() => setselectedKey("5")}>
              All Static Videos
            </Link>
          </Menu.Item>
          <Menu.Item
            key="6"
            icon={<VideoCameraOutlined />}
            onClick={() => setselectedKey("6")}
          >
            <Link to="/allnormalvid" onClick={() => setselectedKey("6")}>
              All Normal Videos
            </Link>
          </Menu.Item>
          <Menu.Item
            key="7"
            icon={<UserOutlined />}
            onClick={() => setselectedKey("7")}
          >
            <Link to="/allusers" onClick={() => setselectedKey("7")}>
              All Users
            </Link>
          </Menu.Item>
          <Menu.Item
            key="8"
            icon={<ContainerOutlined />}
            onClick={() => setselectedKey("8")}
          >
            <Link to="/allcontacts" onClick={() => setselectedKey("8")}>
              All Contact Queries
            </Link>
          </Menu.Item>
          <Menu.Item
            key="9"
            icon={<UsergroupAddOutlined />}
            onClick={() => setselectedKey("9")}
          >
            <Link to="/allrequests" onClick={() => setselectedKey("9")}>
              All Requests
            </Link>
          </Menu.Item>
          <Menu.Item
            key="10"
            icon={<MessageOutlined />}
            onClick={() => setselectedKey("10")}
          >
            <Link to="/allmessages" onClick={() => setselectedKey("10")}>
              All Messages
            </Link>
          </Menu.Item>
          <Menu.Item
            key="11"
            icon={<CameraOutlined />}
            onClick={() => setselectedKey("11")}
          >
            <Link to="/allcctvs" onClick={() => setselectedKey("11")}>
              All CCTV Cams
            </Link>
          </Menu.Item>
          <Menu.Item
            key="12"
            icon={<NotificationOutlined />}
            onClick={() => setselectedKey("12")}
          >
            <Link to="/allnotifications" onClick={() => setselectedKey("12")}>
              All Notifications
            </Link>
          </Menu.Item>
          <Menu.Item
            key="13"
            icon={<SettingOutlined />}
            onClick={() => setselectedKey("13")}
          >
            <Link to="/settings" onClick={() => setselectedKey("13")}>
              Settings
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
              icon={<UserOutlined />}
              style={{ margin: "0px 50px", cursor: "pointer" }}
              size="large"
              onClick={(e) => e.preventDefault()}
              src={"http://localhost:5000/" + profile?.picture}
            />
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

export default AdminLayout;
