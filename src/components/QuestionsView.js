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
    const questionPreamble = " (a,b)(c,d) אלה שאלות נקודות חיתוך עם הצירים, נא להכניס את התשובה בפורמט"
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


    async function submitQuestions(){
      const thisURL = window.location.href;
      const splits = thisURL.split('/')
        const url = "http://localhost:5000/submitQuestions?username="+splits[3]+"&unitName="+ splits[4]+ "&className=" + splits[5]
        
        //questions.forEach (q => answers[q.id] = "the answer is " + q.id) 

        const promise =  await fetch(url,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(answers)        
        })
        if(promise.status ===200){
          console.log(promise)
          console.log("success")
        }
        else
          console.log("didn't work try again")
      }









    return (
        <div style={{resize: 'both',
        overflow: 'auto',width:'105%',paddingRight:'20%'}}>
          
          <React.Fragment>
          <CssBaseline />
          <Paper square sx={{ pb: '50px' }}>
            <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }} style={{textAlign:'center',marginRight:-100}}>
             
             <label> {questionPreamble}</label>
            </Typography>
            <div className='multiple-choice'>
    
              <List sx={{ mb: 2 }}>
                {questions.map(({ id,primary, options }) => (
                  <React.Fragment key={id}>
                    <ListItem button>
                    <label style={{marginRight:20}} >{id}    </label>
                      <ul>
                      <li>
                        <button onClick={()=>submitQuestions()} style={{float: 'left'}}>
                          {questions[0].answer1}
                        </button> 
                      </li>          
                      <li>
                        <button onClick={()=>submitQuestions()} style={{float: 'left'}}>
                          {questions[0].answer2}
                         </button>  
                      </li>             
                      <li>
                        <button onClick={()=>submitQuestions()} style={{float: 'left'}}>
                          {questions[0].answer3}
                        </button>
                      </li>             

                      <li><button onClick={()=>submitQuestions()} style={{float: 'left'}}>
                        {questions[0].answer4}
                      </button> 
                      </li>             
                  </ul>        

                    <ListItemText 
                    primary={<Typography variant="h6" style={{ color: '#000000',textAlign:'right',marginTop:-1,marginRight:20 }}>{primary}</Typography>} />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </div>
              
          
          </Paper>  
        </React.Fragment>

        <button onClick={()=>submitQuestions()} style={{float: 'left'}}>
          Submit Questions
        </button>
        </div>
        
      );




}
