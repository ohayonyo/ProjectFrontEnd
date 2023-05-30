import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import '../css/pickQuestion.css'
import Select from 'react-select';

const PickQuestion = () => {
  const thisURL = window.location.href;
  const splits = thisURL.split('/')
  const options ={'intersection':'נקודות חיתוך עם הצירים','minMaxPoints':'נקודות קיצון','incDec':'תחומי עלייה וירידה'
  ,'definiteIntegral':'אינטגרל מסוים','deriveFunc':'נגזרת של הפונקציה','funcValue':'ערך הפונקציה בנקודה'
}

  const [selectedOptions, setSelectedOptions] = useState([]);
  //const history = useHistory();
  // const [teacherName, setTeacherName] = useState('');
  const [className, setClassName] = useState(splits[4]);
  const [isErrorAccured,setIsErrorAccured] = useState(false);



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
    if(selectedOptions.length === 0){
      setIsErrorAccured(true)
      console.log("no option was selected")
    }else{

      const selectedOptionsToUrl = selectedOptions.map(val=>val.value)
      window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/openUnit/"+splits[6]+"/parameters/"+selectedOptionsToUrl
      +"/"+splits[8]+"/"+splits[9]+"/"+splits[10]+"/"+splits[11]+"/"+splits[12]+"/"+splits[13]);
    }
   
  };

  return (
    <div className="form-wrapper" style={{marginTop:-30}}>
      <form className="form1" onSubmit={handleSubmit} style={{marginTop:-80}}>
        <label className='header' style={{fontSize:20,marginTop:90}}>נושאי יחידת הלימוד</label>
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

          styles={{
            menu: (provided) => ({
              ...provided,
              maxHeight: '200px', // Set the maximum height of the dropdown menu
              overflowScrolling: 'touch', // Enable smooth scrolling behavior
            }),
            option: (provided) => ({
              ...provided,
              height: '40px', // Set the height of each menu item
            }),
            menuList: (provided) => ({
              ...provided,
              maxHeight: '200px', // Set the maximum height of the menu list
              overflowScrolling: 'touch', // Enable smooth scrolling behavior
            }),
          }}
        />

        <br></br>
        <button style={{position:'relative',zIndex:0,marginTop:-20}} className="form-submit" type="submit">
          הבא
        </button>
        {isErrorAccured && <label style={{ color: 'red',fontSize:20,marginTop:'1%'}}>בחר לפחות נושא שיעור אחד</label>}

      </form>
    </div>
  );
}
 
export default PickQuestion;