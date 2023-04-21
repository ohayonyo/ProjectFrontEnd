import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import '../css/pickData.css'
import Select from 'react-select';
//
const PickData = () => {
  const thisURL = window.location.href;
  const splits = thisURL.split('/')
  const options ={'linear':'פונקציה ליניארית', 'quadratic':'פונקציה ריבועית', 'trigonometric':'פונקציה טריגונומטרית', 'exponential':'פונקציה אקספוננציאלית'}
  // const [teacherName, setTeacherName] = useState('');
  const [className, setClassName] = useState(splits[4]);


  const [selectedOption, setSelectedOption] = useState(null);

  function handleChange(selectedOption) {
    setSelectedOption(selectedOption);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('selectedOption=')
    console.log(selectedOption.value)
    // const selectedOptionsToUrl = selectedOptions.map(val=>val.value)
    window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/openUnit/"+splits[6]+"/question/"+selectedOption.value
    +"/"+splits[8]+"/"+splits[9]+"/"+splits[10]+"/"+splits[11]+"/"+splits[12]);
  };
  return (
  <div class="form-wrapper">
    <form onSubmit={handleSubmit} class="form">
    <label class="form-label">
      :בחר את סוג הפונקציה
      <Select
          className="form-select"
          options={Object.keys(options).map((option) => ({
            value: option,
            label: options[option],
          }))}
          isMulti={false}
          isRtl={true}
          value={selectedOption}
          onChange={handleChange}
          placeholder={"בחר מהרשימה"}
        />
    </label>
    <button type="submit" class="form-submit">הבא</button>
    </form>
  </div>
  );
}
 
export default PickData;