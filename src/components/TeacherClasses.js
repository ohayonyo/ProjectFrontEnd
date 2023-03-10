import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState,useEffect } from "react";
import { NearMeOutlined } from '@mui/icons-material';
import OpenClass from './OpenClass';
import '../css/PickDetails.css';




const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
  
});

const fetchData = async () =>{

  //todo make this use the teacher name
  const thisURL = window.location.href;
  const splits = thisURL.split('/')
  const url = "http://localhost:5000/getClassesTeacher?teacher="+splits[3]
  const result = await fetch(url)      
  const jsonResult = await result.json();
  console.log("json result is ")
  console.log(jsonResult)
  return jsonResult;
}

export default function TeacherClasses() {
    const [className,setClassName] = useState(null)
    const [messages, setMessages] = useState([{
      id: 1,
    primary: 'Class1',
    secondary: "Teacher: Moshe Cohen, Number of students: 32",

  },
  {
    id: 2,
  primary: 'Class2',
    secondary: "Teacher: David Levi, Number of students: 30",

    }]);

    useEffect(()=>{

      async function fetchDataCall(){
          const a = await fetchData()
          console.log("in use effect")
          setMessages(a)
      }
    fetchDataCall()
    },[]);

  async function openClass(){
    const thisURL = window.location.href;
    const splits = thisURL.split('/')
    const url = "http://localhost:5000/openClass?teacher="+splits[3]+"&className=" + className
    const promise =  await fetch(url)
    if(promise.status ===200){
      var max_id=0
      messages.forEach(i => {if (i.id >max_id) max_id=i.id; })
      var newClass = {
        "id": max_id+1,
        "primary" : className,
        "secondary" : "lalala"
      }
      const newMessages = [...messages,newClass]
      setMessages(newMessages);
    }
    else
      console.log("didn't work try again")


  }

  function getClassName(val){
    setClassName( val.target.value)
  }

  async function deleteElement(id){

    const ClassToDelete = messages.filter((value)=> value.id === id)

    const classNameDelete = ClassToDelete[0].primary
    const thisURL = window.location.href;
    const splits = thisURL.split('/')
    const url = "http://localhost:5000/removeClass?teacher="+splits[3]+"&className=" + classNameDelete
    const promise =  await fetch(url)
    if(promise.status ===200)
      setMessages(messages.filter((value)=>value.id!=id));
    else
      console.log("didn't work try again")

  }


  function gotoEdit(id,cls){
    const thisURL = window.location.href;
    const splits = thisURL.split('/')
    window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+messages[id-1].primary+"/editClass");
  }

  function gotoUnits(id,cls){
    const thisURL = window.location.href;
    const splits = thisURL.split('/')
    window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+messages[id-1].primary+"/classUnits");
  }

  return (
    <div style={{resize: 'both',
    overflow: 'auto',width:'105%',paddingRight:'20%'}}>
      
      <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: '50px' }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }} style={{textAlign:'center',marginRight:-100}}>
          ???????????? ??????
        </Typography>
        <div>

          <List sx={{ mb: 2 }}>
            {messages.map(({ id,primary, secondary }) => (
              <React.Fragment key={id}>
                <ListItem Button>

                <IconButton edge="end" aria-label="delete" onClick={()=>deleteElement(id)}>
                      <DeleteIcon />
                </IconButton>
                <IconButton edge="end" aria-label="edit" onClick={(cls)=>gotoEdit(id,cls)}>
                      <AddIcon />
                </IconButton>
                <IconButton edge="end" aria-label="units" onClick={(cls)=>gotoUnits(id,cls)}>
                      <MenuIcon />
                </IconButton>
                <ListItemText 
                primary={<Typography variant="h6" style={{ color: '#000000' }}>{primary}</Typography>} 
                secondary={secondary} style={{textAlign:'right',marginTop:-1,marginRight:20}}/>

                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </div>
      
      </Paper>  
    </React.Fragment>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input type="text" style={{color:'black',height:42,marginTop:15}} onChange = {getClassName.bind(this)}/>
        <button className='button' onClick={()=>openClass()} style={{float: 'left'}}>
          Add Class
        </button>
      </div>

    </div>
    
  );
}