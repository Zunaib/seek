import React from "react";



const normalList=(props)=>{
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
            <div>{props.norName}</div>
            <div><ReactPlayer
            url={props.reactplayer}
            {...videostyles}
        />
        </div>
        </div>
    )
}

export default normalList;