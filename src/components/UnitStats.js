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
import { fontSize, fontWeight } from '@mui/system';
import { Pie,Line } from 'react-chartjs-2';
import {Chart, ArcElement,Tooltip,Legend,CategoryScale,LineController,LineElement, PointElement, LinearScale, Title} from 'chart.js'


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
  Chart.register(ArcElement,Tooltip,Legend,CategoryScale,LineController,LineElement,PointElement, LinearScale, Title);

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
          const sortedMessages = a.sort((a, b) => {
            if(b.bad - a.bad)
              return b.bad - a.bad
            else 
              return a.correct - b.correct
          }
          );
          setMessages(sortedMessages)
          
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

  

  const handleClick = (elements,name) => {
    if (elements.length > 0) {
      const clickedElement = elements[0];
      if("#1BBC63" === clickedElement.element.options.backgroundColor)
        window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/"+splits[5]+"/"+name+"/" + "Correct"+"/"+ "questionReview");
      else
        window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/"+splits[5]+"/"+name+"/" + "Incorrect"+"/"+ "questionReview");

      }
  };

  const handleInCorrectClick = (name) => {
    window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/"+splits[5]+"/"+name+"/" + "Incorrect"+"/"+ "questionReview");
  };

  const handleCorrectClick = (name) => {
    window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/"+splits[5]+"/"+name+"/" + "Correct"+"/"+ "questionReview");
  };


  const handleBackgroundColorClick = (event, chartElements, name) => {
    if (chartElements.length > 0) {
      const backgroundColor = chartElements[0]._model.backgroundColor;
      if (backgroundColor === '#3CB371') {
        // Perform your desired action for #3CB371 backgroundColor
        window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/"+splits[5]+"/"+name+"/" + "Correct"+"/"+ "questionReview");

      }else{
        window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/"+splits[5]+"/"+name+"/" + "Correct"+"/"+ "questionReview");
      }
    }
  };
  
  const options = {
    onClick: (event, chartElements) =>{
    console.log('event=')
    console.log(event)
      return handleBackgroundColorClick(event, chartElements) // Pass the name field as a parameter
    }
  };
  


  function gotoStudent(name,cls){
    const thisURL = window.location.href;
    const splits = thisURL.split('/')
    window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/"+splits[5]+"/"+name+"/studentStats");
  }
  

  const functionType ={'linear':'פונקציה ליניארית', 'quadratic':'פונקציה ריבועית','polynomial':'פונקצית פולינום', 'sin':'פונקציית סינוס','cos':'פונקציית קוסינוס','tan':'פונקצית טנגנס','cot':'פונקצית קוטנגנס','log':'פונקצית ln','eexp':'פונקציה מעריכית בבסיס e'
,'2exp':'פונקציה מעריכית בבסיס 2','3exp':'פונקציה מעריכית בבסיס 3','root':'פונקצית שורש','3root':'פונקצית שורש שלישי'
}

  function getFunctionType(question){
    if(question.includes("sin")){
      return functionType['sin']
    }else if(question.includes("cos")){
      return functionType['cos']
    }else if(question.includes("tan")){
      return functionType['tan']
    }else if(question.includes("cot")){
      return functionType['cot']
    }else if(question.includes("e^")||question.includes("e ^")){
      return functionType['eexp']
    }else if(question.includes("2^")||question.includes("2 ^")){
      return functionType['2exp']
    }else if(question.includes("3^")||question.includes("3 ^")){
      return functionType['3exp']
    }else if(question.includes("sqrt")){
      return functionType['root']
    }else if(question.includes("ln")||question.includes("log")){
      return functionType['log']
    }else{
      return functionType['polynomial']
    }

  }

  const questionType ={'domain':'תחום הגדרה','intersection':'נקודות חיתוך עם הצירים','minMaxPoints':'נקודות קיצון','incDec':'תחומי עלייה וירידה'
  ,'definiteIntegral':'אינטגרל מסוים','deriveFunc':'נגזרת','funcValue':'ערך הפונקציה בנקודה',
  'posNeg':'תחומי חיוביות שליליות','asym':'אסימפטוטות', 'symmetry': 'סימטריה ואסימטריה', 'inflection': 'נקודות פיתול', 'convexConcave': 'תחומי קעירות וקמירות', 'oddEven': 'זוגיות ואי זוגיות'
}


  function getQuestionType(questionPreamble){
    if(questionPreamble.includes("תחום הגדר")){
      return questionType['domain']
    }else if(questionPreamble.includes("נקודות החיתוך עם")){
      return questionType['intersection']
    }else if(questionPreamble.includes("קיצון")){
      return questionType['minMaxPoints']
    }else if(questionPreamble.includes("עלייה")){
      return questionType['incDec']
    }else if(questionPreamble.includes("אינטגרל")){
      return questionType['definiteIntegral']
    }else if(questionPreamble.includes("נגזרת")){
      return questionType['deriveFunc']
    }else if(questionPreamble.includes("ערך הפונקציה")){
      return questionType['funcValue']
    }else if(questionPreamble.includes("חיוביות")){
      return questionType['posNeg']
    }else if(questionPreamble.includes("אסימפטוטות")){
      return questionType['asym']
    }else if(questionPreamble.includes("סימטריה")){
      return questionType['symmetry']
    }else if(questionPreamble.includes("פיתול")){
      return questionType['inflection']
    }else if(questionPreamble.includes("קעירות")){
      return questionType['convexConcave']
    }else{
      return questionType['oddEven']
    }

  }

  function getTitleToTimeLineEvent(question,questionPreamble){
      return getQuestionType(questionPreamble)+" של " +getFunctionType(question) 
  }

  return (
    <div>
      <div className='background5'></div>
      <div
        className='class-list2'
        style={{
          resize: 'both',
          overflowY: 'auto',
          width: '105%',
          paddingRight: '20%',
          scrollBehavior: 'smooth'
        }}
      >
        <React.Fragment>
          <CssBaseline />
          <Paper square sx={{ pb: '50px' }}>
            <Typography
              variant="h5"
              gutterBottom
              component="div"
              sx={{
                p: 2,
                pb: 0
              }}
              style={{
                textAlign: 'center',
                marginRight: -100,
                position: 'relative',
                zIndex: 1,
                fontSize:28,
                fontWeight:700,
                textDecoration: 'underline'
              }}
            >
              {decodeURIComponent(splits[5])+"  סטטיסטיקות של יחידת הלימוד  "}
            </Typography>
            <div>
              <List sx={{ mb: 2 }}>
                {messages.map(({ name, bad, correct }) => (
                  <React.Fragment key={name}>
                    <ListItem Button>
                      <IconButton
                        edge="end"
                        aria-label="unitsStats"
                        onClick={(cls) => gotoStudent(name, cls)}
                      >
                        <AiOutlineLineChart />
                      </IconButton>
                      <ListItemText
                        primary={
                          <Typography variant="h6" style={{ color: '#000000' }}>
                            <div
                              style={{
                                color: 'black',
                                float: 'right',
                                width: '100%',
                                marginLeft: '10%',
                                color: 'black',
                                fontSize: 20,
                                textAlign: 'center',
                                fontWeight:700,
                              }}
                            >

                          <div style={{position:'relative'}}>
                            <span >{name}&nbsp;</span>
                            <span>:</span>
                            <span style={{textDecoration:'underline',fontSize: 20,color: 'black'}}>{"שם התלמיד "}</span>
                            
                            
                          </div>

                              
                            </div>
                          </Typography>
                        }
                        secondary={
                          <div>
                              <div style= {{padding:'20px',width:'320px',marginTop:50,marginBottom:-400,position:'relative',left:330,cursor:'pointer'}}>
                                  <Pie data={{
                                    labels: ['תשובות נכונות', 'תשובות שגויות'],
                                    datasets: [
                                      {
                                        data: [correct, bad],
                                        backgroundColor: ['#3CB371', '#DC143C']
                                      },
                                    ]
                                  }} options={{onClick: (event, chartElements) =>{
                                    console.log('event=')
                                    console.log(event)
                                      return handleClick(chartElements,name) // Pass the name field as a parameter
                                    }}}/>
                                  
                            </div>

                            <div
                              style={{
                                color: 'red',
                                float: 'right',
                                width: '100%',
                                marginLeft: '10%',
                                color: 'red',
                                textAlign: 'right',
                                fontSize:20,
                                fontWeight:600,
                                position:'relative',
                                right:'70%',
                                marginTop:150,
                                marginBottom:-150
                              }}
                            >

                          <div style={{position:'relative'}}>
                            <span >{bad}&nbsp;</span>
                            <span>: </span>
                            <span style={{textDecoration:'underline',cursor:'pointer'}} onClick={()=>handleInCorrectClick(name)}>{"מספר תשובות שגויות"}</span>        
                          </div>

                            </div>
                            <div
                              style={{
                                color: 'green',
                                float: 'right',
                                width: '100%',
                                marginLeft: '10%',
                                color: 'green',
                                textAlign: 'right',
                                fontSize:20,
                                fontWeight:600,
                                position:'relative',
                                right:'70%',
                                marginTop:150,
                                marginBottom:-150
                              }}
                            >

                              <div style={{position:'relative'}}>
                                <span >{correct}&nbsp;</span>
                                <span>: </span>
                                <span style={{textDecoration:'underline',cursor:'pointer'}} onClick={()=>handleCorrectClick(name)}>{"מספר תשובות נכונות"}</span>        
                              </div>

                            </div>


                            {console.log('TIMELINE---------', timeline[name])}
                            <div style={{...styles.container,marginLeft:'40%',overflowX: 'hidden'}}>

                            <div
                                style={{
                                  height: 350,
                                  width: 300,
                                  overflowY: 'scroll',
                                  marginTop:-180,
                                  overflowX: 'hidden',
                                  marginLeft:-50,
                                  position:'relative',
                                  left:250
                                }}
                              >
                                
                                <Timeline
                                  position="left"
                                  style={{...styles.timeline,marginLeft:200,width:'200%'}}
                                >

                                  <div style={{position:'relative',right:230}}>
                                  {timeline[name] &&
                                    timeline[name].map(
                                      (
                                        { question, solved_correctly ,question_preamble},
                                        index
                                      ) => (
                                        <TimelineItem
                                          key={index}
                                          style={styles.timelineItem}
                                        >
                                          <TimelineSeparator>
                                            <TimelineDot
                                              style={{
                                                backgroundColor: solved_correctly
                                                  ? 'green'
                                                  : 'red',cursor:'pointer'
                                              }}
                                              onClick={()=>{
                                                if(solved_correctly){
                                                  handleCorrectClick(name)
                                                }else{
                                                  handleInCorrectClick(name)
                                                }
                                              }}
                                            />
                                            {index+1<timeline[name].length && <TimelineConnector
                                              style={styles.timelineConnector}
                                            />}
                                            
                                          </TimelineSeparator>
                                          <TimelineContent
                                            style={{
                                              // marginTop: -55,
                                              width: '100%',
                                              whiteSpace: 'normal',
                                              fontWeight:600,
                                              color:'black',
                                              marginLeft:'5%'
                                            }}
                                          >
                                            <div dir="rtl">
                                              <span>
                                              {(index+1)+". "}
                                              </span>
                                              <span>
                                                {getTitleToTimeLineEvent(question,question_preamble)}
                                              </span>
                                            
                                            </div>
                                            
                                          </TimelineContent>
                                        </TimelineItem>
                                      )
                                    )}

                                  </div>
                                  
                                </Timeline>
                              </div>

                          
                          </div>
  
                            
                          </div>
                        }
                      />
                      <div
                        style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          marginTop: '10px'
                        }}
                      >
                        <Typography
                          variant="body1"
                          style={{ color: 'black', textAlign: 'center' }}
                        >
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
        // width: '100%',
        height: 500,
        display: 'flex',
        justifyContent: 'flex-start', // Adjust justifyContent to 'flex-start' to align items to the left
        alignItems: 'center',
  // overflowY: 'auto', // Change overflowY to 'hidden' to disable vertical scrolling
  //       scrollBehavior: 'smooth',
        // maxWidth: '100%', // Adjust the maximum width to the available space
        // minWidth: '500px', // Set the minimum width to 500px
        // padding: '0 10px',
      },
      timeline: {
        marginRight: '15%',
        transform: 'rotate(0deg)',
        width: '200%', // Set a fixed width to make the timeline size permanent
        height:'100%'
      },
      timelineItem: {
        // marginBottom: '-5px',
        // paddingTop: '5px',
        flex: '0 0 auto', // Allow items to shrink and grow, but not auto-expand
        whiteSpace: 'normal', // Allow the content to wrap to multiple lines
        width:'100%'
      },
      timelineDot: {
        backgroundColor: '#FF5722',
      },
      timelineConnector: {
        backgroundColor: 'black',
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
    