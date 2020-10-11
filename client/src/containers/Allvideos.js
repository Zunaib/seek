
import React , {Component} from "react";
import axios from "axios"
import VideoList from "../components/admin/dashboard/videoList"


import Spinner from "../components/Spinner";
import {NavLink} from "react-router-dom"

class Allvideos extends Component{
    state={
        videos:[],
        loading:true
    }

    componentDidMount() { 
        axios
        .get(
            "http://localhost:5000/getallvideos"
        )
        .then((response) => {
            this.setState({ loading: false, videos:response.data });
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
            return err;
          });


    }
    
  render() 
  {
    return(
        
       
    <div className="Main" >
    {
      this.state.loading ?
      <Spinner/>
      :
      <div className="AdminList">
        <NavLink to='/admin-dashboard'>
            <div className="cross">
                <h4>Close</h4>
                <i className="fas fa-times"></i>
            </div>
        </NavLink>
        <h1>All Users</h1>
        <div className="Videos">
            <table className="Table">
                <thead className="Thead">
                <tr className="TheadTrow">
                    <th className={"ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh4 ThTrTh5"}>Video</th>
                    <th className={" ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh5"}>Email</th>
                    <th className={"ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh5 ThTrTh7"}>Name</th>
                    <th className={"ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh5 ThTrTh7"}>Path</th>
                    <th className={"ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh5 ThTrTh8 Center"}>Blocked</th>
                    <th className={"ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh5"}>Deleted</th>
                    <th className={"ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh5"}>Action</th>
                    <th className={"ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh5 ThTrTh8"}></th>
                    </tr>
                    
                </thead>
                <tbody className="Tbody">
                {
                    this.state.videos.map((video, index) => (
                                    <VideoList
                                    key={index}
                                    email={video.email}
                                    name={video.videoName}
                                    filePath={video.filePath}
                                    blocked={video.blocked}
                                    deleted={video.deleted}
                                    />
          ))
                  }
                </tbody>
            </table>
        </div>
    </div>
    }
   
</div>

)
}
}

 



  
  

export default Allvideos;
