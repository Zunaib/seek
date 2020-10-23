import React, { useState ,useEffect } from 'react'
import {Input, Button } from 'antd';
import { withSnackbar } from 'notistack';
import axios from "axios";


const Settings =(props)=> {
    const[loading,setLoading]=useState(true)
    const[change,setChange]=useState({
        first_name:"",
        last_name:"",
        address:"",
        phone_number:"",
        gender:"",
        password:""
    });
    const[reload,setReload]=useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:5000/users/fetchusersettngs", {email:localStorage.getItem("useremail")})
            .then((response) => {
                setLoading(false);
                setChange({
                first_name:response.data.first_name,
                last_name:response.data.last_name,
                address:response.data.address,
                phone_number:response.data.phone_number,
                gender:response.data.gender,
                password:response.data.password,
                   
            })
        })
            .catch((err) => {
                console.log(err);
                return err;
            });
    }, [reload]);


    const updateSettings= ()=> { 
        axios
        .post("http://localhost:5000/updateusersettings",{
            
            email:localStorage.getItem("email"),
            first_name:change.first_name,
            last_name:change.last_name,
            address:change.address,
            phone_number:change.phone_number,
            gender:change.gender,
            password:change.password
        }
        )
            .then((response) => {
                if (response.data.success) {
                    props.enqueueSnackbar("User updated", {
                        variant: "success",
                    });
                    setReload(!reload);
                }
               
            })
            .catch((err) => {
                console.log(err);
                return err;
            });
    }
        



return(
    <div class="container">
        <label for="first name">First name</label>
        <Input
                type="text"
                /* placeholder="Enter first name" */
                /* name="first name" */
                value={change.first_name}
                onChange={(e)=>setChange({first_name:e.target.value})}
              
        />

        <label for="last name">Last name</label>
        <Input
                type="text"
               /*  placeholder="Enter Last name" */
               /*  name="Last name" */
                value={change.last_name}
                onChange={(e)=>setChange({last_name:e.target.value})}
              
        />

       
        
        <label for="password">Password</label> <Input
                type="text"
                /* placeholder="Enter Password" */
               /*  name="password" */
                value={change.password}
                onChange={(e)=>setChange({password:e.target.value})}
              
        />

        

        <label for="phone number">Phone number</label>
        <Input
                type="text"
                /* placeholder="Enter phone number" */
               /*  name="phone Number" */
                value={change.phone_number}
                onChange={(e)=>setChange({phone_number:e.target.value})}
              
        />


        <label for="address">Address</label>
        <Input
                type="text"
                /* placeholder="Enter Address" */
               /*  name="address" */
                value={change.address}
                onChange={(e)=>setChange({address:e.target.value})}
              
        />



        <label for="gender">Gender</label>
        <Input
                type="text"
                /* placeholder="Enter gender" */
                /* name="gender" */
                value={change.gender}
                onChange={(e)=>setChange({gender:e.target.value})}
              
        />



        
        <Button
                    variant="contained"
                    color="secondary"
                    onClick={()=>updateSettings()}
                >
                   Update Settings
                </Button>



    </div>

);
}

export default withSnackbar(Settings);