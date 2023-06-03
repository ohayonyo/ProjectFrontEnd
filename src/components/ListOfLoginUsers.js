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
import EditIcon from '@mui/icons-material/Edit';
import { Icon } from 'semantic-ui-react';
// import 'semantic-ui-css/semantic.min.css';
import { LineChart } from 'react-icons/ri';
import { AiOutlineLineChart } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';


import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import LoginStatus from './LoginStatus';



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
const teacherName = splits[3];

const fetchData = async (url) =>{
  const result = await fetch(url)      
  const jsonResult = await result.json();
  console.log("json2 result is ")
  console.log(jsonResult)
  return jsonResult;
}

export default function ListOfLoginUsers() {

  const [messages, setMessages] = useState([]);
    useEffect(()=>{

      async function fetchDataCall(){
          const url = "http://localhost:5000/getOnlineStudentsOfTeacher?teacher="+splits[3];
          const a = await fetchData(url)
          console.log("in use effect2")
          setMessages(a)
          console.log(a)
      }
    fetchDataCall()
    },[]);
  function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }
  const numberOfUnits = messages.length;

//   let unitNamesAtUpload = messages.map((value)=>value.primary)
//   let UnitDescriptionsAtUpload=messages.map((value)=>value.secondary);
//   let dueDates=messages.map((value)=>new Date(value.due));
//   console.log(dueDates)
//   const now = new Date();
//   console.log(now)


//   console.log('unitNamesAtUpload:'+unitNamesAtUpload)
  const [unitNames,setUnitNames] = useState([]);
  const [UnitDescriptions,setUnitDescriptions] = useState([]);
  const [editButtonContents,setEditButtonContents] = useState([])
//   useEffect(() => {
//     const unitNamesAtUpload = messages.map((value) => value.primary);
//     setUnitNames(unitNamesAtUpload);
//   }, [messages]);
  
//   useEffect(() => {
//     const UnitDescriptionsAtUpload = messages.map((value) => value.secondary);
//     setUnitDescriptions(UnitDescriptionsAtUpload);
//   }, [messages]);
  
//   useEffect(() => {
//     const editButtonContentsAtUpload = messages.map((value) => value.secondary !== '');
//     setEditButtonContents(editButtonContentsAtUpload);
//   }, [messages]);


  const handleChangeUnitName = (event, index) => {
    const newValue = event.target.value;
    setUnitNames(prevUnitNames => {
        const newUnitNames = [...prevUnitNames];
        newUnitNames[index] = newValue;
        return newUnitNames;
      
    return prevUnitNames;
    });
  };

  const handleChangeUnitDescription = (event, index) => {
    const newValue = event.target.value;
    setUnitDescriptions(prevUnitDescriptions => {
        const newUnitDescriptions = [...prevUnitDescriptions];
        newUnitDescriptions[index] = newValue;
        return newUnitDescriptions;
      
      return prevUnitDescriptions;
    });
  };


  function openUnit(){
    const thisURL = window.location.href;
    const splits = thisURL.split('/')
    window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/openUnit/new/details");
  }

  function gotoEdit(id,cls){
    const thisURL = window.location.href;
    const splits = thisURL.split('/')
    window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/"+messages[id-1].primary+"/editUnit");
  }

  function gotoStats(id, cls){
    const thisURL = window.location.href;
    const splits = thisURL.split('/')
    window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/"+messages[id-1].primary+"/unitStats");
  }

  async function deleteElement(id) {
    if (messages !== null && messages.length > 0) {
      const ClassToDelete = messages.filter((value) => value.id === id);
      const unitNameToDelete = ClassToDelete[0].primary;
      const thisURL = window.location.href;
      const splits = thisURL.split('/');
      console.log("unitName:" + unitNames[id]);
      console.log("className:" + className);
      console.log("teacherName:" + teacherName);
      const url =
        "http://localhost:5000/removeUnit?unitName=" +
        unitNameToDelete +
        "&className=" +
        className +
        "&teacher=" +
        teacherName;
  
      const response = await fetch(url);
      if (response.status === 200) {
        const updatedMessages = messages.filter((value) => value.id !== id);
        setMessages(updatedMessages);
      } else {
        console.log("Deletion failed. Please try again.");
      }
    }
  }

  return (
    <div>
      <div className='background5'></div>

      <div className="class-list" style={{ resize: 'both', overflow: 'auto', width: '105%', paddingRight: '20%' }}>
        <React.Fragment>
          <CssBaseline />
          <Paper square sx={{ pb: '50px' }}>
            <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }} style={{ textAlign: 'center', marginRight: '-100px',position:'relative',zIndex:1}}>
              <div className='header' style={{marginRight:'7%',transform:'scale(1.1)',fontSize:30}}>
                {decodeURIComponent("התלמידים שלי")}
              </div>
            </Typography>
            <div>
              <List sx={{ mb: 2 }}>
                {messages.map(({ id, username, isLoggedIn }) => (
                  <React.Fragment key={id}>
                    <ListItem button>
                        <div style={{position:'relative', zIndex:2, marginTop:70, marginLeft:850, marginBottom:-40}}>
                             <LoginStatus username={username} isLoggedIn={isLoggedIn}/>
                        </div>
                    
                      {/* <ListItemText
                        primary={
                          <Typography variant="h6" style={{ color: '#000000' }}>
                            <div style={{ color: 'black', float: 'right', width: '100%' }}>
                                 {username}
                            </div>
                          </Typography>
                        }
                        secondary={
                            <Typography variant="h4" style={{ color: '#000000' }}>
                            <div style={{ color: 'black', float: 'right', width: '100%' }}>
                                 {isLoggedIn && <div style={{position:'relative', zIndex:2}}> מחובר</div>}
                                 {!isLoggedIn && <div style={{position:'relative', zIndex:2}}> לא מחובר</div>}
                            </div>
                            </Typography>
                        }
                  
                      /> */}
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </div>
          </Paper>
        </React.Fragment>
       
      </div>

    </div>
  );
}