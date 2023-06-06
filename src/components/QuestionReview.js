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

const fetchData = async (url) =>{
  const result = await fetch(url)      
  const jsonResult = await result.json();
  console.log("json2 result is ")
  console.log(jsonResult)
  return jsonResult;
}



export default function QuestionReview() {

  const [timeline, setTimeline] = useState([]);


  const thisURL = window.location.href;
  const splits = thisURL.split('/')
  const questionType = splits[7]
  const studentName = splits[6]

  console.log('studentName',studentName)

console.log('teacherName',splits[3])
  const [messages, setMessages] = useState([]);

  useEffect(()=>{

    async function fetchDataCall(){
        const a = await fetchData()
        console.log("in use effect")
        setMessages(a)
    }
  fetchDataCall()
  },[]);

  useEffect(()=>{

    async function fetchDataCall2(){
      const url = "http://localhost:5000/getAllLessonQuestions?teacher="+splits[3]+"&unitName="+splits[5]+"&className="+splits[4]
        const a = await fetchData(url)
        console.log("in use effect2")
        setTimeline(a)
    }
  fetchDataCall2()
  },[]);

  console.log("timeline",timeline)



  //primary - studentName
  //secondary - className
  
  let counter = 0; // Counter variable to track the number of questions solved correctly

  if(questionType==='Correct'){
    return (
      <div>
        <div className='background5'></div>
        <div className='class-list' style={{resize: 'both',
      overflow: 'auto',width:'105%',paddingRight:'20%'}}>
        <React.Fragment>
        <CssBaseline />
        <Paper square sx={{ pb: '50px' }}>
          <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }} style={{textAlign:'center',marginRight:-100,position:'relative',zIndex:2}}>
            <span style={{position:'relative',zIndex:2,fontSize:30,fontWeight:700,textDecoration:'underline'}}>צפייה בשאלות שהתלמיד צדק בהן</span>
           </Typography>
          <div style={{position:'relative',zIndex:2,direction: 'rtl', textAlign: 'right',marginRight:50}}>
  
          {
    timeline[studentName] &&
    timeline[studentName].map(({id, question_preamble, question, solved_correctly,correct_ans,answer1,answer2,answer3,answer4}, index) => {
      
      if (solved_correctly) {
        counter += 1; // Increment the counter only if solved_correctly is true
      }
      return (
        <div key={id}>
          {solved_correctly && (
            <div>
              <div >
                <span style={{ textDecoration: 'underline', fontSize: 20,fontWeight:700 }}> שאלה </span>
                <span style={{ textDecoration: 'underline', fontSize: 20,fontWeight:700 }}>{counter}:</span> {/* Use the counter variable as the index */}

                <span>{question_preamble}</span>
                &nbsp;
              <span>{question}</span>
              </div>
              

              <div >
                <span style={{ textDecoration: 'underline', fontSize: 16,fontWeight:500 }}>תשובה נכונה</span>
                <span style={{ textDecoration: 'underline', fontSize: 16,fontWeight:500 }}>:</span> {/* Use the counter variable as the index */}
                <span style={{direction: 'ltr'}}>
                  {correct_ans === 1 &&   <bdo dir="ltr">{answer1}</bdo>}
                  {correct_ans === 2 && <bdo dir="ltr">{answer2}</bdo>}
                  {correct_ans === 3 && <bdo dir="ltr">{answer3}</bdo>}
                  {correct_ans === 4 && <bdo dir="ltr">{answer4}</bdo>}
                </span>
              </div>

            </div>
          )}
        </div>
      );
    })
  }
                
          </div>
        
        </Paper>  
      </React.Fragment>
      </div>
      </div>
      
      
    );
  }else{

    counter=0;
    return (
      <div>
        <div className='background5'></div>
        <div className='class-list' style={{resize: 'both',
      overflow: 'auto',width:'105%',paddingRight:'20%'}}>
        <React.Fragment>
        <CssBaseline />
        <Paper square sx={{ pb: '50px' }}>
          <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }} style={{textAlign:'center',marginRight:-100,position:'relative',zIndex:2}}>
          <span style={{position:'relative',zIndex:2,fontSize:30,fontWeight:700,textDecoration:'underline'}}>צפייה בשאלות שהתלמיד טעה בהן</span>
           </Typography>
          <div style={{position:'relative',zIndex:2,direction: 'rtl', textAlign: 'right',marginRight:50}}>
  
          {
    timeline[studentName] &&
    timeline[studentName].map(({ id, question_preamble, question, solved_correctly,correct_ans,answer1,answer2,answer3,answer4}, index) => {
      
      if (!solved_correctly) {
        counter += 1; // Increment the counter only if solved_correctly is true
      }
      return (
        <div key={id}>
          {!solved_correctly && (
            <div>
              <div >
                <span style={{ textDecoration: 'underline', fontSize: 20,fontWeight:700 }}> שאלה </span>
                <span style={{ textDecoration: 'underline', fontSize: 20,fontWeight:700 }}>{counter}:</span> {/* Use the counter variable as the index */}

                <span>{question_preamble}</span>
                &nbsp;
              <span>{question}</span>
              </div>
              

              <div >
                <span style={{ textDecoration: 'underline', fontSize: 16,fontWeight:500 }}>תשובה נכונה</span>
                <span style={{ textDecoration: 'underline', fontSize: 16,fontWeight:500 }}>:</span> {/* Use the counter variable as the index */}
                <span style={{direction: 'ltr'}}>
                  {correct_ans === 1 &&   <bdo dir="ltr">{answer1}</bdo>}
                  {correct_ans === 2 && <bdo dir="ltr">{answer2}</bdo>}
                  {correct_ans === 3 && <bdo dir="ltr">{answer3}</bdo>}
                  {correct_ans === 4 && <bdo dir="ltr">{answer4}</bdo>}
                </span>
              </div>

            </div>
          )}
        </div>
      );
    })
  }
                
          </div>
        
        </Paper>  
      </React.Fragment>
      </div>
      </div>
      
      
    );




  }
  
}