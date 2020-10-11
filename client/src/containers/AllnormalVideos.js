
import React , {Component} from "react";
import NormalList from "../components/admin/dashboard/NormalList";
import axios from "axios"



import Spinner from "../components/Spinner";
import {NavLink} from "react-router-dom"

class AllnormalVideos extends Component{
    state={
        nor_vid:null,
        loading:true
    };
    componentDidMount(){
        axios
        .get("http://localhost:5000/getallnorvideos")
        .then((response)=>{
            this.setState({loading:false , nor_vid:response.response});
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
          <div className="NormalList">
            <NavLink to='/admin-dashboard'>
                <div className="cross">
                    <h4>Close</h4>
                    <i className="fas fa-times"></i>
                </div>
            </NavLink>
            <h1>All NormalList</h1>
            <div className="VideosNormal">
                <table className="Table">
                    <thead className="Thead">
                        <tr className="TheadTrow">
                            <th className={"ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh4 ThTrTh5"}>Email</th>
                            <th className={" ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh5"}>Video Name</th>
                            <th className={"ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh5 ThTrTh7"}>Normal Name</th>
                            <th className={"ThTrTh1 ThTrTh6 ThTrTh2 ThTrTh3 ThTrTh5 ThTrTh7"}>Normal Path</th>
                          
                        </tr>
                    </thead>
                    <tbody className="Tbody">
                    {this.state.nor_vid && this.state.nor_vid.map((nor, index)=>(
                        <normalList
                        email={nor.email}
                        videoName={nor.videoName}
                        norName={nor.norName}
                        norPath={nor.norPath}
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
  
        

export default AllnormalVideos;



{/* <div>
             <div className="row">
                {this.state.nor_vid.map((nor)=>
                <normalList
                email={nor.email}
                videotittle={nor.videoName}
                norName={nor.norName}
                reactplayer={video.filePath}
                />
                )}
            </div>
        </div>

    }
} */}