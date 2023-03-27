import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import '../css/pickData.css'
//
const PickData = () => {
  const thisURL = window.location.href;
  const splits = thisURL.split('/')
  const options ={'linear':'פונקציה ליניארית', 'quadratic':'פונקציה ריבועית', 'trigonometric':'פונקציה טריגונומטרית', 'exponential':'פונקציה אקספוננציאלית'}
  const [selectedOption, setSelectedOption] = useState('');
  // const [teacherName, setTeacherName] = useState('');
  const [className, setClassName] = useState(splits[4]);


  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/openUnit/"+splits[6]+"/question/"+selectedOption
    +"/"+splits[8]+"/"+splits[9]+"/"+splits[10]+"/"+splits[11]+"/"+splits[12]);
  };
  return (
  <div class="form-wrapper">
    <form onSubmit={handleSubmit} class="form">
    <label class="form-label">
      :בחר את סוג הפונקציה
      <select value={selectedOption} onChange={handleChange} className="form-select form-select-arrow">
        <option value="">בחר אופציה</option>
        {Object.keys(options).map((option) => (
          <option key={option} value={option}>{options[option]}</option>
        ))}
      </select>
    </label>
    <button type="submit" class="form-submit">הבא</button>
    </form>
  </div>
  );
}
 
export default PickData;