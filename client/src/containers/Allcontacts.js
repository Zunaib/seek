import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { PageHeader, Divider, Statistic, Card, Row, Col } from "antd";



const Allcontacts = () => {

    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:5000/getcontactus")
            .then((response) => {
                setLoading(false);
                setContacts(response.data.filter(res => res.email !== localStorage.getItem("useremail")));

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
                title="Contact Queries"
                subTitle="All The User Queries"
            />
            <Divider>Queries</Divider>
          <div className="AdminList">

            <Row gutter={16} >
                {
                    loading ? <Spinner /> :
                    contacts.length >=1 ?
                    contacts.map(cnt => (

                            <Col span={6}>

                                <Card style={{ margin: "5px", border: "1px solid #001529" }} >
                                    <Statistic
                                        title={cnt.email}
                                        value={cnt.message}
                                        valueStyle={{ color: 'gray' }}
                                    />
                                </Card>
                            </Col>
                        ))
                        :<div  style={{margin:"0 auto", textAlign:"center"}}><h3>No Contact Queries</h3></div>
                }
            </Row>
        </div>
        </div>
    )

}


export default Allcontacts;