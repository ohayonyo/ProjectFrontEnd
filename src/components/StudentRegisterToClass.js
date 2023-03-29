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
import { useState,useEffect} from "react";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';



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
  const url = "http://localhost:5000/getUnapprovedStudents?teacher=dan1"
  const result = await fetch(url)      
  const jsonResult = await result.json();
  console.log("json result is ")
  console.log(jsonResult)
  return jsonResult;
}

export default function StudentRequestsToClass() {
  const [messages, setMessages] = useState([
  
  {
    id: 7,
    primary: 'Summer BBQ',
    secondary: `Who wants to have a cookout this weekend? I just got some furniture
      for my backyard and would love to fire up the grill.`,
  },
  {
    id: 8,
    primary: 'Summer BBQ2',
    secondary: `Who wants to have a cookout this weekend? I just got some furniture
      for my backyard and would love to fire up the grill.`,
  },]);

  useEffect(()=>{

    async function fetchDataCall(){
        const a = await fetchData()
        console.log("in use effect")
        setMessages(a)
    }
  fetchDataCall()
  },[]);

  const [isClicked,setIsClicked]=useState([Array(messages.length+1).fill(false)])


  //primary - studentName
  //secondary - className
  async function acceptStudent(id){
    console.log("in accept")

    const requestToClass = messages.filter((value)=> value.id === id)
    const url = "http://localhost:5000/approveStudentToClass?student="+ requestToClass[0].primary+" &className="+ requestToClass[0].secondary+"&approve=True"
    console.log(url)
    const promise =  await fetch(url)

    if(promise.status ===200)
      setMessages(messages.filter((value)=>value.id!=id));      
    else
      console.log("didn't work try again")

    }


  async function rejectStudent(id){
    console.log("in reject")
    const requestToClass = messages.filter((value)=> value.id === id)

    const url = "http://localhost:5000/approveStudentToClass?student="+ requestToClass[0].primary+" &className="+ requestToClass[0].secondary+"&approve=False"
    const promise =  await fetch(url)

    if(promise.status ===200)
      setMessages(messages.filter((value)=>value.id!=id));      
    else
      console.log("didn't work try again")
  }


  function markButton(id){
      let arr=isClicked.slice();
      arr[id]=!arr[id];
      setIsClicked(arr);
  }


  return (
    <div style={{resize: 'both',
    overflow: 'auto',width:'105%',paddingRight:'20%'}}>
      <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: '50px' }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }} style={{textAlign:'center',marginRight:-100}}>
          בקשות רישום לכיתות
        </Typography>
        <div>

          <List sx={{ mb: 2 }}>
            {messages.map(({ id, primary, secondary }) => (
              <React.Fragment key={id}>
                <ListItem button onClick={()=>markButton(id)}
                style={{
                  backgroundColor: isClicked[id] ? '#E5E4E2' : ''
                }} 
                
                >

                <IconButton edge="end" onClick={()=>acceptStudent(id)}>
                      <CheckIcon style={{color:'green'}} />
                </IconButton>

                <IconButton edge="end" onClick={()=>rejectStudent(id)}>
                      <CloseIcon style={{color:'red'}} />
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
    </div>
    
  );
}