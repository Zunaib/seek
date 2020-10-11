import { Button } from "@material-ui/core";
import React from "react"
import ReactPlayer from "react-player";

const VideoList=(props)=>{
    const videostyles = {
        playing: false,
        controls: true, 
        volume: 1,
        width: "inherit",
        height: "inherit",
    };
    let videoPath = 'http://localhost:5000/' + props.sttPath;

    return (
        <tr className={"TbTr"} > 
            <td className={"ThTrTh1 ThTrTh3 ThTrTh9"}>
                <div className={"AdminListImage Center"} >
                <ReactPlayer
                className="contect-center"
            url={videoPath}
            {...videostyles}
        />
                </div>
            </td>
            <td className={"ThTrTh1 ThTrTh3 ThTrTh9 ThTrTh10 Center"} >
            {props.email}
            </td>
            <td className={"ThTrTh12 ThTrTh9 ThTrTh3 ThTrTh13 Center"}>
                <span>
                {props.name}
                </span>
            </td>
            <td className={"ThTrTh12 ThTrTh9 ThTrTh3 ThTrTh13 Center"}>
                <span>
                {props.filePath}
                </span>
            </td>
            <td className={"ThTrTh12 ThTrTh9 ThTrTh3 ThTrTh13 Center"}>
                <span>
                {props.deleted ? "True" :"False"}
                </span>
            </td>
            <td className={"ThTrTh12 ThTrTh9, ThTrTh3 ThTrTh13 ThTrTh14 Center"}>
                {props.blocked ? "True" :"False"}
            </td>
            <td className={"ThTrTh1 ThTrTh3 ThTrTh9"}>
                    <Button variant="contained" color="secondary">{props.blocked ? "Unblock" : "Block"}</Button>
            </td>


        </tr>
    );
}


export default VideoList;