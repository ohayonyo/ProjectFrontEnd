import React, { useState } from 'react';
import '../css/PickDetails.css';
import '../css/PickParams.css'

const PickDetails = () => {
  const thisURL = window.location.href;
  const splits = thisURL.split('/');
  const first = (splits[6]=="new") 
  const ord = (splits[6]).split("_")[(splits[6]).split("-").length-1]
  const nname = splits[6]+"_"+((ord.length > 2)?2:ord)
  const [name, setName] = useState(first?"":(nname));
  const [qnum, setQnum] = useState('');
  const [desc, setDesc] = useState('');
  const [timeLimit, setTimeLimit] = useState(0);
  const [dueDate, setDueDate] = useState(new Date());


  let nameS = first?name:(nname)





  const handleNext = () => {
      window.location.href = 'http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/openUnit/"+splits[6]+"/data/"+name+"/"+qnum+"/"+timeLimit+"/"+dueDate+"/"+((desc=='')?"cont":desc);
    
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
        <input disabled={!first} type="text" value={first?name:(nname)} onChange={(e) => setName(e.target.value)} style={inputStyle}/>
      </label>

      <label className='label'>
      :תיאור יחידת הלימוד
        <br></br>
        <input disabled={!first} type="text" value={desc} onChange={(e) => setDesc(e.target.value)} style={inputStyle}/>
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
        <input type="datetime-local" value={dueDate.toISOString().slice(0, 16)} onChange={(e) => setDueDate(new Date(e.target.value))} style={inputStyle} min={new Date()}/>
      </label>
      
      <button onClick={handleNext} className="form-submit">לבחירת נתונים</button>
      
    </div>
  );
};

export default PickDetails;