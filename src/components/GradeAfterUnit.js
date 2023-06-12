import * as React from 'react';
import { useState,useEffect } from "react";

const fetchData = async () =>{

      const thisURL = window.location.href;
      const splits = thisURL.split('/')
  
      //todo make this use the teacher name
      const url = "http://87.71.64.163:5000/getGrade?username="+splits[3]+"&unitName="+ splits[4]+ "&className=" + splits[5]
      console.log("fetching grade with url " + url)
      const result = await fetch(url)      
      const jsonResult = await result.json();
      console.log("json result is ")
      console.log(jsonResult)
      return jsonResult;
    }

export default function GradeAfterUnit() {
    const [grade, setGrade] = useState("");


    useEffect(()=>{
        async function fetchDataCall(){
            const a = await fetchData()
            console.log("in use effect")
            console.log ("got back " +a )
            setGrade(a)
        }
      fetchDataCall()
      },[]);


      async function backToClassPage(){
        console.log("in backToClassPage")
        const thisURL = window.location.href;
        const splits = thisURL.split('/')
        const nextURL = 'http://'+splits[2]+"/"+splits[3]+"/"+splits[5]+ "/studentClassUnits"
        console.log("the next url is " +nextURL)
        window.location.assign(nextURL);
      }

      return (
        <div>
          
             <h1> הציון שלך הוא:</h1>
               <div className='multiple-choice'>
                    <h1>  {grade} </h1>
                    <button onClick={()=>backToClassPage()} style={{float: 'left'}}>
                     חזרה לכיתה
                    </button>

            </div>
        </div>
        
      );
}