import React from "react";
import ReactPlayer from "react-player";



const staticList=(props)=>{
     render() 
        const videostyles = {
          playing: false,
          controls: true, 
          volume: 1,
          width: "100%",
          // height: "auto",
        };
    return(
        <div>
            <div>{props.email}</div>
            <div>{props.videoTittle}</div>
            <div>{props.sttName}</div>
            <div><ReactPlayer
            url={props.reactplayer}
            {...videostyles}
        />
        </div>
        </div>
    )
}

export default staticList;