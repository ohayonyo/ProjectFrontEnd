import React, { useState, useEffect } from 'react';
import '../css/PickDetails.css';
import '../css/PickParams.css'

const EditUnit = () => {
  const thisURL = window.location.href;
  const splits = thisURL.split('/');
  
  
  const fetchData = async (url) =>{
    const result = await fetch(url)      
    const jsonResult = await result.json();
    console.log("json result is ")
    console.log(jsonResult)
    return jsonResult;
  }
  useEffect(()=>{

    async function fetchDataCall(url){
        const a = await fetchData(url)
        setQnum(a.Qnum)
        setDesc(a.desc)
        setTimeLimit(a.maxTime)
        //setDueDate(a.dueDate)
    }
  const url = "http://localhost:5000/getUnitDetails?unitName="+splits[5]+"&className="+splits[4]
  fetchDataCall(url)
  },[]);


  const url = "http://localhost:5000/getUnitDetails?teacher="+splits[3]+"&unitName="+splits[5]+"&className="+splits[4]
  console.log(url)
  const [name, setName] = useState(splits[5]);
  const [qnum, setQnum] = useState("");
  const [desc, setDesc] = useState("");
  const [timeLimit, setTimeLimit] = useState(0);
  const [dueDate, setDueDate] = useState(new Date());



  const handleNext = async () => {
    const url = "http://localhost:5000/editUnit?unitName="+splits[5]+
    "&className="+splits[4]+"&newDesc="+desc+"&newUnitName="+name
    +"&newQnum="+qnum+"&newMaxTime="+timeLimit+"&newSubDate="+dueDate
    console.log(url)
    const res = await fetchData(url)
    console.log(res)
    if (res.message == "successful"){
      window.location.href = 'http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/classUnits";
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
  };


  // font-size: 1.2rem;
  // padding: 0.5rem;
  // border: none;
  // border-radius: 5px;
  // box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  // outline: none;
  // width: 200px;
  // height:40px;
  /* max-width: 100px; */
  // margin-bottom: 1rem;

  const inputStyle = {
    marginBottom: '10px',
    padding: '0.5 rem',
    fontSize: '1.2rem',
    borderRadius: '5px',
    border: '1px solid gray',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
    outline: 'none',
    width: '250px',
    height:'35px',
    color: 'black'
  };

  const buttonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '5px',
    background: 'blue',
    color: 'white',
    cursor: 'pointer',
  };

  return (
    <div className='container' style={{marginTop:40}}>

<label className='label'>
      :שם יחידת הלימוד
        <br></br>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle}/>
      </label>

      <label className='label'>
      :תיאור יחידת הלימוד
        <br></br>
        <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} style={inputStyle}/>
      </label>

      <label className='label'>
      :כמות שאלות נכונות ברצף שצריך לענות עליהן
        <br></br>
        <input type="number" value={qnum} onChange={(e) => setQnum(e.target.value)} style={inputStyle} />
      </label>

      <label className='label'>
      :הגבלת הזמן בדקות
        <br></br>
        <input type="number" value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} style={inputStyle} min={0} />
      </label>

      <label className='label'>
      :תאריך הגשה
        <br></br>

        <input 
          type="datetime-local" 
          value={new Date(dueDate.getTime() - (dueDate.getTimezoneOffset() * 60000)).toISOString().slice(0, 16)} 
          onChange={(e) => setDueDate(new Date(Date.parse(e.target.value)))} 
          style={inputStyle} 
          min={new Date().toLocaleString('en-IL', {timeZone: 'Asia/Jerusalem'}).slice(0, 16)} 
        />    
      </label>
      
      <button onClick={handleNext} className="form-submit">לבחירת נתונים</button>
      
    </div>
  );
};

export default EditUnit;