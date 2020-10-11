import React, { Component } from "react";
import UsersList from "../components/admin/dashboard/UsersList"
import axios from "axios";
import Spinner from "../components/Spinner";
import {NavLink} from "react-router-dom"



class Allusers extends Component
{
    state={
        users:[],
        loading:true
    }

    componentDidMount(){
        axios
        .get(
            "http://localhost:5000/getallusers"
        )
        .then((response) => {
            this.setState({ loading: false, users: response.data });
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
          <div>
         
      <div className="Main" >
      {
        this.state.loading ?
        <Spinner/>
        :
        <div className="UserList">
          <NavLink to='/admin-dashboard'>
              <div className="cross">
                  <h4>Close</h4>
                  <i className="fas fa-times"></i>
              </div>
          </NavLink>
          <h1>All Users</h1>
          <div className="Users">
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

   




export default Allusers;









       
          










