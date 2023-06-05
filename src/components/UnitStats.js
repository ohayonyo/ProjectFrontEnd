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
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/lab';

import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { Tmln } from './Tmln';

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
  const [timeline, setTimeline] = useState([]);
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

  useEffect(()=>{

    async function fetchDataCall2(){
      const url = "http://localhost:5000/getAllLessonQuestions?teacher="+splits[3]+"&unitName="+splits[5]+"&className="+splits[4]
        const a = await fetchData(url)
        console.log("in use effect2")
        setTimeline(a)
    }
  fetchDataCall2()
  },[]);
  console.log('TL',timeline)


  


  function gotoStudent(name,cls){
    const thisURL = window.location.href;
    const splits = thisURL.split('/')
    window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/"+splits[5]+"/"+name+"/studentStats");
  }
  

  return (
    <div>
      <div className='background5'></div>
      <div className='class-list' style={{resize: 'both',
    overflow: 'auto',width:'105%',paddingRight:'20%', scrollBehavior: 'smooth'
  }}>
      
        <React.Fragment>
          <CssBaseline />
          <Paper square sx={{ pb: '50px' }}>
          <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }} style={{textAlign:'center',marginRight:-100,position:'relative',zIndex:1}}>
        {decodeURIComponent(splits[5])}
      </Typography>
            <div>
              <List sx={{ mb: 2 }}>
                {messages.map(({ name,bad,correct}) => (
                  <React.Fragment key={name}>
                    <ListItem Button onClick={(cls)=>gotoStudent(name,cls)}>
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
                              {console.log('TIMELINE---------',timeline[name])}
                              <div style={styles.container}>
                                  <Timeline position="left" style={styles.timeline}>
                                    {timeline[name] ? (
                                      timeline[name].map(({ question, solved_correctly }, index) => {
                                        if (timeline[name].length - index <= 10) {
                                          return (
                                            <TimelineItem key={index} style={styles.timelineItem}>
                                              <TimelineSeparator>
                                                <TimelineDot style={{ backgroundColor: solved_correctly ? "green" : "red" }} />
                                                <TimelineConnector style={styles.timelineConnector} />
                                              </TimelineSeparator>
                                              <TimelineContent style={{ marginTop: -55, width: '100%', whiteSpace: 'normal' }}>{question}</TimelineContent>
                                            </TimelineItem>
                                          );
                                        } else {
                                          return null;
                                        }
                                      })
                                    ) : (
                                      []
                                    )}
                                  </Timeline>
                              </div>

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
    </div>
    
    
  );
}


    const styles = {
      container: {
        // transform:'scale(0.8)',
        marginTop: 20,
        marginBottom: -150,
        marginLeft: '0%',
        width: '100%',
        height: 400,
        display: 'flex',
        justifyContent: 'flex-start', // Adjust justifyContent to 'flex-start' to align items to the left
        alignItems: 'center',
  overflowY: 'hidden', // Change overflowY to 'hidden' to disable vertical scrolling
        scrollBehavior: 'smooth',
        maxWidth: '100%', // Adjust the maximum width to the available space
        minWidth: '500px', // Set the minimum width to 500px
        // padding: '0 10px',
      },
      timeline: {
        marginRight: '15%',
        transform: 'rotate(90deg)',
        width: '200%', // Set a fixed width to make the timeline size permanent
      },
      timelineItem: {
        marginBottom: '-5px',
        paddingTop: '5px',
        flex: '0 0 auto', // Allow items to shrink and grow, but not auto-expand
        whiteSpace: 'normal', // Allow the content to wrap to multiple lines
      },
      timelineDot: {
        backgroundColor: '#FF5722',
      },
      timelineConnector: {
        backgroundColor: '#FF5722',
      },
      timelineContent: {
        backgroundColor: '#F5F5F5',
        padding: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center', // Align the content vertically
        minHeight: '50px', // Set a minimum height to ensure consistent height for all items
      },
    };
    