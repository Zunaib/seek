import React from "react";
import { Button } from "@material-ui/core";
import ReactPlayer from "react-player";

const StaticList = (props) => {
  const videostyles = {
    playing: false,
    controls: true,
    volume: 1,
    width: "inherit",
    height: "inherit",
  };
  let videoPath = "http://localhost:5000/" + props.sttPath;
  return (
    <tr className="data-t-row">
      <td>
        <div>
          <ReactPlayer url={videoPath} {...videostyles} />
        </div>
      </td>
      <td>{props.email}</td>
      <td>
        <span>{props.name}</span>
      </td>
      <td>
        <span>{props.sttName}</span>
      </td>
      <td>
        <span>{props.sttPath}</span>
      </td>
      <td>{props.sttblocked ? "True" : "False"}</td>
      <td>
        <span>{props.sttdeleted ? "True" : "False"}</span>
      </td>
      <td>
        <Button
          disabled={props.email === localStorage.getItem("useremail")}
          variant="contained"
          color="secondary"
          onClick={() =>
            props.btnClicked(props.sttblocked ? "unblock" : "block")
          }
        >
          {props.sttblocked ? "Unblock" : "Block"}
        </Button>
      </td>
    </tr>
  );
};

export default StaticList;
