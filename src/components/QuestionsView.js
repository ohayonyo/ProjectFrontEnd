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
    const questionPreamble = ":???????? ?????????? ???? ????????????"
    const [answers,setAnswers] = useState({
        0: "basic answer"
  })
    const [questions,setQuestions] = useState([{
    id: 1,
    primary:"dan",
    secondary:"this is a cut axis question",
    answer1:"dan",
    answer2:"two",
    answer3:"three",
    answer4:"four"
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


    useEffect(()=>{

        async function fetchDataCall(){
            const a = await fetchData()
            console.log("in use effect")
            console.log ("got back " +a )
            setQuestions(a)
        }
      fetchDataCall()
      },[]);

    function getAnswer(val,id){

        const newAnswers = {...answers}

        newAnswers[id] = val.target.value
        console.log(newAnswers)

        setAnswers(newAnswers)
      }


   

      async function submitSingle(qans,id){
        console.log("in submit single")
        const thisURL = window.location.href;
        const splits = thisURL.split('/')
        const url = "http://localhost:5000/submitQuestion?username="+splits[3]+"&unitName="+ splits[4]+ "&className=" + splits[5]+
        "&ans="+qans +"&qnum=" +questions[0].id  
        
        //questions.forEach (q => answers[q.id] = "the answer is " + q.id) 

        const promise =  await fetch(url,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(answers)        
        })
        if(promise.status ===200){
          console.log(promise)
          console.log("success")
          const nextId = questions[0].id +1
          const nextURL = 'http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/"+splits[5]+ "/"+ nextId + "/QuestionView"
          console.log("the next url is " +nextURL)
          window.location.assign(nextURL);
        }
        if(promise.status ===204){
          //http://localhost:3000/dan/math2/math2/1/QuestionView
          //http://localhost:3000/dan/math2/studentClassUnits

          console.log(promise)
          console.log("success")
          const nextId = questions[0].id +1
          const nextURL = 'http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/"+splits[5]+ "/getGrade"
          //const nextURL = 'http://'+splits[2]+"/"+splits[3]+"/"+splits[5]+ "/studentClassUnits"
          console.log("the next url is " +nextURL)
          window.location.assign(nextURL);
        }
        else
          console.log("didn't work try again")
      }








    return (
        <div className='big-question'>
          
             <h1> {questionPreamble}</h1>
               <div className='multiple-choice'>
                    <h2>  {questions[0].primary} ,{questions[0].id}</h2>

                <ul>
                  <li onClick={() => submitSingle(1,questions[0].id)} >{questions[0].answer1}</li>
                  <li onClick={() => submitSingle(2,questions[0].id)} >{questions[0].answer2}</li>
                  <li onClick={() => submitSingle(3,questions[0].id)} >{questions[0].answer3}</li>
                  <li onClick={() => submitSingle(4,questions[0].id)} >{questions[0].answer4}</li>

                </ul>
            </div>
        </div>
        
      );




}
