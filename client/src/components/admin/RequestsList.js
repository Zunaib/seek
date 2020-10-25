import React from "react";
import {Button} from "@material-ui/core"


const RequestsList=(props)=>{
  
    return(
        <tr className="data-t-row">
        <td>{props.email}</td>
        <td>
          <span>{props.reason}</span>
        </td>
        <td>
          <span>{props.message}</span>
        </td>
        <td>
          <span>Wants To Be Admin</span>
        </td>

        <td>
          <Button variant="contained" color="secondary" onClick={() => props.btnClicked()}>
            Grant Access
          </Button>
        </td>
      </tr>
    )

}


export default RequestsList;