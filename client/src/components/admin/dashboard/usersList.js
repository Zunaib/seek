import React from "react";


const usersList=(props)=>{
    return(
    <div>
        <div>{props.name}</div>
        <div>{props.email}</div>
        <div>{props.blocked}</div>
        <div>{props.videos}</div>
    </div>
    )

}


export default usersList;