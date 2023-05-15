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
import { BadgeMark, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState,useEffect } from "react";
import { NearMeOutlined } from '@mui/icons-material';
import OpenClass from './OpenClass';
import EditIcon from '@mui/icons-material/Edit';
import { AiOutlineLineChart } from 'react-icons/ai';


import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

// 

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
  
});
const thisURL = window.location.href;
const splits = thisURL.split('/');
const className = splits[4];

const fetchData = async (url) =>{
  const result = await fetch(url)      
  const jsonResult = await result.json();
  console.log("json2 result is ")
  console.log(jsonResult)
  return jsonResult;
}

export default function UnitStats() {

  const [messages, setMessages] = useState([]);
  /**{
      id: 1,
    primary: 'Brunch this week?',
    secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",

  },
  {
    id: 2,
  primary: 'Birthday Gift',
    secondary: `Do you have a suggestion for a good present for John on his work
      anniversary. I am really confused & would love your thoughts on it.`,

    } */

    useEffect(()=>{

      async function fetchDataCall(){
        const url = "http://localhost:5000/getStats?username="+splits[3]+"&unitName="+splits[5]+"&className="+splits[4]
          const a = await fetchData(url)
          console.log("in use effect2")
          setMessages(a)
      }
    fetchDataCall()
    },[]);

  console.log(messages)



  


  function gotoStudent(name,cls){
    const thisURL = window.location.href;
    const splits = thisURL.split('/')
    window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/"+splits[5]+"/"+name+"/studentStats");
  }

  return (
    
    <div className='class-list' style={{resize: 'both',
    overflow: 'auto',width:'105%',paddingRight:'20%'}}>
      
  <React.Fragment>
    <CssBaseline />
    <Paper square sx={{ pb: '50px' }}>
      <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }} style={{textAlign:'center',marginRight:-100}}>
        {decodeURIComponent(splits[5])}
      </Typography>
      <div>

        <List sx={{ mb: 2 }}>
          {messages.map(({ name,bad,correct}) => (
            <React.Fragment key={name}>
              <ListItem Button>
                {/* <IconButton edge="end" aria-label="units" onClick={(cls)=>gotoStudent(name,cls)}>
                  <MenuIcon />
                </IconButton> */}

                <IconButton edge="end" aria-label="unitsStats" onClick={(cls)=>gotoStudent(name,cls)}>
                    <AiOutlineLineChart />
                 </IconButton>
                {/* <IconButton edge="end" aria-label="edit" onClick={(cls)=>gotoEdit(id,cls)}>
                  <AddIcon />
                </IconButton> */}

                <ListItemText 
                  primary={
                    <Typography variant="h6" style={{ color: '#000000' }}>
                      <div style={{color:'black', float: 'right', width: '100%'}}>
                        <EditText 
                          
                          value={name}
                          style={{width:'90%',marginLeft:'10%',color:'black',fontSize:'h6', textAlign: 'right'}}
                        />
                      </div>
                    </Typography>
                  } 
                  secondary={
                    <div>
                      
                          <div style={{color:'red', float: 'right', width: '100%'}}>
                            <EditText 
                              value={"mistakes: " + bad}
                              style={{width:'90%',marginLeft:'10%',color:'red', textAlign: 'right'}}
                            />
                          </div>

                          <div style={{color:'green', float: 'right', width: '100%'}}>
                            <EditText 
                              value={"correct answers: " + correct}
                              style={{width:'90%',marginLeft:'10%',color:'green', textAlign: 'right'}}
                            />
                          </div>
                    </div>
                  }
                />
                <div style={{textAlign: 'center', fontWeight: 'bold', marginTop: '10px'}}>
                  <Typography variant="body1" style={{ color: 'black', textAlign: 'center' }}>
                    {/* {console.log(dueDates[id-1].getTime() - now.getTime()-10750000)} */}
                    {/* <div style={{textAlign: 'center'}}>{due}</div> */}
                    
                  </Typography>
                </div>
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