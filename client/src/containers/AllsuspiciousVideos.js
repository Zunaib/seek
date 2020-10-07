
import React from "react";
import suspiciousList from "../components/admin/dashboard/suspiciousList";

class AllsuspiciousVideos extends Component{
    render(){
        <div>
            <div>
                <suspiciousList
                 username={"Ashi"}
                 videotittle={"video1"}
                 blocked={false}
                />

            </div>
        </div>

    }
}

export default  AllsuspiciousVideos;