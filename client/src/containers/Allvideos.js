import { Components } from "antd/lib/date-picker/generatePicker";
import React , {Component} from "react";

import videoList from "../components/admin/dashboard/videoList"
import spinner from "../components/Spinner";

class Allvideos extends Component{
    state={
        videos=[],
        loading=true
    }

    componentDidMount(){
        axios
        .get(
            "http://localhost:5000/getallvideos"
        )
        .then((response) => {
            this.setState({ loading: false, videos: response.data });
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
            return err;
          });


    }
    
  render() 
  {
   
    
      <div className="main-app">
          <div className="loading">
          (
            <div className="loading">
              <Spinner />
            </div>
          ) : 
         (<div className="row">
          {this.state.videos && this.state.videos.map((video)=>(
            <videoList
                useremail={video.email}
                videotittle={video.videoName}
                reactplayer={video.filePath}
            /> 
                

              
          ))}
         
             </div> 
             
          )
          </div>

          
      </div>
     
    
        
    };
}
   
     
    
   


export default Allvideos;


   