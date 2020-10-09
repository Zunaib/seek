
import React from "react";
import normalList from "../components/admin/dashboard/normalList";

class AllnormalVideos extends Component{
    state={
        nor_vid=null,
        loading=true
    };
    componentDidMount(){
        axios
        .get("http://localhost:5000/getallnorvideos")
        .then((response)=>{
            this.setState({loading:false , nor_vid:response.data});
            console.log(response)

        })
        .catch((err) => {
            console.log(err);
            return err;
        });

    }
    render(){
        <div>
             <div className="row">
                {this.state.nor_vid.map((nor)=>
                <normalList
                email={nor.email}
                videotittle={nor.videoName}
                norName={nor.norName}
                />
                )}
            </div>
        </div>

    }
}

export default AllnormalVideos;