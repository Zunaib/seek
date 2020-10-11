
import React from "react";
import staticList from "../components/admin/dashboard/StaticList";

class AllstaticVideos extends Component{
    state={
        static_vid:null,
        loading:true
    }
    componentDidMount() {
        axios
        .get("http://localhost:5000//getallsttvideos")
        .then((response)=>{
            setState({loading:false , static_vid:response.data});
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
        <div className="StaticList">
          <NavLink to='/admin-dashboard'>
              <div className="cross">
                  <h4>Close</h4>
                  <i className="fas fa-times"></i>
              </div>
          </NavLink>
          <h1>All Static</h1>
          <div className="VideosStatic">
              <table className="Table">
                  <thead className="Thead">
                      <tr className="TheadTrow">
                          <th className={"ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh4 ThTrTh5"}>First Name</th>
                          <th className={" ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh5"}>Last Name</th>
                          <th className={"ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh5 ThTrTh7"}>Email</th>
                          <th className={"ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh5 ThTrTh7"}>Blocked</th>
                        
                      </tr>
                  </thead>
                  <tbody className="Tbody">
                  {this.state.users.map((user , index)=>(
                    <UsersList
                        key={index}
                        first_name={user.first_name}
                        last_name={user.last_name}
                        email={user.email}
                        blocked={user.blocked}
                        
                                    
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
}
}



    
        

export default AllstaticVideos;




{/* <div>
            <div className="row">
                {this.state.static_vid.map((static)=>(
                    <staticList
                    email={susp.email}
                    videotittle={susp.videoName}
                    sttName={susp.sttName}
                    reactplayer={video.filePath}
                    
                     />
                ))}
                     
     
                 </div>
             </div>
     
         }
     } */}