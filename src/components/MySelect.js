import React, { useState } from 'react';
import Select from 'react-select';
//import { useHistory } from 'react-router-dom';
//
const MySelect = () => {
  // const thisURL = window.location.href;
  // const splits = thisURL.split('/')


  // const options = [
  //   { value: "red", label: "Red" },
  //   { value: "green", label: "Green" },
  //   { value: "blue", label: "Blue" },
  //   { value: "yellow", label: "Yellow" },
  // ];

  // const options = {
  //   math: "מתמטיקה",
  //   science: "מדעים",
  //   history: "היסטוריה",
  //   literature: "ספרות",
  // };

  const options ={'intersection':'נקודות חיתוך עם הצירים','extremes':'נקודות קיצון','incDec':'תחומי עלייה וירידה'}

  
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selectedOptions) => {
    console.log(selectedOptions)
    setSelectedOptions(selectedOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/openUnit/"+splits[6]+"/question/"+selectedOption
  //   +"/"+splits[8]+"/"+splits[9]+"/"+splits[10]+"/"+splits[11]+"/"+splits[12]);
  // };


  // return (
  //   <Select
  //     isMulti={true}
  //     name="colors"
  //     options={options}
  //     className="basic-multi-select"
  //     classNamePrefix="select"
  //     isDisabled={false}
  //     isLoading={false}
  //     isClearable={true}
  //     isRtl={true}
  //     isSearchable={true}
  //     value={selectedOptions}
  //     onChange={handleChange}
  //     />
  // );


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
 
export default MySelect;