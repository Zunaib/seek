import React from "react";
import ReactPlayer from "react-player";



const SuspiciousList=(props)=>{
    const videostyles = {
        playing: false,
        controls: true, 
        volume: 1,
        width: "inherit",
        height: "inherit",
    };
    let videoPath = 'http://localhost:5000/' + props.filePath;
    return(
        <tr className={"TbTr"}>
             <td className={"ThTrTh1 ThTrTh3 ThTrTh9"}>
                <div className={"AdminListImage Center"} >
                <ReactPlayer
                className="contect-center"
            url={videoPath}
            {...videostyles}
        />
                </div>
            </td>
            <tr className={"TbTr"} >
         <td className={"ThTrTh1 ThTrTh3 ThTrTh9 ThTrTh10 Center"} >
         {props.email}
            </td>
            <td className={"ThTrTh12 ThTrTh9 ThTrTh3 ThTrTh13 Center"}>
                <span>
                {props.videoName}
                </span>
            </td>
            <td className={"ThTrTh12 ThTrTh9 ThTrTh3 ThTrTh13 Center"}>
                <span>
                {props.suspName}
                </span>
            </td>

        </tr>
        </tr>
           
            

       
       
    
    )
}



export default SuspiciousList;


