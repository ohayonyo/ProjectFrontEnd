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

    console.log("name="+name)
    console.log("desc="+desc)
    if((name.length>0 && desc.length>0)||(!first))
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
    <div className='container1' style={{marginTop: unitNameIsMissing && unitDescIsMissing ? -300 
      : unitNameIsMissing || unitDescIsMissing ?
      -300 : -295 }}>

        

  <label className='header' style={{fontSize:30,marginTop:180}}>פרטי יחידת הלימוד</label>

  <label className='label2'>
    :שם יחידת הלימוד
    <br />
    <input
      className='input_data2'
      disabled={!first}
      type="text"
      value={first ? name : nname}
      onChange={(e) => setName(e.target.value)}
      style={{ ...inputStyle, textAlign: 'center' }}
    />
  </label>

  <label className='label2'>
    :תיאור יחידת הלימוד
    <br />
    <input
      className='input_data2'
      disabled={!first}
      type="text"
      value={desc}
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
}else{
  return (
    <div className='container' style={{ marginTop: '5.5%', textAlign: 'center' }}>

  <div style={{ width: '50%', position: 'relative', transform: 'scale(1.2)' }}>
    <label className='header' style={{fontSize:30}}>פרטי יחידת הלימוד</label>
    <label className='label2'>
      :שם יחידת הלימוד
      <br />
      <input
        className='input_data2'
        disabled={!first}
        type="text"
        value={first ? decodeURIComponent(name) : decodeURIComponent(nname)}
        onChange={(e) => setName(e.target.value)}
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

    <button onClick={handleNext} className="form-submit2" style={{transform: 'scale(1.2)',paddingBottom:-15,marginTop:10}}>לבחירת נתונים</button>
    <br></br>
    <br></br>
  </div>
</div>
  );

}

};

export default PickDetails;