import React from 'react'
import Button from '@mui/material/Button';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'
import SendIcon from '@mui/icons-material/Send';
import { useContext,useState,useEffect } from 'react';
import {Authcontext} from '../Authcontext';



const Header = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

const  {user, getuser,setUser}  = useContext(Authcontext);
  useEffect(() => {
    
    getuser();

  }, [user]);





  return (
    <>
    <div className="header">
    <ul className='nav-items'>
      <Link to="/"><li>TODO</li></Link>
   <div className="nav-div">
      {!token?<Link to="/login"><Button variant="contained">LOGIN/REGISTER</Button></Link>:<Button className="name-btn"  variant="contained">{user} </Button>}
{token?<Button onClick={() => {
  localStorage.removeItem("token");
  // setUser(null);
    navigate('/');  
setUser("")
    // alert('clicked');
  }} variant="contained"  endIcon={<SendIcon />} color="error">Logout</Button>:""}
</div>
        {/*<Link to="/"><Button variant="text">HOME</Button></Link>
       <Button variant="text">ABOUT</Button>
       <Button variant="text">SERVICES</Button>
       <Button variant="text">CONTACT US</Button>
       <Button variant="contained">LOGIN/REGISTER</Button>*/}
    </ul>

   </div>
  

  
  
  
    </>
  )
}

export default Header