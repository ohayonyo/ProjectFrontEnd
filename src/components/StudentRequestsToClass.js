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
import { useState } from "react";
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

export default function StudentRequestsToClass() {
  const [messages, setMessages] = useState([{
    id: 1,
    primary: 'Brunch this week?',
    secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    person: '/static/images/avatar/5.jpg',
  },
  {
    id: 2,
    primary: 'Birthday Gift',
    secondary: `Do you have a suggestion for a good present for John on his work
      anniversary. I am really confused & would love your thoughts on it.`,
    person: '/static/images/avatar/1.jpg',
  },
  {
    id: 3,
    primary: 'Recipe to try',
    secondary: 'I am try out this new BBQ recipe, I think this might be amazing',
    person: '/static/images/avatar/2.jpg',
  },
  {
    id: 4,
    primary: 'Yes!',
    secondary: 'I have the tickets to the ReactConf for this year.',
    person: '/static/images/avatar/3.jpg',
  },
  {
    id: 5,
    primary: "Doctor's Appointment",
    secondary: 'My appointment for the doctor was rescheduled for next Saturday.',
    person: '/static/images/avatar/4.jpg',
  },
  {
    id: 6,
    primary: 'Discussion',
    secondary: `Menus that are generated by the bottom app bar (such as a bottom
      navigation drawer or overflow menu) open as bottom sheets at a higher elevation
      than the bar.`,
    person: '/static/images/avatar/5.jpg',
  },
  {
    id: 7,
    primary: 'Summer BBQ',
    secondary: `Who wants to have a cookout this weekend? I just got some furniture
      for my backyard and would love to fire up the grill.`,
    person: '/static/images/avatar/1.jpg',
  },
  {
    id: 8,
    primary: 'Summer BBQ2',
    secondary: `Who wants to have a cookout this weekend? I just got some furniture
      for my backyard and would love to fire up the grill.`,
    person: '/static/images/avatar/1.jpg',
  },]);

  const [isClicked,setIsClicked]=useState([Array(messages.length+1).fill(false)])


  function acceptStudent(id){
    setMessages(messages.filter((value)=>value.id!=id));
    // need to add the call for backend
  }


  function rejectStudent(id){
    setMessages(messages.filter((value)=>value.id!=id));
    // need to add the call for backend
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
            {messages.map(({ id, primary, secondary, person }) => (
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
               
                {/* <ListItemText primary={primary} secondary={secondary} style={{textAlign:'right',marginTop:-1,marginRight:20}}/>
                  <ListItemAvatar>
                    <Avatar alt="Profile Picture" src={person}/>
                </ListItemAvatar> */}

                <ListItemText 
                primary={<Typography variant="h6" style={{ color: '#000000' }}>{primary}</Typography>} 
                secondary={secondary} style={{textAlign:'right',marginTop:-1,marginRight:20}}/>
                  <ListItemAvatar>
                    <Avatar alt="Profile Picture" src={person}/>
                </ListItemAvatar>


                 
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