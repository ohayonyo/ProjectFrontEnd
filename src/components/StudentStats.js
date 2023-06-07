import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Fab from '@mui/material/Fab';
import {Chart, ArcElement,Tooltip,Legend,CategoryScale,LineController,LineElement, PointElement, LinearScale, Title} from 'chart.js'
import { useState,useEffect } from "react";

import { Pie,Line } from 'react-chartjs-2';

import 'react-edit-text/dist/index.css';




const thisURL = window.location.href;
const splits = thisURL.split('/');

const fetchData = async (url) =>{
  const result = await fetch(url)      
  const jsonResult = await result.json();
  console.log("json2 result is ")
  console.log(jsonResult)
  return jsonResult;
}


export default function UnitStats() {
    Chart.register(ArcElement,Tooltip,Legend,CategoryScale,LineController,LineElement,PointElement, LinearScale, Title);

    const [dataCorrectIncorrect, setDataCorrectIncorrect] = useState(
        {
            labels: ['Correct Questions', 'Incorrect Questions'],
            datasets: [
              {
                data: [75, 25],
                backgroundColor: ['#3CB371', '#DC143C']
              },
            ]
          });
  

    const [datalast5Grades, setDatalast5Grades] = useState(
        {
            labels: ['5th', '4th', '3rd', '2nd', '1st'],
            datasets: [{
                label: 'Last grades',
                data: [50, 45, 60, 55, 70],
                fill: false,
                borderColor: 'blue',
                },],
          });    
    
    const [messages, setMessages] = useState([]); 

    useEffect(()=>{

      async function fetchDataCall2(){
        const url = "http://mathematix.duckdns.org:5000/getStudentStats?username="+splits[3]+"&unitName="+splits[5]+"&className="+splits[4]+"&student="+splits[6]
          const a = await fetchData(url)
          console.log("in use effect2")
          setMessages(a)
      }
    fetchDataCall2()
    },[]);



    useEffect(()=>{

      async function fetchDataCall(){
        const url = "http://mathematix.duckdns.org:5000/individualStats?usernameT="+splits[3]+"&unitName="+splits[5]+"&className="+splits[4]+"&usernameS="+splits[6]
        console.log(url)
        const a = await fetchData(url)
        console.log("in use effect2")
        console.log(a[0])

        setDataCorrectIncorrect(prevState => ({
            ...prevState,
            datasets: [
              {
                ...prevState.datasets[0], // copy the existing dataset object
                data: [a["correctIncorrect"][0], a["correctIncorrect"][1]] // update the data field with new values
              }
            ]
          }));

        setDatalast5Grades(prevState => ({
        ...prevState,
        datasets: [
            {
            ...prevState.datasets[0], // copy the existing dataset object
            data: [a["L5"][4], a["L5"][3],a["L5"][2],a["L5"][1],a["L5"][0],] // update the data field with new values
            }
        ]
        }));
          
      }
    fetchDataCall()
    },[]);


    console.log("correct incorrect is" + dataCorrectIncorrect)

    const handleClick = (elements) => {
      if (elements.length > 0) {
        const clickedElement = elements[0];
        if("#1BBC63" === clickedElement.element.options.backgroundColor)
          window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/"+splits[5]+"/"+splits[6]+"/" + "Correct"+"/"+ "questionReview");
        else
          window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/"+splits[5]+"/"+splits[6]+"/" + "Incorrect"+"/"+ "questionReview");

        }
    };

    const options = {
      onClick: (_, elements) => handleClick(elements),
    };



  return (
    
    <div style={{resize: 'both',
    width:'105%',paddingRight:'20%'}}>
      
  <React.Fragment>
    <CssBaseline />
    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}> {splits[6]}</p>


      <div style= {{padding:'20px',width:'300px'}}>
            <Pie data={{
              labels: ['Correct Questions', 'Incorrect Questions'],
              datasets: [
                {
                  data: [messages['correct'], messages['bad']],
                  backgroundColor: ['#3CB371', '#DC143C']
                },
              ]
            }} options={options} />
      </div>
      <div style= {{padding:'20px',width:'300px'}}>
            <Line data={datalast5Grades} />
      </div>
    
  </React.Fragment>



</div>
    
  );
}