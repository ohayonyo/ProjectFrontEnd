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

const thisURL = window.location.href;
const splits = thisURL.split('/')
const className = splits[4]

const fetchData = async () =>{

  //todo make this use the teacher name
  const url = "http://localhost:5000/getClassUnits?className=" + className
  const result = await fetch(url)      
  const jsonResult = await result.json();
  console.log("json2 result is ")
  console.log(jsonResult)
  return jsonResult;
}

export default function ClassUnits() {

    const [messages, setMessages] = useState([{
      id: 1,
    primary: 'Unit1',
    secondary: "Linear problems",

  },
  {
    id: 2,
  primary: 'Unit2',
    secondary: `Polynomial problems`,

    }]);

    useEffect(()=>{

      async function fetchDataCall(){
          const a = await fetchData()
          console.log("in use effect2")
          setMessages(a)
      }
    fetchDataCall()
    },[]);


  function startUnit(id,cls){ }
  function openUnit(){
    const thisURL = window.location.href;
    const splits = thisURL.split('/')
    window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/openUnit/new/data");
  }

  return (
    <div style={{resize: 'both',
    overflow: 'auto',width:'105%',paddingRight:'20%'}}>
      
      <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: '50px' }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }} style={{textAlign:'center',marginRight:-100}}>
        {className} 
        </Typography>
        <div>

          <List sx={{ mb: 2 }}>
            {messages.map(({ id,primary, secondary }) => (
              <React.Fragment key={id}>
                <ListItem Button>
                <IconButton edge="end" aria-label="units" onClick={(unit)=>startUnit(id,unit)}>
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
        <button className='button' onClick={()=>openUnit()} style={{float: 'left'}}>
          Add new unit
        </button>
      </div>

    </div>
    
  );
}