import React from "react";



const staticList=(props)=>{
    return(
        <div>
            <div>{props.email}</div>
            <div>{props.videoTittle}</div>
            <div>{props.sttName}</div>
           {/*  <div>react player</div> */}
        </div>
    )
}

export default staticList;