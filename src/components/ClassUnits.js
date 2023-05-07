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
          const url = "http://localhost:5000/getClassUnits?teacher="+splits[3]+"&className="+className;
          const a = await fetchData(url)
          console.log("in use effect2")
          setMessages(a)
      }
    fetchDataCall()
    },[]);
  function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }
  const numberOfUnits = messages.length;

  let unitNamesAtUpload = messages.map((value)=>value.primary)
  let UnitDescriptionsAtUpload=messages.map((value)=>value.secondary);
  let dueDates=messages.map((value)=>new Date(value.due));
  console.log(dueDates)
  const now = new Date();
  console.log(now)


  console.log('unitNamesAtUpload:'+unitNamesAtUpload)
  const [unitNames,setUnitNames] = useState([]);
  useEffect(()=>{


    setUnitNames(unitNamesAtUpload)
    sleep(10)
  },unitNamesAtUpload)

  console.log('unitNames:'+unitNames)
  const [UnitDescriptions,setUnitDescriptions] = useState([]);
  useEffect(()=>{
    setUnitDescriptions(UnitDescriptionsAtUpload)
    sleep(10)
  },UnitDescriptionsAtUpload)

  let editButtonContentsAtUpload=messages.map((value)=>value.secondary!=='');
  const [editButtonContents,setEditButtonContents] = useState([])
  useEffect(()=>{
    setEditButtonContents(editButtonContentsAtUpload)
    sleep(10)
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
    const url = "http://localhost:5000/quickEditUnit?teacher="+splits[3]+"&unitName="+unitNamesAtUpload[index]+
    "&className="+className+"&newDesc="+UnitDescriptions[index]+"&newUnitName="+unitNames[index]
    console.log(url)
    const res = fetchData(url)
    return res
  }
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
          {messages.map(({ id,primary, secondary, due }) => (
            <React.Fragment key={id}>
              <ListItem Button>
                <IconButton edge="end" aria-label="units" onClick={(cls)=>gotoEdit(id,cls)}>
                  <AddIcon />
                </IconButton>
                <IconButton edge="end" aria-label="unitsStats" onClick={(cls)=>gotoStats(id,cls)}>
                  <MenuIcon />
                </IconButton>
                {/* <IconButton edge="end" aria-label="edit" onClick={(cls)=>gotoEdit(id,cls)}>
                  <AddIcon />
                </IconButton> */}

                <ListItemText 
                  primary={
                    <Typography variant="h6" style={{ color: '#000000' }}>
                      <div style={{color:'black', float: 'right', width: '100%'}}>
                        <EditText 
                          showEditButton
                          onChange={(e) => handleChangeUnitName(e,id-1)}
                          onSave={(e)=>handleSave(e,id-1)}
                          value={unitNames[id-1]}
                          style={{width:'90%',marginLeft:'10%',color:'black',fontSize:'h6', textAlign: 'right'}}
                        />
                      </div>
                    </Typography>
                  } 
                  secondary={
                    <div>
                          <div style={{color:'black', float: 'right', width: '100%'}}>
                            <EditText 
                              showEditButton 
                              onChange={(e) => handleChangeUnitDescription(e,id-1)}
                              onSave={(e)=>handleSave(e,id-1)}
                              value={UnitDescriptions[id-1]}
                              style={{width:'90%',marginLeft:'10%',color:'black', textAlign: 'right'}}
                            />
                          </div>

                          <div style={{ textAlign: 'right', fontSize: '0.8rem', marginTop: '5px', marginRight:'10px', color: dueDates[id-1].getTime() < (now.getTime()+10750000) ? 'red' : 'black' }}>
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
                  }
                />
                <div style={{textAlign: 'center', fontWeight: 'bold', marginTop: '10px'}}>
                  <Typography variant="body1" style={{ color: dueDates[id-1].getTime() < (now.getTime()+10750000) ? 'red' : 'black', textAlign: 'center' }}>
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
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <button className="form-submit" onClick={()=>openUnit()} style={{float: 'left'}}>
      הוספת שיעור חדש
    </button>
  </div>

</div>
    
  );
}