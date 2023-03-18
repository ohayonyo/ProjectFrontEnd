import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import '../css/pickData.css'
//
const PickData = () => {
  const thisURL = window.location.href;
  const splits = thisURL.split('/')
  const options = ['linear', 'quadratic', 'trigonometric', 'exponential']
  const [selectedOption, setSelectedOption] = useState('');
  // const [teacherName, setTeacherName] = useState('');
  const [className, setClassName] = useState(splits[4]);


  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/openUnit/"+splits[6]+"/question/"+selectedOption);
  };
  return (
  <div class="form-wrapper">
    <form onSubmit={handleSubmit} class="form">
    <label class="form-label">
      Choose an option:
      <select value={selectedOption} onChange={handleChange} className="form-select form-select-arrow">
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
    <button type="submit" class="form-submit">Submit</button>
    </form>
  </div>
  );
}
 
export default PickData;