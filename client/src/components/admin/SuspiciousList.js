import React from "react";
import { Button } from "@material-ui/core";


import ReactPlayer from "react-player";



const SuspiciousList=(props)=>{
    const videostyles = {
        playing: false,
        controls: true, 
        volume: 1,
        width: "inherit",
        height: "inherit",
    };
    let videoPath = 'http://localhost:5000/' + props.suspPath;

    return (
        <tr className="data-t-row">
            <td>
                <div>
                    <ReactPlayer url={videoPath} {...videostyles} />
                </div>
            </td>
            <td>{props.email}</td>
            <td>
                <span>{props.videoName}</span>
            </td>
            <td>
                <span>{props.suspName}</span>
            </td>
            <td>
                <span>{props.suspPath}</span>
            </td>
            <td>{props.suspblocked ? "True" : "False"}</td>
            <td>
                <span>{props.suspdeleted ? "True" : "False"}</span>
            </td>
            <td>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => props.btnClicked(props.suspblocked ? "unblock" : "block")}
                >
                    {props.suspblocked ? "Unblock" : "Block"}
                </Button>
            </td>
        </tr>
    );
};

export default SuspiciousList;
   