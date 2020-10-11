import React from "react";


const UsersList=(props)=>{
  
    /* let videoPath = 'http://localhost:5000/' + props.filePath; */
    return(
    <div>
         <tr className={"TbTr"} >
         <td className={"ThTrTh1 ThTrTh3 ThTrTh9 ThTrTh10 Center"} >
            {props.first_name}
            </td>
            <td className={"ThTrTh12 ThTrTh9 ThTrTh3 ThTrTh13 Center"}>
                <span>
                {props.last_name}
                </span>
            </td>
            <td className={"ThTrTh12 ThTrTh9 ThTrTh3 ThTrTh13 Center"}>
                <span>
                {props.email}
                </span>
            </td>
            <td className={"ThTrTh12 ThTrTh9 ThTrTh3 ThTrTh13 Center"}>
                <span>
                {props.blocked ? "True" :"False"}
                </span>
            </td>
            {/* <td className={"ThTrTh12 ThTrTh9, ThTrTh3 ThTrTh13 ThTrTh14 Center"}>
                {props.blocked ? "True" :"False"}
            </td>
            <td className={"ThTrTh1 ThTrTh3 ThTrTh9"}>
                    <Button variant="contained" color="secondary">{props.blocked ? "Unblock" : "Block"}</Button>
            </td>
          */}
        
        </tr>
     
       {/*  <div>{props.first_name}</div>
        <div>{props.last_name}</div>
        <div>{props.email}</div>
        <div>{props.blocked}</div>  */}
       
    </div>
    )

}


export default UsersList;