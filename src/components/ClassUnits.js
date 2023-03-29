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


import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';



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

export default function ClassUnits() {

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
          const url = "http://localhost:5000/getClassUnits?className="+className;
          const a = await fetchData(url)
          console.log("in use effect2")
          setMessages(a)
      }
    fetchDataCall()
    },[]);

  const numberOfUnits = messages.length;

  let unitNamesAtUpload = messages.map((value)=>value.primary)
  let UnitDescriptionsAtUpload=messages.map((value)=>value.secondary);

  console.log('unitNamesAtUpload:'+unitNamesAtUpload)
  const [unitNames,setUnitNames] = useState([]);
  useEffect(()=>{
    setUnitNames(unitNamesAtUpload)
  },unitNamesAtUpload)


  console.log('unitNames:'+unitNames)
  const [UnitDescriptions,setUnitDescriptions] = useState([]);
  useEffect(()=>{
    setUnitDescriptions(UnitDescriptionsAtUpload)
  },UnitDescriptionsAtUpload)

  let editButtonContentsAtUpload=messages.map((value)=>value.secondary!=='');
  const [editButtonContents,setEditButtonContents] = useState([])
  useEffect(()=>{
    setEditButtonContents(editButtonContentsAtUpload)
  },editButtonContentsAtUpload)

  console.log('UnitDescriptionsAtUpload:'+UnitDescriptionsAtUpload)
  console.log('UnitDescriptions:'+UnitDescriptions)

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

  const handleSave = (event, index) =>{
    console.log("save")
    const url = "http://localhost:5000/quickEditUnit?unitName="+unitNamesAtUpload[index]+
    "&className="+className+"&newDesc="+UnitDescriptions[index]+"&newUnitName="+unitNames[index]
    console.log(url)
    const res = fetchData(url)
    return res
  }

  function startUnit(id,cls){ }
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

  return (
    
    <div className='class-list' style={{resize: 'both',
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
                <IconButton edge="end" aria-label="edit" onClick={(cls)=>gotoEdit(id,cls)}>
                  <AddIcon />
                </IconButton>

                  <ListItemText 
                    primary={
                    <Typography variant="h6" style={{ color: '#000000' }}>
                     <div style={{color:'black'}}>
                      <EditText showEditButton
                        onChange={(e) => handleChangeUnitName(e,id-1)}
                        onSave={(e)=>handleSave(e,id-1)}
                        value={unitNames[id-1]}
                        style={{width:'90%',marginLeft:'10%',color:'black',fontSize:'h6'}}
                      />
                     </div>
                    </Typography>
                    } 
                    secondary={
                    <div style={{color:'black'}}>
                    <EditText showEditButton 
                      onChange={(e) => handleChangeUnitDescription(e,id-1)}
                      onSave={(e)=>handleSave(e,id-1)}
                      value={UnitDescriptions[id-1]}
                      style={{width:'90%',marginLeft:'10%',color:'black'}}
                    />
                   </div>
                   }

                    style={{textAlign:'right',marginTop:-1,marginRight:20}}
                    />

                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </div>
      
      </Paper>  
    </React.Fragment>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className='button' onClick={()=>openUnit()} style={{float: 'left'}}>
          הוספת שיעור חדש
        </button>
      </div>

    </div>
    
  );
}