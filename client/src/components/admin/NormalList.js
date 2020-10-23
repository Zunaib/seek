import { Button } from "@material-ui/core";
import React from "react";
import ReactPlayer from "react-player";

const NormalList = (props) => {
    const videostyles = {
        playing: false,
        controls: true,
        volume: 1,
        
        width: "inherit",
        height: "inherit",
    };
    let videoPath = "http://localhost:5000/" + props.filePath;

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
                <span>{props.norname}</span>
            </td>
            <td>
                <span>{props.filePath}</span>
            </td>
            <td>{props.blocked ? "True" : "False"}</td>
            <td>
                <span>{props.deleted ? "True" : "False"}</span>
            </td>
            <td>
                <Button
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

export default NormalList;
