import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import '../css/pickQuestion.css'
import Select from 'react-select';

const PickQuestion = () => {
  const thisURL = window.location.href;
  const splits = thisURL.split('/')
  const options ={'intersection':'נקודות חיתוך עם הצירים','minMaxPoints':'נקודות קיצון','incDec':'תחומי עלייה וירידה'}

  const [selectedOptions, setSelectedOptions] = useState([]);
  //const history = useHistory();
  // const [teacherName, setTeacherName] = useState('');
  const [className, setClassName] = useState(splits[4]);


  // const handleChange = (event) => {
  //   const selectedOption = event.target.value;
  //   setSelectedOptions(prevSelectedOptions => {
  //     if (prevSelectedOptions.includes(selectedOption)) {
  //       // If the selected option is already in the array, remove it
  //       return prevSelectedOptions.filter(option => option !== selectedOption);
  //     } else {
  //       // Otherwise, add it to the array
  //       return [...prevSelectedOptions, selectedOption];
  //     }
  //   });
  // };

  const handleChange = (selectedOptions) => {
    console.log(selectedOptions)
    setSelectedOptions(selectedOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('paremeters sent')
    const selectedOptionsToUrl = selectedOptions.map(val=>val.value)
    window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/openUnit/"+splits[6]+"/parameters/"+selectedOptionsToUrl
    +"/"+splits[8]+"/"+splits[9]+"/"+splits[10]+"/"+splits[11]+"/"+splits[12]+"/"+splits[13]);
  };
  return (
    <div className="form-wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label">:בחר את נושאי יחידת הלימוד</label>
        <Select
          className="form-select"
          options={Object.keys(options).map((option) => ({
            value: option,
            label: options[option],
          }))}
          isMulti={true}
          isRtl={true}
          value={selectedOptions}
          onChange={handleChange}
          placeholder={"בחר מהרשימה"}
        />
        <button className="form-submit" type="submit">
          הבא
        </button>
      </form>
    </div>
  );
}
 
export default PickQuestion;