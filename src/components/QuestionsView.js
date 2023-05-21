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
import './QuestionView.css'
import { MyTimer } from './MyTimer';

export var nextURL =""


const fetchData = async () =>{

  // const url = "http://localhost:5000/startUnit?className="+splits[4]+"&username="+splits[3]+"&unitName="+primary
  // console.log("the url is" + url)
  // const result = await fetch(url)      

  // console.log("splits is"+splits)
  // const nextURL = 'http://'+splits[2]+"/"+splits[3]+"/"+primary+"/"+splits[4]+"/QuestionView"

    const thisURL = window.location.href;
    const splits = thisURL.split('/')

    //todo make this use the teacher name
    const url = "http://localhost:5000/getQuestion?username="+splits[3]+"&unitName="+ splits[4]+ "&className=" + splits[5] + "&qnum=" + splits[6]
    console.log("fetching data questions with url " + url)
    const result = await fetch(url)      
    const jsonResult = await result.json();
    console.log("json result is ")
    console.log(jsonResult)
    return jsonResult;
  }


//primamry is question 
//secondary is question preabmle
export default function QuestionView() {
    const [selectedOption, setSelectedOption] = useState("");
  
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
    const [className,setClassName] = useState(null)
    const questionPreamble = ":שאלת חיתוך עם הצירים"
    const [answers,setAnswers] = useState({
        0: "basic answer"
  })
  const [colors,setColors] = useState(["","","",""])
    const [questions,setQuestions] = useState([{
    id: "1",
    primary:"y=2x+4",
    secondary:"this is a cut axis question",
    answer1:"(0,4) (2,0)",
    answer2:"(0,2) (4,0)",
    answer3:"(0,4) (-2,0)",
    answer4:"(0,2) (-4,0)"
    }
  ,
  {
    id: 2,
    primary: "y=-8x^2+5x",
    secondary: "this is a minima maxima question",
    options : [
      {id:0, text: "(0,3)(5,0)"}, 
      {id:1, text:"(1,3)(5,0)"}, 
      {id:2, text: "(2,3)(5,0)"}, 
      {id:3, text: "(3,3)(5,0)"}]

    }]);
    
    const thisURL = window.location.href;
    const splits = thisURL.split('/')
    const [remainingTime, setRemainingTime] = useState(splits[8]);
    const [nextLesson, setNextLesson] = useState("");

    useEffect(() => {
      if (remainingTime == 0) window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+splits[5]+"/studentClassUnits");
      if (remainingTime == -1) return;
  
      const timerId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
        // console.log("in timer")
        console.log("remaining time:"+remainingTime)
      }, 1000);
  
      return () => clearInterval(timerId);
    }, [remainingTime]);
  
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    useEffect(()=>{

        async function fetchDataCall(){
            const a = await fetchData()
            console.log("in use effect")
            console.log ("got back " +a )
            setQuestions(a)
        }
      fetchDataCall()
      },[]);

    function isThereGreen(){

        const colorsGreen = colors.filter(x=> x=="green")
        var isThereGreen = colorsGreen.length==0?false:true

        return isThereGreen
      }
    const fetchData2 = async (primary) =>{

      //todo make this use the teacher name
      const thisURL = window.location.href;
      const splits = thisURL.split('/')
      const url = "http://localhost:5000/startUnit?className="+splits[5]+"&username="+splits[3]+"&unitName="+primary
      const result = await fetch(url)      
      const jsonResult = await result.json();
      console.log("json2 result is ")
      console.log(jsonResult)
      return jsonResult;
    }
      async function startUnit(primary){ 
       
          console.log("startUnit")
          const thisURL = window.location.href;
          const splits = thisURL.split('/')
    
    
          let result = await fetchData2(primary)     
          console.log(result)
          if (result == 0){
            result = -1
          }
          const nextURL = 'http://'+splits[2]+"/"+splits[3]+"/"+primary+"/"+splits[5]+ "/"+1+ "/QuestionView"+"/"+remainingTime
          console.log("the next url is " +nextURL)
          window.location.assign(nextURL);
        
        
      }


      function nextPage(){
        console.log("in next page")
        console.log("time left"+remainingTime)
        if (nextLesson!=""){
          console.log(nextLesson)
          startUnit(nextLesson)
        }
        else{
          if(nextURL.indexOf("studentClassUnits") == -1)
            nextURL = nextURL + remainingTime
          console.log("the next url is " +nextURL)
          window.location.assign(nextURL);
        }
      }
      async function quit(){
        const url = "http://localhost:5000/quitActiveUnit?username="+splits[3]+"&unitName="+ splits[4]+ "&className=" + splits[5]
        const promise = await fetch(url)
        nextURL = 'http://'+splits[2]+"/"+splits[3]+"/"+splits[5]+"/studentClassUnits"
        console.log("the next URL is " + nextURL)
        window.location.assign(nextURL);
      }

      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      
      async function submitSingle(qans,id){
        if(isThereGreen()){
          return
        }
        console.log("in submit single")
        const thisURL = window.location.href;
        const splits = thisURL.split('/')
        const url = "http://localhost:5000/submitQuestion?username="+splits[3]+"&unitName="+ splits[4]+ "&className=" + splits[5]+
        "&ans="+qans +"&qnum=" +questions[0].id  
        
        const promise =  await fetch(url,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(answers)        
        })
        if(promise.status ===200){
          console.log(promise)
          console.log("success")
          const nextId = questions[0].id +1
          nextURL = 'http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/"+splits[5]+ "/"+ nextId + "/QuestionView"+"/"
          const newColors = [...colors];
          newColors[qans]="green"
          setColors(newColors)

        }if(promise.status ===201 || promise.status ===202||promise.status ===203||promise.status ===204){
          //http://localhost:3000/dan/math2/math2/1/QuestionView
          //http://localhost:3000/dan/math2/studentClassUnits

          const newColors = [...colors];
          newColors[qans]="red"
          setColors(newColors)
          await sleep(500); // Sleep for 0.5 second
          newColors[promise.status-200] = "green"
          setColors(newColors)


          console.log(promise)
          console.log("success")
          const nextId = questions[0].id +1
          nextURL = 'http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/"+splits[5]+ "/"+ nextId + "/QuestionView"+"/"

        }
        else if(promise.status ===205){
          //http://localhost:3000/dan/math2/math2/1/QuestionView
          //http://localhost:3000/dan/math2/studentClassUnits
          console.log(promise.body)

          const newColors = [...colors];
          newColors[qans]="green"
          setColors(newColors)

          console.log(promise)
          console.log("success")
          const nextId = questions[0].id +1
          nextURL = 'http://'+splits[2]+"/"+splits[3]+"/"+splits[5]+"/studentClassUnits"
          console.log("the next URL is " + nextURL)
        }
        else if(promise.status ===206){
          console.log(promise.body)
          const newColors = [...colors];
          newColors[qans]="green"
          setColors(newColors)
          console.log(promise)
          console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",nextLesson)
          let t = await promise.json()
          console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",t)
          await setNextLesson(t);
          console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",nextLesson)
          
        }
        else
          console.log("didn't work try again")
      }

      const currentTime = new Date();
      const expiryTime = new Date(currentTime.getTime() + remainingTime * 1000); // Calculate expiry time

    return (
        <div className='big-question'>
          
             <h1> 
              {questions[0].preamble}
             </h1>
             {remainingTime>0 && <div>
              <MyTimer expiryTimestamp={expiryTime} />
             </div>}
             
             
               <div className="multiple-choice questions_background" style={{marginLeft:30}}>
                    <h2 style={{fontWeight:800}}>    &nbsp;&nbsp;&nbsp;&nbsp;{questions[0].primary}</h2>

                <ul className='ul'>
                  <li style={{backgroundColor:colors[1]}} className="hover-resize2 li" onClick={() => submitSingle(1,questions[0].id)} >
                    <div>
                        <h3 style={{fontWeight:800}}>{questions[0].preamble==="מצא את נקודת הקיצון:" ? "("+questions[0].answer1+")" : questions[0].answer1} </h3>
                    </div>
                  </li>
                  <li style={{backgroundColor:colors[2]}} className="hover-resize2 li" onClick={() => submitSingle(2,questions[0].id)} >
                    <div>
                        <h3 style={{fontWeight:800}}>{questions[0].preamble==="מצא את נקודת הקיצון:" ? "("+questions[0].answer2+")" : questions[0].answer2} </h3>
                    </div>
                  </li>
                  <li style={{backgroundColor:colors[3]}} className="hover-resize2 li" onClick={() => submitSingle(3,questions[0].id)} >
                    <div>
                        <h3 style={{fontWeight:800}}>{questions[0].preamble==="מצא את נקודת הקיצון:" ? "("+questions[0].answer3+")" : questions[0].answer3} </h3>
                    </div>
                  </li>
                  <li style={{backgroundColor:colors[4]}} className="hover-resize2 li" onClick={() => submitSingle(4,questions[0].id)} >
                    <div>
                        <h3 style={{fontWeight:800}}>{questions[0].preamble==="מצא את נקודת הקיצון:" ? "("+questions[0].answer4+")" : questions[0].answer4} </h3>
                    </div>
                  </li>

                </ul>
            </div>
            <button className='form-submit' onClick={()=>nextPage()} style={{float: 'left'}}>
              השאלה הבאה
            </button>
            <button className='form-submit' onClick={()=>quit()} style={{float: 'left'}}>
              סיום נסיון מענה
            </button>
        </div>
        
      );




}
