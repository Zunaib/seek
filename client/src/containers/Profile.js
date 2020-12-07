import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Avatar, Card, Col, Row, Statistic } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    address: "",
    about: "",
    phone_number: "",
    picture: null,
    gender: "",
    password: "",
  });
  const [counts, setCounts] = useState([]);

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
          about: response.data[0].about,
          picture: response.data[0].picture,
          gender: response.data[0].gender,
        });
        setCounts(response.data[1]);
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }, []);

  return (
    <div className="Main">
      {loading ? (
        <Row justify="center">
          <Col>
            <div className="loading-spinner">
              <Spinner />
            </div>
          </Col>
        </Row>
      ) : (
        <>
          <div className="topimage"></div>
          <div className="imagebutton">
            <Avatar
              icon={<UserOutlined />}
              size={128}
              style={{ color: "#fff", backgroundColor: "#001529" }}
              src={"http://localhost:5000/" + profile?.picture}
            />
          </div>

          <div className="profile">
            <div className="profileinfo">
              <h1>{profile.first_name + " " + profile.last_name}</h1>
              <h4>
                {localStorage.getItem("admin") === "true" ? "Admin" : "User"}
              </h4>
              <h5>{profile?.about}</h5>
              <div className="connect"></div>
            </div>
            <div className="videostats">
              <Row justify="center">
                <Col span={10}>
                  <Card style={{ margin: "5px", border: "1px solid #001529" }}>
                    <Statistic
                      title="Videos"
                      value={counts.simplevideos}
                      valueStyle={{ color: "gray" }}
                    />
                  </Card>
                </Col>
                <Col span={10}>
                  <Card style={{ margin: "5px", border: "1px solid #001529" }}>
                    <Statistic
                      title="Suspicious Videos"
                      value={counts.suspvideos}
                      valueStyle={{ color: "gray" }}
                    />
                  </Card>
                </Col>
                <Col span={10}>
                  <Card style={{ margin: "5px", border: "1px solid #001529" }}>
                    <Statistic
                      title="Static Videos"
                      value={counts.sttvideos}
                      valueStyle={{ color: "gray" }}
                    />
                  </Card>
                </Col>
                <Col span={10}>
                  <Card style={{ margin: "5px", border: "1px solid #001529" }}>
                    <Statistic
                      title="Normal Videos"
                      value={counts.norvideos}
                      valueStyle={{ color: "gray" }}
                    />
                  </Card>
                </Col>
              </Row>
            </div>
            {localStorage.getItem("profile") !== "admin" ? (
              <div className="profilework">
                <div className="workbuttons">
                  <div className="workbutton  ">
                    <Link to="/videos">
                      <i className="fas fa-video"></i>
                      <h5>Videos</h5>
                    </Link>
                  </div>
                  <div className="workbutton ">
                    <Link to="/suspiciousvideos">
                      <i className="fas fa-video"></i>
                      <h5>Suspicious</h5>
                    </Link>
                  </div>
                  <div className="workbutton ">
                    <Link to="/staticvideos">
                      <i className="fas fa-video"></i>
                      <h5>Static</h5>
                    </Link>
                  </div>
                  <div className="workbutton ">
                    <Link to="/normalvideos">
                      <i className="fas fa-video"></i>
                      <h5>Normal</h5>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="profilework">
                <h3 style={{ padding: "20px" }}>
                  To see Profilebuttons, Head to Normal Profile
                </h3>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
