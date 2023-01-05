import react, {useState,useEffect} from 'react'
import { useContext } from 'react';
import {Authcontext} from '../Authcontext';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import Button from '@mui/material/Button';
import Card from '../components/Card';
import Swal from 'sweetalert2';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const Todo = ()=>{


const  {user, getuser,setUser}  = useContext(Authcontext);
const [title, setTitle] = useState("");
const [content, setContent] = useState("");

const [todo,setTodo] = useState([]);

	const gettodo =()=>{
		
		const api = 'http://localhost:5000/todo';
        axios.get(
          api,
          {
          	 headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
         
          }
          ).then((response)=>{
          	console.log(response.data);
          setTodo(response.data)
            
        }).catch((err)=>{
           console.log(err);
        });
    
	}
var data = {
    'title': title,
    'content': content
}
const Submit = (e) =>{
    e.preventDefault();
    
    // console.log("hiiiii")
       

        const api = 'http://localhost:5000/todo';
        axios.post(
          api,
          data,
          {
          headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
     
  }).then((response)=>{
          
        }).catch((err)=>{
           console.log(err);
        });
         e.target.reset();
        gettodo();
        
    };




  useEffect(() => {
    getuser();
    gettodo();

    
  }, []);


return (



<>
{!user?<div className="all-todo">

    <form className="todo-input" onClick={()=> { Swal.fire({
  title: "Please Login",
  
  icon:'error'
})}}>
    <TextField id="outlined-basic" required margin="dense" placeholder="title"  variant="outlined" onChange={(e)=> setTitle(e.target.value)}/>
    <TextField required  margin="dense" variant="outlined" placeholder="content" onChange={(e) => setContent(e.target.value)} />
    <Button variant="contained" type="submit" color="error" endIcon={<ControlPointIcon />}>ADD</Button>
     </form>  
     
     </div>

:
<div className="all-todo">
    <div className="input-div">
	<form className="todo-input" onSubmit={Submit}>
    <TextField id="outlined-basic" required margin="dense" placeholder="title"  variant="outlined" onChange={(e)=> setTitle(e.target.value)}/>
    <TextField required  margin="dense" variant="outlined" placeholder="content" onChange={(e) => setContent(e.target.value)} />
    <Button variant="contained" className="addbtn" type="submit" endIcon={<ControlPointIcon />}>ADD</Button>
     </form>  
    </div>    

  <div className="card">
  <table id="customers">
  <tr>
    
    <th>Title</th>
    <th>Content</th>
    <th>Delete</th>
  </tr>
  
  {todo.map(todoitems=>{
     return <Card title={todoitems.title} gettodo={gettodo} todo={todo} setTodo={setTodo} content={todoitems.content} id={todoitems._id}/>
   })}

</table>
        </div>

        </div>
    }
    </>
	)

}

export default Todo;