
import React from "react";
import suspiciousList from "../components/admin/dashboard/suspiciousList";

class AllsuspiciousVideos extends Component{
    state={
        susp_vid=null,
        loading=true
    };
    componentDidMount(){
        axios
        .get("http://localhost:5000/getallsuspvideos")
        .then((response)=>{
            this.setState({loading:false , susp_vid:response.data});
            console.log(response)

        })
        .catch((err) => {
            console.log(err);
            return err;
        });

    }
    
   
    
    render(){
        const videostyles = {
            playing: false,
            controls: true, 
            volume: 1,
            width: "100%",
            // height: "auto",
          };
        
          <div className="main-app">
              <div className="loading">
              (
                <div className="loading">
                  <Spinner />
                </div>
              ) : 
             (
        
        
            <div className="row">
                {this.state.susp_vid.map((susp)=>
                <suspiciousList
                email={susp.email}
                videotittle={susp.videoName}
                susName={susp.suspName}
               />
                )}
                

            </div>
            </div>
            </div>
        

    }
}

export default  AllsuspiciousVideos;