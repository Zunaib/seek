import React from "react"

const videoList=(props)=>{
    return(
    <div>
        <div>{props.username}</div>
        <div>{props.videotittle}</div>
        <div>{props.blocked}</div>
        <div>React player</div>
        
    </div>
    )

}

export default videoList;