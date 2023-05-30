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
  const thisURL = window.location.href;
  const splits = thisURL.split('/')
  //todo make this use the teacher name
  const url = "http://localhost:5000/getLessonCorrect?usernameT="+splits[3]+"&unitName="+splits[5]+"&className="+splits[4]+"&usernameS="+splits[6]+"&correct="+splits[7]
  const result = await fetch(url)      
  const jsonResult = await result.json();
  console.log("json result is ")
  console.log(jsonResult)
  return jsonResult;
}

export default function QuestionReview() {
  const thisURL = window.location.href;
  const splits = thisURL.split('/')
  const   questionType = splits[7]

  const [messages, setMessages] = useState([]);

  useEffect(()=>{

    async function fetchDataCall(){
        const a = await fetchData()
        console.log("in use effect")
        setMessages(a)
    }
  fetchDataCall()
  },[]);



  //primary - studentName
  //secondary - className
  




  return (
    <div>
      <div className='background5'></div>
      <div className='class-list' style={{resize: 'both',
    overflow: 'auto',width:'105%',paddingRight:'20%'}}>
      <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: '50px' }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }} style={{textAlign:'center',marginRight:-100,position:'relative',zIndex:2}}>
        Question view {questionType}
         </Typography>
        <div style={{position:'relative',zIndex:2}}>

            {
                messages.map(question => 

                    <div>
                        {question.id}) {question.question}  &nbsp;&nbsp;&nbsp;&nbsp; {question.questionPreamble}   
                      
                      
                    </div>
                  )
            }
              
        </div>
      
      </Paper>  
    </React.Fragment>
    </div>
    </div>
    
    
  );
}