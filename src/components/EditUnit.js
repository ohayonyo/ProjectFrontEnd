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
  const url = "http://mathematix.duckdns.org:5000/getUnitDetails?unitName="+splits[5]+"&className="+splits[4]
  fetchDataCall(url)
  },[]);


  const url = "http://mathematix.duckdns.org:5000/getUnitDetails?teacher="+splits[3]+"&unitName="+splits[5]+"&className="+splits[4]
  console.log(url)
  const [name, setName] = useState(splits[5]);
  const [qnum, setQnum] = useState("");
  const [desc, setDesc] = useState("");
  const [timeLimit, setTimeLimit] = useState(0);
  const [dueDate, setDueDate] = useState(new Date());
  const [unitNameIsMissing,setUnitNameIsMissing] = useState(false);
  const [unitDescIsMissing,setUnitDescIsMissing] = useState(false);




  const handleNext = async () => {
    if(name.length===0){
      setUnitNameIsMissing(true);
    }else{
      setUnitNameIsMissing(false);
    }if(desc.length===0){
      setUnitDescIsMissing(true);
    }else{
      setUnitDescIsMissing(false);
    }

    if((name.length>0 && desc.length>0)){
      const url = "http://mathematix.duckdns.org:5000/editUnit?unitName="+splits[5]+
      "&className="+splits[4]+"&newDesc="+desc+"&newUnitName="+name
      +"&newQnum="+qnum+"&newMaxTime="+timeLimit+"&newSubDate="+dueDate
      console.log(url)
      const res = await fetchData(url)
      console.log(res)
      if (res.message == "successful"){
        window.location.href = 'http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/classUnits";
      }
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
// 
  return (
    <div className='container' style={{marginTop: unitNameIsMissing && unitDescIsMissing ? 40 
      : unitNameIsMissing || unitDescIsMissing ?
      30 : 45 }}>

  <label className='label2'>

    <label className='header'>
     יחידת הלימוד {decodeURIComponent(name)}  
    </label>
      
  </label>

  <label className='label2'>
    :תיאור יחידת הלימוד
    <br />
    <input
      className='input_data2'
      type="text"
      value={decodeURIComponent(desc)}
      onChange={(e) => setDesc(e.target.value)}
      style={{ ...inputStyle, textAlign: 'center' }}
    />
  </label>

  <label className='label2'>
    :כמות שאלות נכונות ברצף שצריך לענות עליהן
    <br />
    <input
      className='input_data2'
      type="number"
      value={qnum}
      onChange={(e) => setQnum(e.target.value)}
      style={{ ...inputStyle, textAlign: 'center' }}
      min={1}
    />
  </label>

  <label className='label2'>
    :הגבלת הזמן בדקות
    <br />
    <input
      className='input_data2'
      type="number"
      value={timeLimit}
      onChange={(e) => setTimeLimit(e.target.value)}
      style={{ ...inputStyle, textAlign: 'center' }}
      min={0}
    />
  </label>

  <label className='label2'>
    :תאריך הגשה
    <br />
    <input
      className='input_data2'
      type="datetime-local"
      value={new Date(dueDate.getTime() - (dueDate.getTimezoneOffset() * 60000)).toISOString().slice(0, 16)}
      onChange={(e) => setDueDate(new Date(Date.parse(e.target.value)))}
      style={{ ...inputStyle, textAlign: 'center' }}
      min={new Date().toLocaleString('en-IL', {timeZone: 'Asia/Jerusalem'}).slice(0, 16)}
    />
  </label>

  {unitNameIsMissing && unitDescIsMissing}
  {unitNameIsMissing && <label style={{ color: 'red', fontSize: 20 }}>חסר שם יחידת הלימוד</label>}
  {unitDescIsMissing && <label style={{ color: 'red', fontSize: 20 }}>חסר תיאור של יחידת הלימוד</label>}
  
  <button onClick={handleNext} className="form-submit2" style={{transform: 'scale(1.2)',paddingBottom:-15}}>לבחירת נתונים</button>

</div>
  );
};

export default EditUnit;