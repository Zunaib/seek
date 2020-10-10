import react, { Component } from "react";
import usersList from "../components/admin/dashboard/usersList";
import userslist from "../components/admin/dashboard/usersList";


class Allusers extends Component{
    state={
        users=[],
        loading=true
    }

    componentDidMount(){
        axios
        .get(
            "http://localhost:5000/getallusers"
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
             ({
            this.state.videos.map((user)=>(
            <usersList
            first_name={user.first_name}
            last_name={user.last_name}
            email={user.email}
             /* videos={3} */
            />
            ))}

            
          </div> 
        </div>
    }

}


export default Allusers;