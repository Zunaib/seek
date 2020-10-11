import React from "react";
import ReactPlayer from "react-player";



const staticList=(props)=>{
    const videostyles = {
        playing: false,
        controls: true, 
        volume: 1,
        width: "inherit",
        height: "inherit",
    };
    let videoPath = 'http://localhost:5000/' + props.filePath;
    return
       


export default staticList;



{/* <div>
<div>{props.email}</div>
<div>{props.videoTittle}</div>
<div>{props.sttName}</div>
<div><ReactPlayer
url={props.reactplayer}
{...videostyles}
/>
</div>
</div>
) */}