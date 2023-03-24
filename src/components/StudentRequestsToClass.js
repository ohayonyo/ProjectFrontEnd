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
  const thisURL = window.location.href;
  const splits = thisURL.split('/')
  const url = "http://localhost:5000/getAllClasses"
  const result = await fetch(url)      
  const jsonResult = await result.json();
  console.log("json result is ")
  console.log(jsonResult)
  return jsonResult;
} 

export default function StudentRequestsToClass() {

  const [select, setSelected] = useState()
    const [classes, setClasses] = useState([{
    id: 1,
    className: 'Brunch this week?',
    teacher: "I'll be in the neighbourhood this week. Let's grab a bite to eat",

},
{
  id: 2,
  className: 'Birthday Gift',
  teacher: `Do you have a suggestion for a good present for John on his work
    anniversary. I am really confused & would love your thoughts on it.`,

  }]);

  useEffect(()=>{

    async function fetchDataCall(){
        const a = await fetchData()
        console.log("in use effect2")
        setClasses(a)
    }
  fetchDataCall()
  },[]);



// const url = "http://localhost:5000/submitQuestion?username="+splits[3]+"&unitName="+ splits[4]+ "&className=" + splits[5]+
// "&ans="+qans +"&qnum=" +questions[0].id  
        
// const promise =  await fetch(url,{
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify(answers)        
// })
// if(promise.status ===200){
//   console.log(promise)
//   console.log("success")
//   const nextId = questions[0].id +1
//   nextURL = 'http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/"+splits[5]+ "/"+ nextId + "/QuestionView"
//   const newColors = [...colors];
//   newColors[qans]="green"
//   setColors(newColors)

  //primary - studentName
  //secondary - className
  async function signUpToClass(){
    console.log("in signUp") 

    const thisURL = window.location.href;
    const splits = thisURL.split('/')
    console.log(splits)
    console.log(select)
    console.log({select})

    const url = "http://localhost:5000/registerClass?student="+ splits[3]+" &className="+ select
    console.log(url)
    const promise =  await fetch(url)

     if(promise.status ===200){   
        console.log("success")
        const a = await fetchData()
        console.log("in use effect2")

        setClasses(a)
     }
      
    else
      console.log("didn't work try again")

    }







  return (


    <div >
      <h1> הרשמה לכיתה חדשה</h1>
          <h2> {select}</h2>
          <select onChange={e=> setSelected(e.target.value)}>
            {classes.map(singleClass => 
            <option key={singleClass.id} value={singleClass.className} > 
              class: {singleClass.className},  &nbsp; &nbsp; &nbsp;teacher: {singleClass.teacher} 
            </option>)};
          </select>
          <button onClick={()=>signUpToClass()}> sign up </button>

    </div>
  );
}