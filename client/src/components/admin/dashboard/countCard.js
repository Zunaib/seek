import React from "react";



const countCard =(props)=>{
    return(
        <div>
                <div>
                <div><h3>{props.name}</h3></div>
                    <div><h5>{props.count}</h5></div>

                
                </div>
        </div>

    )
}

export default countCard;