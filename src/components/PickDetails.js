import React, { useState } from 'react';
import '../css/PickDetails.css';

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

  const parseTemp = (tempString) =>{
    const temp = tempString.split('_');
    const pars = temp[2].substr(1, temp[2].length-2).split('],[')
    let res = []
    console.log(pars)
    for (let i = 0; i < pars.length; i++){
      const p = pars[i].split(',')
      if (p[2]=='true'){
        res.push([p[0],p[1]])
      }
      else{
        const r = Math.round(Math.random()*20-10)
        res.push([r,r])
      }
    }
    return temp[0]+'_'+temp[1]+'_'+res
  }

  const fetchData = async () =>{

    const thisURL = window.location.href;
    const splits = thisURL.split('/')
    
    if (!first){
      nameS = nname
    }

    console.log(" in fetchData")
    const url = "http://localhost:5000/openUnit?teacher="+splits[3]+"&unitName="+nameS
    +"&className="+splits[4]+"&template="+parseTemp(splits[8])+"&Qnum="+qnum+"&maxTime="+timeLimit
    +"&subDate="+dueDate.getUTCDate()+"&first="+first+"&prev="+splits[6]
    const response = await fetch(url);
    console.log(response.status)
    return response.status==200
        
  }
  const handleFinishUnit = () => {
    const res = fetchData()
    console.log(res + " in finishUnit")
    if(res){
      window.location.href = `http://${splits[2]}/${splits[3]}/${splits[4]}/classUnits`;
    }
  };

  const handleAddExercise = () => {
    const res = fetchData()
    console.log(res + " in addExercise")
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
        Name:
        <br></br>
        <input disabled={!first} type="text" value={first?name:(nname)} onChange={(e) => setName(e.target.value)} style={inputStyle}/>
      </label>

      <label className='label'>
        Number of questions:
        <br></br>
        <input type="number" value={qnum} onChange={(e) => setQnum(e.target.value)} style={inputStyle} />
      </label>

      <label className='label'>
        Time Limit:
        <br></br>
        <input type="number" value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} style={inputStyle} />
      </label>

      <label className='label'>
        Due Date:
        <br></br>
        <input type="datetime-local" value={dueDate.toISOString().slice(0, 16)} onChange={(e) => setDueDate(new Date(e.target.value))} style={inputStyle} />
      </label>
      
      <button onClick={handleAddExercise} style={buttonStyle}>Add Another Exercise</button>
      <button onClick={handleFinishUnit} style={buttonStyle}>Finish Unit</button>
      
    </div>
  );
};

export default PickDetails;