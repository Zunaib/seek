import React from "react";


const usersList=(props)=>{
    return(
    <div>
        <div>{props.first_name}</div>
        <div>{props.last_name}</div>
        <div>{props.email}</div>
        {/* <div>{props.blocked}</div>
        <div>{props.videos}</div */}
    </div>
    )

}


export default usersList;