import React from "react";



const suspiciousList=(props)=>{
    return(
        <div>
            <div>{props.email}</div>
            <div>{props.videotittle}</div>
            <div>{props.susName}</div>
            {/* <div>react player</div> */}
        </div>
    )
}

export default suspiciousList;