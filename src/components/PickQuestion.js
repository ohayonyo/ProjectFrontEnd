import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import '../css/pickData.css'

const PickQuestion = () => {
  const thisURL = window.location.href;
  const splits = thisURL.split('/')
  const options = ['intersection', 'extremes', 'incDec']
  const [selectedOptions, setSelectedOptions] = useState([]);
  //const history = useHistory();
  // const [teacherName, setTeacherName] = useState('');
  const [className, setClassName] = useState(splits[4]);


  const handleChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedOptions(prevSelectedOptions => {
      if (prevSelectedOptions.includes(selectedOption)) {
        // If the selected option is already in the array, remove it
        return prevSelectedOptions.filter(option => option !== selectedOption);
      } else {
        // Otherwise, add it to the array
        return [...prevSelectedOptions, selectedOption];
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/openUnit/"+splits[6]+"/parameters/"+splits[8]+"/"+selectedOptions);
  };
  return (
    <div class="form-wrapper">
        <form class="form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <label class="form-label">
        Choose an option:
        <select class="form-select" multiple value={selectedOptions} onChange={handleChange}>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </label>
      <button class="form-submit" type="submit">SubmitQuestion</button>
      </form>
    </div>
  );
}
 
export default PickQuestion;