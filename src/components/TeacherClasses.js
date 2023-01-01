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
import { NearMeOutlined } from '@mui/icons-material';




const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
  
});
/* 
const fetchData = async ()=> {
  console.log('username:'+username);
  console.log('password:'+password);

  if(username!=''&&password!=''){
    const url='http://localhost:5000/login?username=' + username + '&password='+password;
    const result = await fetch(url);
    // if(result.status==200){
      const res = result.body;
      const myArray = res.split(" ");
      if(myArray[0]==1){
        setNewDest('/'+myArray[1]+'/teacherMenu');
      }else if(myArray[0]==2){
        setNewDest('/'+myArray[1]+'/studentMenu');
      }
      setNewDest('/')

    
    
  }
 } */

export default function TeacherClasses() {
 

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

    }]);





  async function deleteElement(id){

    const fetchData = async () =>{
      const url = "http://localhost:5000/getClasses?teacher=dan1"
      console.log("sending request " + url);

      //need to read about promise, something here is fishy.
      const result = await fetch(url)
      /* const result =  fetch(url)
                      .then(function(response) {
                        return response.json();
                      }).then(function(data) {
                        console.log(data)
                        return data
                      }); */
                      //result.resolve()
        console.log("this is the result of the url fetch "+ result)
        const jsonResult = await result.json;
        console.log("this is the json of the result" + jsonResult)
        //console.log(jsonResult);
        //setMessages(jsonResult);

      //console.log(result)
      return jsonResult;
    }
    const a = fetchData()
    console.log(a)
    //setMessages(result);
    //setMessages(messages.filter((value)=>value.primary!=primary));
    // need to add the call for delete from backend
    //deleteClass(id)
  }




  return (
    <div style={{resize: 'both',
    overflow: 'auto',width:'105%',paddingRight:'20%'}}>
      <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: '50px' }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }} style={{textAlign:'center',marginRight:-100}}>
          הכיתות שלי
        </Typography>
        <div>

          <List sx={{ mb: 2 }}>
            {messages.map(({ id,primary, secondary,person }) => (
              <React.Fragment key={id}>
                <ListItem button>

                <IconButton edge="end" aria-label="delete" onClick={()=>deleteElement(id)}>
                      <DeleteIcon />
                </IconButton>


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