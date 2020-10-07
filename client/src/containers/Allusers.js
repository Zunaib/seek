import react, { Component } from "react";
import usersList from "../components/admin/dashboard/usersList";
import userslist from "../components/admin/dashboard/usersList";


class Allusers extends Component{
    render(){
        <div>
            <usersList
            name={"Ali"}
            email={"ali@gmail.com"}
            blocked={true}
            videos={3}

            />
           
        </div>
    }

}


export default Allusers;