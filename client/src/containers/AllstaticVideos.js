
import React from "react";
import staticList from "../components/admin/dashboard/staticList";

class AllstaticVideos extends Component{
    state={
        static_vid=null,
        loading=true
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


    render(){
        <div>
            <div className="row">
                {this.state.static_vid.map((static)=>(
                    <staticList
                    email={susp.email}
                    videotittle={susp.videoName}
                    sttName={susp.sttName}
                    
                     />
                ))}
                     
     
                 </div>
             </div>
     
         }
     }

export default AllstaticVideos;