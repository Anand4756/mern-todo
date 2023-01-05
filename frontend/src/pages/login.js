import React, {useState} from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import { Link,useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();
const [email, setemail] = useState("");
const [password, setpassword] = useState("");

const Submit = (e) =>{
    e.preventDefault();
    console.log("hiiiii")
       
        const api = 'http://localhost:5000/login';
        axios.post(
          api,
          {
            email: email,
            password: password
          }
          ).then((response)=>{
          
            
            
            if(response.data==="ACCOUNT DOES'NOT EXISTS" || response.data==="wrong password"){
            
            Swal.fire({
  title: response.data,
  
  icon:'error'
})
             
          }else{
            localStorage.setItem("token", response.data.token);
            navigate('/');  
          }
            
            
        }).catch((err)=>{
           console.log(err);
        });
    };

  return (
    <div>
    <div className="login-div">
   <h2>{!email?"LOGIN":"Hello👋"} <span style={{color: 'blue'}}>{email}</span></h2>
    <form className="login-form" onSubmit={Submit}>
    <TextField id="outlined-basic" required margin="dense"  label="Email-Id" variant="outlined" onChange={(e)=> setemail(e.target.value)}/>
    <TextField id="password" type="Password" required label="Password" margin="dense" variant="outlined" onChange={(e) => setpassword(e.target.value)} />
    <Button variant="contained" type="submit">LOGIN</Button>
     </form>  
     <h3>Don't have account?</h3><Link to="/register"><Button variant="contained" style={{maxWidth: '100px', maxHeight: '130px',backgroundColor:'red'}} >REGISTER</Button></Link>
     </div>



    </div>
  )
}

export default Login;