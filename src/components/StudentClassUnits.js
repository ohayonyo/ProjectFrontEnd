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
import { BiPlayCircle } from 'react-icons/bi';




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
  const url = "http://localhost:5000/getClassUnits?className="+splits[4]+"&teacher="+splits[3]
  const result = await fetch(url)      
  const jsonResult = await result.json();
  console.log("json2 result is ")
  console.log(jsonResult)
  return jsonResult;
}

const fetchData2 = async (primary) =>{

  //todo make this use the teacher name
  const thisURL = window.location.href;
  const splits = thisURL.split('/')
  const url = "http://localhost:5000/startUnit?className="+splits[4]+"&username="+splits[3]+"&unitName="+primary
  const result = await fetch(url)      
  const jsonResult = await result.json();
  console.log("json2 result is ")
  console.log(jsonResult)
  return jsonResult;
}

export default function StudentClassUnits() {

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
          console.log("in use effect2")
          setMessages(a)
          console.log("the message are" + messages[0].primary + " " +  messages[0].secondary )
      }
    fetchDataCall()
    },[]);

    let dueDates=messages.map((value)=>new Date(value.due));
    console.log(dueDates)
    const now = new Date();
    console.log(now)

  async function startUnit(id,primary){ 
    if (dueDates[id-1].getTime() >= (now.getTime()+10750000)){
      console.log("startUnit")
      const thisURL = window.location.href;
      const splits = thisURL.split('/')


      console.log("in start unit " + id +" " +primary)
      let result = await fetchData2(primary)     
      console.log(result)
      if (result == 0){
        result = -1
      }
      const nextURL = 'http://'+splits[2]+"/"+splits[3]+"/"+primary+"/"+splits[4]+ "/"+1+ "/QuestionView"+"/"+(result*60)
      console.log("the next url is " +nextURL)
      window.location.assign(nextURL);
    }
    
  }

  return (
    <div style={{resize: 'both',
    overflow: 'auto',width:'105%',paddingRight:'20%'}} className="class-list">
      
      <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: '50px' }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }} style={{textAlign:'center',marginRight:-100}}>
           התרגילים שלי
        </Typography>
        <div>

          <List sx={{ mb: 2 }}>
            {messages.map(({ id,primary, secondary,due }) => (
              <React.Fragment key={id}>
                <ListItem Button onClick={(unit)=>startUnit(id,primary)}>
                <IconButton edge="end" aria-label="units" onClick={(unit)=>startUnit(id,primary)}>
                <BiPlayCircle style={{ fontSize: '48px' ,color:'black'}} />
                </IconButton>
                <ListItemText 
                primary={<Typography variant="h6" style={{ color: '#000000' }}>
                      {primary}
                  </Typography>} 
                secondary={
                  <div>
                    {secondary}
                    <div style={{textAlign: 'right', fontSize: '0.8rem', marginTop: '5px',color: dueDates[id-1].getTime() < (now.getTime()+10750000) ? 'red' : 'black' }}>
                      {dueDates[id-1].toLocaleString('he-IL', {
                          timeZone: 'UTC',
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit'
                        }).replace(',', ' ').replace('.','/').replace('.','/')}
                          :מועד אחרון לפתירה
                      </div>
                  </div>
                  

                
                } style={{textAlign:'right',marginTop:-1,marginRight:20}}/>
                <Typography variant="body1" style={{ color: dueDates[id-1].getTime() < (now.getTime()+10750000) ? 'red' : 'black' }}>
                    
                </Typography>
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