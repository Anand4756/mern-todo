import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React, { useState, useEffect, createContext } from "react"
import axios from 'axios';

import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import { Authcontext } from './Authcontext';

function App() {
 const [user, setUser] = useState();
 
// const[loading,setloading] = useState(false)

  const getuser = async () => {
    
    const res = await axios.get('http://localhost:5000/result', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setUser(res.data.name);
    

  };




  useEffect(() => {
    
    getuser();
  }, [user]);

  return (
   <Router>
      <Authcontext.Provider value={{ user: user,getuser: getuser,setUser: setUser }}>
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          
          
        </Routes>
      </Authcontext.Provider>
    </Router>

  );
}

export default App;
