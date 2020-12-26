import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { PageHeader, Divider, Statistic, Card, Row, Col } from "antd";

const Admindasboard = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/dashboardstats")
      .then((response) => {
        setLoading(false);
        setStats(response.data.stats);
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }, []);

  return (
    <div className="Main">
      <PageHeader
        className="site-page-header"
        title="Web Statistics"
        subTitle="All The Corresponding Statistics"
      />
      <Divider>Statistics</Divider>
      <Row gutter={16}>
        {loading ? (
          <Row justify="center">
            <Col>
              <div className="loading-spinner">
                <Spinner />
              </div>
            </Col>
          </Row>
        ) : (
          stats.map((stat) => (
            <Col span={6}>
              <Card
                style={{
                  margin: "5px",
                  border: "2px solid rgb(114, 41, 90)",
                  borderRadius: "4px",
                }}
              >
                <Statistic
                  title={stat.name}
                  value={stat.count}
                  valueStyle={{ color: "gray" }}
                />
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default Admindasboard;
