import React, { useState, useEffect } from "react";
import RequestsList from "../components/admin/RequestsList";
import axios from "axios";
import Spinner from "../components/Spinner";
import { withSnackbar } from "notistack";
import { PageHeader, Divider } from "antd"

const Allrequests = (props) => {

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/fetchrequests")
      .then((response) => {
        setLoading(false);
        setRequests(response.data);
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }, [reload]);

  const actionBtn = (email) => {
    axios
    .post("http://localhost:5000/grantadminaccess", {
      email: email,
    })
    .then((res) => {
      if (res.data.success === "Access Granted") {
        props.enqueueSnackbar("Access Granted", {
          variant: "success",
        });
        setReload(!reload);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="Main">
      <PageHeader
        className="site-page-header"
        title="All Requests"
        subTitle="All Admin Requests"
      />
      <Divider>Requests</Divider>
      {loading ? (
        <Spinner />
      ) : (
          requests.length >= 1 ?
            <div className="AdminList">
              <div className="tbl-header">
                <table cellPadding="0" cellSpacing="0" border="0">
                  <thead className="">
                    <tr>
                      <th>Email</th>
                      <th>Reason</th>
                      <th>Message</th>
                      <th>Type</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div>
                <table cellPadding="0" cellSpacing="0" border="0">
                  <tbody className="tbl-content">
                    {requests.map((user, index) =>
                      <RequestsList
                        key={index}
                        email={user.email}
                        btnClicked={(type) =>
                          actionBtn(user.email)
                        }
                        reason={user.reason}
                        message={user.message}
                      />
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            : <h3>No Requests Found</h3>
        )}
    </div>
  )
}

export default withSnackbar(Allrequests)
