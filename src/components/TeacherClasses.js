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
import { NearMeOutlined, Rtt } from '@mui/icons-material';
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

const fetchData = async () =>{

  //todo make this use the teacher name
  const thisURL = window.location.href;
  const splits = thisURL.split('/')
  const url = "http://localhost:5000/getClassesTeacher?teacher="+splits[3]
  const result = await fetch(url)      
  const jsonResult = await result.json();
  console.log("json result is ")
  console.log(jsonResult)
  return jsonResult;
}

export default function TeacherClasses() {
    const [className,setClassName] = useState(null)
    const [messages, setMessages] = useState([]);
    const [cantDeleteClass,setCantDeleteClass] = useState(false);
    const [cantAddClass,setCantAddClass] = useState(false);

    useEffect(()=>{

      async function fetchDataCall(){
          const a = await fetchData()
          console.log("in use effect")
          setMessages(a)
      }
    fetchDataCall()
    },[]);


    async function openClass() {
      if (className !== null && className.length > 0) {
        const thisURL = window.location.href;
        const splits = thisURL.split('/');
        setCantDeleteClass(false);
        setClassName(""); // Reset className state to an empty string
        const url = "http://localhost:5000/openClass?teacher=" + splits[3] + "&className=" + className;
        const promise = await fetch(url);
        if (promise.status === 200) {
          var max_id = 0;
          messages.forEach(i => { if (i.id > max_id) max_id = i.id; });
          var newClass = {
            "id": max_id + 1,
            "primary": className,
            "secondary": ""
          };
          const newMessages = [...messages, newClass];
          setMessages(newMessages);
          setCantAddClass(false);
        } else {
          console.log("Didn't work, try again");
          setCantAddClass(true);
          setCantDeleteClass(false);
        }
      }
    }

  function getClassName(val){
    setClassName( val.target.value)
  }

  async function deleteElement(id){

    const ClassToDelete = messages.filter((value)=> value.id === id)
    if(ClassToDelete === null|| ClassToDelete[0] === null){
      return;
    } 
    setCantAddClass(false);
    const classNameDelete = ClassToDelete[0].primary
    const thisURL = window.location.href;
    const splits = thisURL.split('/')
    const url = "http://localhost:5000/removeClass?teacher="+splits[3]+"&className=" + classNameDelete
    const promise =  await fetch(url)
    if(promise.status ===200){
      setMessages(messages.filter((value)=>value.id!=id));
      setCantDeleteClass(false);
    }else{
      console.log("didn't work try again")
      setCantDeleteClass(true);
    }

  }


  function gotoEdit(id,cls){
    const thisURL = window.location.href;
    const splits = thisURL.split('/')
    window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+messages[id-1].primary+"/editClass");
  }

  function gotoUnits(id,cls){
    const thisURL = window.location.href;
    const splits = thisURL.split('/')
    window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+messages[id-1].primary+"/classUnits");
  }

  return (
    <div>
          <div className='background5'></div>
         <div className="class-list" style={{resize: 'both', overflow: 'auto', width:'105%', paddingRight:'20%'}}>
            <React.Fragment>
              <CssBaseline />
              <Paper square sx={{ pb: '50px' }}>
                <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }} style={{textAlign:'center',marginRight:-100,position:'relative',zIndex:1,fontWeight:600}}>
                  <div className='header' style={{marginRight:'7%',transform:'scale(1.1)',fontSize:30}}>
                  הכיתות שלי
                  </div>
                </Typography>
                <div style={{position:'relative',zIndex:1}}>
                  <List sx={{ mb: 2 }}>
                    {messages.map(({ id,primary, secondary }) => (
                      <React.Fragment key={id}>
                        <ListItem 
                            Button 
                            onClick={(event) => {
                              if (
                                event.target.tagName !== "BUTTON" &&
                                event.target.tagName !== "svg" &&
                                event.target.tagName !== "path"
                              ) {
                                gotoUnits(id, event);
                              }
                            }}
                          >
                            <IconButton edge="end" aria-label="delete" onClick={() => deleteElement(id)}>
                              <DeleteIcon />
                            </IconButton>
                            {/* <IconButton edge="end" aria-label="edit" onClick={() => gotoEdit(id)}>
                              <AddIcon />
                            </IconButton> */}
                            {/* <IconButton edge="end" aria-label="units" onClick={() => gotoUnits(id)}>
                              <MenuIcon />
                            </IconButton> */}
                            <ListItemText
                              primary={
                                <Typography variant="h6" style={{ color: "#000000",fontWeight:500,fontSize:20 }}>
                                  {primary}
                                </Typography>
                              }
                              secondary={secondary}
                              style={{ textAlign: "right", marginTop: -1, marginRight: 20 }}
                            />
                          </ListItem>
                      </React.Fragment>
                    ))}
                  </List>
                </div>
              </Paper>  
            </React.Fragment>

            {/* <p style={{ zIndex: 100, color: 'black', position: 'relative' }}>
                hello world
            </p> */}

            <hr class="bar-line" style={{zIndex:1,position:'relative'}}></hr>

            <div style={{ display: 'flex', justifyContent: 'center',position:'relative',zIndex:1}}>


            <div style={{marginTop:15}}>
                <button className="form-submit" onClick={()=>openClass()} style={{float: 'left',height:42}}>
                  הוספת כיתה חדשה
                </button>
              </div>
              <input
              type="text"
              className='input_data'
              style={{ color: 'black', height: 42, marginTop: 15, direction: 'rtl' }}
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              />

            </div>

            {cantDeleteClass && 
              <div style={{position:'relative',zIndex:1,fontSize:24,color:'red',marginTop:20}}>
                <label>לא ניתן למחוק את הכיתה מאחר ויש בה יחידות לימוד</label>
                </div>
                }

            {cantAddClass && 
              <div style={{position:'relative',zIndex:1,fontSize:24,color:'red',marginTop:20}}>
                <label>לא ניתן ליצור את הכיתה מאחר ושם זה כבר נמצא בשימוש</label>
                </div>
                }
          </div>
    </div>
   
    
  );
}