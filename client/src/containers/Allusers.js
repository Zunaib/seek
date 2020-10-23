import React, { useState, useEffect } from "react";
import UsersList from "../components/admin/UsersList";
import axios from "axios";
import Spinner from "../components/Spinner";
import { withSnackbar } from "notistack";
import {PageHeader, Divider} from "antd"


const Allusers = (props) => {


  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    axios
    .get("http://localhost:5000/getallusers")
    .then((response) => {
      setLoading(false);
      setUsers(response.data.filter(res => res.email !== localStorage.getItem("useremail") && res.admin !== true));

    })
    .catch((err) => {
      console.log(err);
      return err;
    });
  }, [reload]);


  const actionBtn = (type, email) => {
    if (type === "block") {
      axios
        .post("http://localhost:5000/blockuser", {
          email: email,
        })
        .then((res) => {
          if (res.data.success === "User Blocked") {
            props.enqueueSnackbar("User Blocked", {
              variant: "success",
            });
            setReload(!reload);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (type === "unblock") {
      axios
        .post("http://localhost:5000/unblockuser", {
          email: email,
        })
        .then((res) => {
          if (res.data.success === "User UnBlocked") {
            props.enqueueSnackbar("User UnBlocked", {
              variant: "success",
            });
            setReload(!reload);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };


    return (
      <div className="Main">
       <PageHeader
        className="site-page-header"
        title="All Users"
        subTitle="All Users Information and Actions"
      />
      <Divider>Users</Divider>
        {loading ? (
          <Spinner />
        ) : (
          users.length>=1 ?
          <div className="AdminList">
            <div className="tbl-header">
              <table cellPadding="0" cellSpacing="0" border="0">
                <thead className="">
                  <tr>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Blocked</th>
                    <th>Admin</th>
                    <th>Action</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div>
              <table cellPadding="0" cellSpacing="0" border="0">
                <tbody className="tbl-content">
                  {users.map((user, index) =>
                      <UsersList
                        key={index}
                        first_name={user.first_name}
                        last_name={user.last_name}
                        email={user.email}
                        btnClicked={(type) =>
                        actionBtn(type, user.email)
                      }
                        blocked={user.blocked}
                        admin={user.admin}
                      />
                  )}
                </tbody>
              </table>
            </div>
          </div>
          :<h3>No Users Found</h3>
        )}
      </div>
    );
  }

export default withSnackbar(Allusers);
