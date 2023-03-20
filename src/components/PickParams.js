import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import '../css/PickParams.css'
const dict ={"quadratic":3,"linear":2,"trigonometric":4}
const PickParams = () => {
  const thisURL = window.location.href;
  const splits = thisURL.split('/')
  const numInputs = dict[splits[9]]
  const [minValues, setMinValues] = useState(Array(numInputs).fill(5));
  const [maxValues, setMaxValues] = useState(Array(numInputs).fill(5));
  const [checkboxValues, setCheckboxValues] = useState(Array(numInputs).fill(true));
  
  //const history = useHistory();
  // const [teacherName, setTeacherName] = useState('');
  const [className, setClassName] = useState(splits[4]);
  const first = (splits[6]=="new") 
  const nname = splits[6]+"n"
  let nameS = splits[6]

  const parseTemp = () =>{
    let res = []
    for (let i = 0; i < minValues.length; i++){
      res.push([minValues[i],maxValues[i]])
    }
    return splits[8]+'_'+splits[9]+'_'+res
  }
  const fetchData = async () =>{

    const thisURL = window.location.href;
    const splits = thisURL.split('/')
    
    if (!first){
      nameS = nname
    }

    console.log(" in fetchData")
    const url = "http://localhost:5000/openUnit?teacher="+splits[3]+"&unitName="+nameS
    +"&className="+splits[4]+"&template="+parseTemp()+"&Qnum="+splits[11]+"&maxTime="+splits[12]
    +"&subDate="+splits[13].getUTCDate()+"&first="+first+"&prev="+splits[6]
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
      window.location.href = `http://${splits[2]}/${splits[3]}/${splits[4]}/openUnit/${nameS}/details`;
    }
  };

  const handleChangeMin = (event, index) => {
    const newValue = parseInt(event.target.value);
    setMinValues(prevMinValues => {
      if (newValue <= parseInt(maxValues[index])){
        const newMinValues = [...prevMinValues];
        newMinValues[index] = newValue;
        return newMinValues;
      }
      return prevMinValues;
    });
  };
  
  const handleChangeMax = (event, index) => {
    const newValue = parseInt(event.target.value);
    setMaxValues(prevMaxValues => {
      if (newValue >= parseInt(minValues[index])){
        const newMaxValues = [...prevMaxValues];
        newMaxValues[index] = newValue;
        return newMaxValues;
      }
      return prevMaxValues;
    });
  };

  const handleCheckboxChange = (event, index) => {
    const newValue = event.target.checked;
    setCheckboxValues(prevCheckboxValues => {
      const newCheckboxValues = [...prevCheckboxValues];
      newCheckboxValues[index] = newValue;
      return newCheckboxValues;
    });
  };

  const inputElements = [];

  for (let i = 0; i < numInputs; i++) {
    let paramName=String.fromCharCode(i+'a'.charCodeAt(0));
    inputElements.push(
      <div key={i}>
        <label className='label'>
          {paramName} :
          <input type="number" name="min" value={minValues[i]} onChange={(event) => handleChangeMin(event, i)} />
          <input type="number" name="min" value={maxValues[i]} onChange={(event) => handleChangeMax(event, i)} />
        </label>
        {/* <label className='label'>
          <input className='inputCheckBox' style={{marginLeft:10}}type="checkbox" checked={checkboxValues[i]} onChange={(event) => handleCheckboxChange(event, i)} />
          randomize?
        </label> */}
      </div>
    );
  }

  return (
    <div style={{marginTop:200}}>
      <form className="form-container">
        {inputElements}
        <button onClick={handleAddExercise} className="submitButton">להוספת תרגילים</button>
        <button onClick={handleFinishUnit} className="submitButton">לסיום</button>
      </form>
    </div>
    
  );
}
 
export default PickParams;