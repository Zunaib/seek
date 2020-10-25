import React from "react";
import { Button } from "@material-ui/core";

const UsersList = (props) => {
  return (
    <tr className="data-t-row">
      <td>{props.email}</td>
      <td>
        <span>{props.first_name}</span>
      </td>
      <td>
        <span>{props.last_name}</span>
      </td>
      <td>
        <span>{props.blocked ? "True" : "False"}</span>
      </td>
      <td>{props.admin ? "True" : "False"}</td>
      <td>
        <Button
          disabled={props.admin}
          variant="contained"
          color="secondary"
          onClick={() => props.btnClicked(props.blocked ? "unblock" : "block")}
        >
          {props.blocked ? "Unblock" : "Block"}
        </Button>
      </td>
    </tr>
  );
};

export default UsersList;
