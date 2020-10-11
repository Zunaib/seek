import React ,{Component }from "react";
import SuspiciousList from "../components/admin/dashboard/SuspiciousList"
import axios from "axios";
import Spinner from "../components/Spinner";
import {NavLink} from "react-router-dom"

class AllsuspiciousVideos extends Component
{
    state={
        susp_vid:null,
        loading:true
    };
    componentDidMount(){
        axios
        .get(
            "http://localhost:5000/getallsuspvideos"
            )
        .then((response)=>{
            this.setState({loading:false , susp_vid:response.response});
            console.log(response)
           
        })
        .catch((err) => {
            console.log(err);
            return err;
        });

    }
    
   
    
    render()
    {
        return(
            <div>
           
        <div className="Main" >
        {
          this.state.loading ?
          <Spinner/>
          :
          <div className="SuspList">
            <NavLink to='/admin-dashboard'>
                <div className="cross">
                    <h4>Close</h4>
                    <i className="fas fa-times"></i>
                </div>
            </NavLink>
            <h1>All Susp Videos</h1>
            <div className="VideosSus">
                <table className="Table">
                    <thead className="Thead">
                        <tr className="TheadTrow">
                            <th className={"ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh4 ThTrTh5"}>Email</th>
                            <th className={" ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh5"}>Video Name</th>
                            <th className={"ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh5 ThTrTh7"}>Suspicious Name</th>
                            <th className={"ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh5 ThTrTh7"}>Path</th>
                            {/* <th className={"ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh5 ThTrTh8 Center"}>Blocked</th>
                            <th className={"ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh5"}>Deleted</th>
                            <th className={"ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh5"}>Action</th>
                            <th className={"ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh5 ThTrTh8"}></th> */}
                        </tr>
                    </thead>
                    <tbody className="Tbody">
                        {this.state.susp_vid && this.state.susp_vid.map((susp,index) => (
                            <SuspiciousList
                        
                            
                            key={index}
                            email={susp.email}
                            videoName={susp.videoName}
                            suspName={susp.suspName}
                            filePath={susp.filePath}
                            />
              ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        }
       
    </div>
  </div>
        )
  }}

export default  AllsuspiciousVideos;





