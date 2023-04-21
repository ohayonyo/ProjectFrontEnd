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
  const url = "http://localhost:5000/getAllClassesNotIn?username="+splits[3];
  const result = await fetch(url)      
  const jsonResult = await result.json();
  console.log("json result is ")
  console.log('here!!!!!!!!')
  console.log(jsonResult)
  return jsonResult;
} 


const fetchData2 = async () =>{

  //todo make this use the teacher name
  const thisURL = window.location.href;
  const splits = thisURL.split('/')
  const url = "http://localhost:5000/getAllClassesWaiting?username="+splits[3];
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

  const [classesWaiting, setClassesWaiting] = useState([{
    id: 1,
    className: 'Brunch this week?',
    teacher: "I'll be in the neighbourhood this week. Let's grab a bite to eat"
},
{
  id: 2,
  className: 'Birthday Gift',
  teacher: "I'll be in the neighbourhood this week. Let's grab a bite to eat"

  }]);

  useEffect(()=>{

    async function fetchDataCall(){
        const a = await fetchData()
        console.log("in use effect2")
        setClasses(a)

        if(select===null||select===undefined)
          setSelected(classes[0].className)

        // console.log('classes='+classes[0].className)
        // setClasses(a)
        const b = await fetchData2()
        console.log("in use effect3")
        setClassesWaiting(b)
        }
  fetchDataCall()
  },[]);


  // useEffect(()=>{

  //   async function fetchDataCall(){

  //     if(classes!==null && select==null){
  //       console.log('defualt value='+classes[0])
  //      setSelected(classes[0])
  //     }
  //   }
  // fetchDataCall()
  // },[]);



  async function signUpToClass(){
    console.log("in signUp") 

    const thisURL = window.location.href;
    const splits = thisURL.split('/')
    console.log(splits)
    console.log(select.className)
    // console.log({select})
    // if(select===undefined){
    //   console.log('select is undefined')
    // }


    console.log("select value:"+select)

    if(select===undefined || select==null)
      setSelected(classes[0].className)
    const url = "http://localhost:5000/registerClass?student="+ splits[3]+" &className="+ select
    console.log(url)
    const promise =  await fetch(url)

     if(promise.status ===200){   
        console.log("success")
        const a = await fetchData()
        console.log("in use effect2")
        setClasses(a)

        const b = await fetchData2()
        console.log("in use effect2")
        setClassesWaiting(b)
     }
      
    else
      console.log("didn't work try again")

    }

    async function rejectStudent(id){
      console.log("in signUp") 
  
      const thisURL = window.location.href;
      const splits = thisURL.split('/')
      console.log(splits)
      const toDelete = classesWaiting.filter(x=> x.id =id)
      const url = "http://localhost:5000/removeRegistrationClass?student="+ splits[3]+" &className="+ toDelete[0].className
      console.log(url)
      const promise =  await fetch(url)
  
       if(promise.status ===200){   
          console.log("success")
          const b = await fetchData()
          console.log("in use effect2")
          setClasses(b)

          const a = await fetchData2()
          console.log("in use effect2")
          setClassesWaiting(a)
       }
        
      else
        console.log("didn't work try again")
  
      }





  return (


    <div class="class-list" >
      <h1> הרשמה לכיתה חדשה</h1>
          <select onChange={e=> setSelected(e.target.value)} defaultValue={classes[0].className}>
            {classes.map(singleClass => 
            <option key={singleClass.id} value={singleClass.className} > 
              class: {singleClass.className},  &nbsp; &nbsp; &nbsp;teacher: {singleClass.teacher} 
            </option>)};
          </select>
          <button onClick={()=>signUpToClass()}> sign up </button>
        
      <h3 style={{textAlign:'right',marginTop:-1,marginRight:350}}> בקשות שממתינות לתשובה</h3>
      <div>
          <List sx={{ mb: 2 }} >
            {classesWaiting.map(({ id, className,teacher }) => (
              <React.Fragment key={id}>
               <ListItem>
                  <IconButton edge="end" onClick={()=>rejectStudent(id)}>
                        <CloseIcon style={{color:'red'}} />
                  </IconButton>
               
                  <ListItemText 
                primary={<Typography variant="h6" style={{ color: '#000000' }}>{className}</Typography>} 
                secondary= {teacher} style={{textAlign:'right',marginTop:-1,marginRight:350}}/>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </div>
    </div>
  );
}