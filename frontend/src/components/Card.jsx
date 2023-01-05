import react,{useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const Card = (props)=>{
console.warn(props);
const [todoid,setTodoid] = useState();



var data = {
    'id': todoid
}
const deletetodo = async (id)=>{
	 props.gettodo();
	console.warn('here', id)	
		
	 const api = 'http://localhost:5000/todo/delete';
        await axios.post(
          api,
         {id
         },
          {
          	 headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
         
          }
          ).then((response)=>{
          	
          	console.log(response.data);

         
            
        }).catch((err)=>{
           console.log(err);
        });
   
	}

return (

<>


  
  <tr>
    <td>{props.title}</td>
    <td>{props.content}</td>
    
    <Button className="del-btn" color="error" endIcon={<DeleteForeverIcon />} onClick={() => {  
    	setTodoid(props.id);
deletetodo(props.id);
      }}> </Button>
       
  </tr>


</>
	)
}

export default Card;