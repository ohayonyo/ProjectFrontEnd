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




const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
  
});

const fetchData = async () =>{
  const thisURL = window.location.href;
  const splits = thisURL.split('/')
  const url = "http://localhost:5000/getClassesStudent?student="+splits[3]
  const result = await fetch(url)      
  const jsonResult = await result.json();
  console.log("in studentClasses")
  console.log("json result is ")
  console.log(jsonResult)
  return jsonResult;
}

export default function StudentClasses() {
    const [messages, setMessages] = useState([{
      id: 1,
    primary: 'Brunch this week?',
    secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",

  },
  {
    id: 2,
  primary: 'Birthday Gift',
    secondary: `Do you have a suggestion for a good present for John on his work
      anniversary. I am really confused & would love your thoughts on it.`,

    }]);

    useEffect(()=>{

      async function fetchDataCall(){
          const a = await fetchData()
          console.log("in use effect")
          setMessages(a)
      }
    fetchDataCall()
    },[]);


  function gotoUnits(id,cls){
    
    console.log("gotoUnits")
    const thisURL = window.location.href;
    const splits = thisURL.split('/')
    console.log("before assign")
    const nextURL = 'http://'+splits[2]+"/"+splits[3]+"/"+messages[id-1].primary+"/studentClassUnits"
    console.log(nextURL)
    window.location.assign(nextURL);
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
    </div>
    
  );
}