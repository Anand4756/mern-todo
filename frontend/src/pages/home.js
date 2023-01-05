import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { useContext } from 'react';
import Header from '../components/Header';
import Todo from '../components/Todo';
import {Authcontext} from '../Authcontext';


const Home = () => {
 const  {user,getuser,setUser}  = useContext(Authcontext);

 useEffect(() => {
    
    getuser();
    setUser(user);
  }, [user]);

  
  return (
    <div> 
  
  <Header />
       <Todo />
        </div>
     
  )
}

export default Home;