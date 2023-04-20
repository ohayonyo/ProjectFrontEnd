import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import '../css/pickData.css'
import Select from 'react-select';

const PickQuestion = () => {
  const thisURL = window.location.href;
  const splits = thisURL.split('/')
  const options ={'intersection':'נקודות חיתוך עם הצירים','extremes':'נקודות קיצון','incDec':'תחומי עלייה וירידה'}

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
    console.log(selectedOptions.map(val=>val.value))
    // window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/openUnit/"+splits[6]+"/parameters/"+selectedOptions
    // +"/"+splits[8]+"/"+splits[9]+"/"+splits[10]+"/"+splits[11]+"/"+splits[12]+"/"+splits[13]);
  };
  return (
    <div className="form-wrapper">
      <form
        className="form"
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <label className="form-label">:בחר את נושאי יחידת הלימוד</label>
        <Select
          className="form-select"
          options={Object.keys(options).map((option) => ({
            value: option,
            label: options[option],
          }))}
          isMulti={true}
          value={selectedOptions}
          onChange={handleChange}
        />
        <button className="form-submit" type="submit">
          הבא
        </button>
      </form>
    </div>
  );
}
 
export default PickQuestion;