import React, { Component } from "react";
import SuspiciousList from "../components/admin/SuspiciousList"
import axios from "axios";
import Spinner from "../components/Spinner";
import { Divider, PageHeader } from "antd"


class AllsuspiciousVideos extends Component {
    state = {
        susp_vid: null,
        loading: true
    };
    componentDidMount() {
        axios
            .get(
                "http://localhost:5000/getallsuspvideos"
            )
            .then((response) => {
                this.setState({ loading: false, susp_vid: response.response });
                console.log(response)

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
                    title="All Suspicious Videos"
                    subTitle="All Suspicious Videos Information and Actions"
                />
                <Divider>Suspicious Videos</Divider>
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
                                        <th className={"ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh5 ThTrTh7"}>Suspicious Name</th>
                                        <th className={"ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh5 ThTrTh7"}>Path</th>
                                    </tr>
                                </thead>
                                <tbody className="Tbody">
                                    {this.state.susp_vid && this.state.susp_vid.map((susp, index) => (
                                        <SuspiciousList
                                            key={index}
                                            email={susp.email}
                                            videoName={susp.videoName}
                                            suspName={susp.suspName}
                                            filePath={susp.filePath}
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

export default AllsuspiciousVideos;





