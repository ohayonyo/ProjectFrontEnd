import React, { useState,useEffect} from 'react';
import '../css/PickDetails.css';
import '../css/PickParams.css'

const PickDetails = () => {
  const thisURL = window.location.href;
  const splits = thisURL.split('/');
  const first = (splits[6]=="new") 
  const ord = (splits[6]).split("_")[(splits[6]).split("-").length-1]
  const nname = splits[6]+"_"+((ord.length > 2)?2:ord)
  const [name, setName] = useState(first?"":(nname));
  const [qnum, setQnum] = useState('1');
  const [desc, setDesc] = useState('');
  const [timeLimit, setTimeLimit] = useState(0);
  const [dueDate, setDueDate] = useState(new Date());
  const [unitNameIsMissing,setUnitNameIsMissing] = useState(false);
  const [unitDescIsMissing,setUnitDescIsMissing] = useState(false);

  let nameS = first?name:(nname)





  const handleNext = () => {
    console.log("before updating:")
    // console.log("unitNameIsMissing="+unitNameIsMissing.current)
    console.log("unitDescIsMissing="+unitDescIsMissing)

    console.log(name.length)
    console.log(name.length===0)
    if(name.length===0){
      setUnitNameIsMissing(true);
    }else{
      setUnitNameIsMissing(false);
    }if(desc.length===0){
      setUnitDescIsMissing(true);
    }else{
      setUnitDescIsMissing(false);
    }

    console.log("after updating:")
    // console.log("unitNameIsMissing="+unitNameIsMissing.current)
    console.log("unitDescIsMissing="+unitDescIsMissing)


    if(name.length>0 && desc.length>0)
      window.location.href = 'http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/openUnit/"+splits[6]+"/data/"+name+"/"+qnum+"/"+timeLimit+"/"+dueDate+"/"+((desc=='')?"cont":desc);
    
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
  };

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

  if(first){
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
          <input type="number" value={qnum} onChange={(e) => setQnum(e.target.value)} style={inputStyle} min={1} />
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
      
        {unitNameIsMissing && <label style={{ color: 'red',fontSize:40 }}>חסר שם יחידת הלימוד</label>}

        {unitDescIsMissing && <label style={{ color: 'red',fontSize:40 }}>חסר תיאור של יחידת הלימוד</label>}
        
        
        <button onClick={handleNext} className="form-submit">לבחירת נתונים</button>
        
      </div>
    );
}else{
  return (
    <div className='container' style={{marginTop:'10%'}}>

    <div style={{width:'50%',position:'relative',transform: 'scale(1.2)'}}>
          <label className='label'>
          :שם יחידת הלימוד
            <br></br>
            <input disabled={!first} type="text" value={first?name:(nname)} onChange={(e) => setName(e.target.value)} style={inputStyle}/>
          </label>

          <label className='label'>
          :כמות שאלות נכונות ברצף שצריך לענות עליהן
            <br></br>
            <input type="number" value={qnum} onChange={(e) => setQnum(e.target.value)} style={inputStyle} min={1}/>
          </label>

          <button onClick={handleNext} className="form-submit">לבחירת נתונים</button>
    </div>

    
      
    </div>
  );

}

};

export default PickDetails;