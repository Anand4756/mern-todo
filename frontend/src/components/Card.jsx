import react,{useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const Card = (props)=>{
// console.warn(props);
const [todoid,setTodoid] = useState();
const [checked, setChecked] = useState(false);



// setChecked(props.checked)

// var data = {
//     'id': todoid,
//     'ischecked': checked
// }

  const handleChange = async (id,tick) => {
    // setTodoid(id)
    tick=!tick;
     const api = 'http://localhost:5000/completed';
        await axios.post(
          api,
         {
          id,
          ischecked: tick
         }
         ,
          {
             headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
         
          }
          ).then((response)=>{
            // setChecked(!checked);
             // setChecked(response.data.checked);
            // console.log("here==> ",response.data);

          {props.gettodo()}
            
        }).catch((err)=>{
           console.log(err);
        });

  };

  const deletetodo = async (id)=>{
   props.gettodo();
  // console.warn('here', id) 
    
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
            // setChecked(response.data.checked);
            // console.log(response.data);
            {props.gettodo()};
         
            
        }).catch((err)=>{
           // console.log(err);
        });
   
  }


return (

<>


  
  <tr>

    <td><input
          type="checkbox"
          name="completed"
          checked={props.checked}
          onChange={e=>handleChange(props.id,props.checked)}

          
        /></td>
    {props.checked?

      <td><del>{props.title}</del></td>:
      <td>{props.title}</td>}
    {props.checked?<td><del>{props.content}</del></td>:<td>{props.content}</td>}
    
    <Button className="del-btn" color="error" endIcon={<DeleteForeverIcon />} onClick={() => {  
    	setTodoid(props.id);
deletetodo(props.id);
      }}> </Button>
       
  </tr>


</>
	)
}

export default Card;