import React from "react"

const videoList=(props)=>{
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