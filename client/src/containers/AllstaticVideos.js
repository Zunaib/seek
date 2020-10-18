
import React, { Component } from "react";
import StaticList from "../components/admin/StaticList"
import axios from "axios"
import Spinner from "../components/Spinner";
import { Divider, PageHeader } from "antd"


class AllstaticVideos extends Component {
    state = {
        static_vid: null,
        loading: true
    }
    componentDidMount() {
        axios
            .get(
                "http://localhost:5000/getallsttvideos"
            )
            .then((response) => {
                this.setState({ loading: false, static_vid: response.response });
            })
            .catch((err) => {
                console.log(err);
                return err;
            });

    }

    render() {
        return (

            <div className="Main" >
                <PageHeader
                    className="site-page-header"
                    title="All Static Videos"
                    subTitle="All Static Videos Information and Actions"
                />
                <Divider>Static Videos</Divider>
                {
                    this.state.loading ?
                        <Spinner />
                        :
                        <div>
                            <table className="Table">
                                <thead className="Thead">
                                    <tr className="TheadTrow">
                                        <th className={"ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh4 ThTrTh5"}>Email</th>
                                        <th className={" ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh5"}>Video Name</th>
                                        <th className={"ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh5 ThTrTh7"}>Static Name</th>
                                        <th className={"ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh5 ThTrTh7"}>Static Path</th>

                                    </tr>
                                </thead>
                                <tbody className="Tbody">
                                    {this.state.static_vid && this.state.static_vid.map((stt, index) => (
                                        <StaticList
                                            key={index}
                                            email={stt.email}
                                            videoName={stt.videoName}
                                            sttName={stt.sttName}
                                            sttPath={stt.sttPath}

                                        />
                                    ))
                                    }
                                </tbody>
                            </table>
                        </div>
                }

            </div>
        )
    }
}






export default AllstaticVideos;




