import React from "react";



const suspiciousList=(props)=>{
    return(
        <div>
            <div>{props.username}</div>
            <div>{props.videoTittle}</div>
            <div>{props.blocked}</div>
            <div>react player</div>
        </div>
    )
}

export default suspiciousList;