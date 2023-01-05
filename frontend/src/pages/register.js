import React, {useState} from 'react'
import Button from '@mui/material/Button';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';

const Register = () => {
  const navigate = useNavigate();
  const [name, setname] = useState("");
const [email, setemail] = useState("");
const [password, setpassword] = useState("");


  const onFormsubmit=(e) => {
   e.preventDefault();
       
        const api = 'http://localhost:5000/register';
        axios.post(
          api,
          {
            email,
             password,
             name
          }
          ).then((response)=>{
        
            Swal.fire({
  title: response.data,
  
 
})
            if(response.data==="REGISTRATION SUCCESSFUL"){
               navigate('/login');
            }
            
        }).catch((err)=>{
           console.log(err);
        });

  }

    return (
    <div>
    <div className="login-div">
    
    <h2>{!name?"Register":"Hello👋"} <span style={{color: 'blue'}}>{name}</span></h2>
    <form className="login-form" onSubmit={onFormsubmit}>
    <TextField id="name" required margin="dense"  label="Full-Name" variant="outlined" onChange={(e) => setname(e.target.value)}/>
    <TextField id="email" required margin="dense"  label="Email-Id" variant="outlined" onChange={(e) => setemail(e.target.value)}/>
    <TextField id="pass" required label="Password" type="Password" margin="dense" variant="outlined" onChange={(e) => setpassword(e.target.value)}/>
    <Button type="submit" variant="contained">REGSITER</Button>
     </form>  
     <h3>Don't have an account?</h3><Link to="/login"><Button variant="contained" style={{maxWidth: '100px', maxHeight: '130px',backgroundColor:'red'}} >LOGIN</Button></Link>
     </div>



    </div>
  )
}

export default Register
