import React from "react"
import ReactPlayer from "react-player";

const videoList=(props)=>{
    render() 
        const videostyles = {
          playing: false,
          controls: true, 
          volume: 1,
          width: "100%",
          // height: "auto",
        };
    return(
       
    <div className="row">
        <div>{props.email}</div>
        <div>{props.videotittle}</div>
        <div><ReactPlayer
            url={props.reactplayer}
            {...videostyles}
        />
        </div>

    
        
    </div>
    )


}

export default videoList;