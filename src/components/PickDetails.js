import React, { useState } from 'react';
import '../css/openclass.css';

const PickDetails = () => {
  const thisURL = window.location.href;
  const splits = thisURL.split('/');
  
  const [name, setName] = useState('');
  const [qnum, setQnum] = useState('');
  const [timeLimit, setTimeLimit] = useState(0);
  const [dueDate, setDueDate] = useState(new Date());
  const first = (splits[6]=="new") 
  const nname = splits[6]+"n"
  let nameS = name


  const fetchData = async () =>{

    const thisURL = window.location.href;
    const splits = thisURL.split('/')
    
    if (!first){
      console.log(nameS)
      nameS = nname
      console.log(nameS)
    }
    const url = "http://localhost:5000/openUnit?teacher="+splits[3]+"&unitName="+nameS
    +"&className="+splits[4]+"&template="+splits[8]+"&Qnum="+qnum+"&maxTime="+timeLimit
    +"&subDate="+dueDate.getUTCDate()+"&first="+first+"&prev="+splits[6]
    const response = await fetch(url);
    console.log(response)
    return response.status==200
        
  }
  const handleFinishUnit = () => {
    const res = fetchData()
    console.log(res)
    if(res){
      window.location.href = `http://${splits[2]}/${splits[3]}/${splits[4]}/classUnits`;
    }
  };

  const handleAddExercise = () => {
    const res = fetchData()
    console.log(res)
    if(res){
      window.location.href = `http://${splits[2]}/${splits[3]}/${splits[4]}/openUnit/${nameS}/data`;
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
  };

  const inputStyle = {
    marginBottom: '10px',
    padding: '5px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid gray',
    width: '100%',
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
    <div style={containerStyle}>
      <label>
        Name:
        <input disabled={!first} type="text" value={first?name:(nname)} onChange={(e) => setName(e.target.value)} style={inputStyle} />
      </label>
      <label>
        Number of questions:
        <input type="number" value={qnum} onChange={(e) => setQnum(e.target.value)} style={inputStyle} />
      </label>
      <label>
        Time Limit:
        <input type="number" value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} style={inputStyle} />
      </label>
      <label>
        Due Date:
        <input type="datetime-local" value={dueDate.toISOString().slice(0, 16)} onChange={(e) => setDueDate(new Date(e.target.value))} style={inputStyle} />
      </label>
      <button onClick={handleFinishUnit} style={buttonStyle}>Finish Unit</button>
      <button onClick={handleAddExercise} style={buttonStyle}>Add Another Exercise</button>
    </div>
  );
};

export default PickDetails;
