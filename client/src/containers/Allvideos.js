import { Components } from "antd/lib/date-picker/generatePicker";
import React , {Component} from "react";
import videoList from "../components/admin/dashboard/videoList"

class Allvideos extends Component{
    render(){
        <div>
           <videoList
           username={"Ashi"}
           videotittle={"video1"}
           blocked={false}
           />
        </div>
    }

}


export default Allvideos;