import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import '../css/PickParams.css'
const dict ={"quadratic":3,"linear":2,"trigonometric":4}
const PickParams = () => {
  const thisURL = window.location.href;
  const splits = thisURL.split('/')
  const numInputs = dict[splits[8]]
  const [minValues, setMinValues] = useState(Array(numInputs).fill(5));
  const [maxValues, setMaxValues] = useState(Array(numInputs).fill(5));
  const [checkboxValues, setCheckboxValues] = useState(Array(numInputs).fill(false));
  
  //const history = useHistory();
  // const [teacherName, setTeacherName] = useState('');
  const [className, setClassName] = useState(splits[4]);

  const handleChangeMin = (event, index) => {
    const newValue = event.target.value;
    setMinValues(prevMinValues => {
      if (newValue <= maxValues[index] && checkboxValues[index]){
        const newMinValues = [...prevMinValues];
        newMinValues[index] = newValue;
        return newMinValues;
      }
      return prevMinValues;
    });
  };
  
  const handleChangeMax = (event, index) => {
    const newValue = event.target.value;
    setMaxValues(prevMaxValues => {
      if (newValue >= minValues[index] && checkboxValues[index]){
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const zip = [numInputs]
    for (let i = 0; i < numInputs; i++) {
      zip[i] = "["+minValues[i]+","+maxValues[i]+","+checkboxValues[i]+"]"
    }
    const template = splits[8]+"_"+splits[9]+"_"+zip
    window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/openUnit/"+splits[6]+"/details/"+template);
  };

  const inputElements = [];

  for (let i = 0; i < numInputs; i++) {
    inputElements.push(
      <div key={i}>
        <label className='label'>
          parameter {i+1}:
          <input disabled={!checkboxValues[i]} type="number" min="-10" max="10" name="min" value={minValues[i]? minValues[i]: '5'} onChange={(event) => handleChangeMin(event, i)} />
          <input disabled={!checkboxValues[i]} type="number" min="-10" max="10" name="min" value={maxValues[i]?maxValues[i]: '5'} onChange={(event) => handleChangeMax(event, i)} />
        </label>
        <label className='label'>
          <input className='inputCheckBox' style={{marginLeft:10}}type="checkbox" checked={checkboxValues[i]} onChange={(event) => handleCheckboxChange(event, i)} />
          randomize?
        </label>
      </div>
    );
  }

  return (
    <div style={{marginTop:200}}>
      <form onSubmit={handleSubmit} className="form-container">
        {inputElements}
        <button className='submitButton' type="submit" className="submit-button">Submit Params</button>
      </form>
    </div>
    
  );
}
 
export default PickParams;