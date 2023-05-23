import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import '../css/pickData.css'
import Select from 'react-select';
//
const PickData = () => {
  const thisURL = window.location.href;
  const splits = thisURL.split('/')
  const options ={'linear':'פונקציה ליניארית', 'quadratic':'פונקציה ריבועית', 'trigonometric':'פונקציה טריגונומטרית', 'exponential':'פונקציה אקספוננציאלית','polynomial':'פונקצית פולינום'}
  // const [teacherName, setTeacherName] = useState('');
  const [className, setClassName] = useState(splits[4]);


  const [selectedOption, setSelectedOption] = useState(null);
  const [isErrorAccured,setIsErrorAccured] = useState(false);

  function handleChange(selectedOption) {
    setSelectedOption(selectedOption);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(selectedOption===null){
      setIsErrorAccured(true)
      console.log("no option was selected")
    }else{
      setIsErrorAccured(false)
      console.log('selectedOption=')
      console.log(selectedOption.value)
    // const selectedOptionsToUrl = selectedOptions.map(val=>val.value)
    window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+splits[4]+"/openUnit/"+splits[6]+"/question/"+selectedOption.value
    +"/"+splits[8]+"/"+splits[9]+"/"+splits[10]+"/"+splits[11]+"/"+splits[12]);
    }
    
  };
  return (
  <div class="form-wrapper" style={{marginTop:30}}>
    <form onSubmit={handleSubmit} class="form">
    <label className='header' style={{fontSize:20}}>
      סוג הפונקציה
    </label>

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
    
    <br></br>

    {isErrorAccured && <label style={{ color: 'red',fontSize:20,marginTop:'-7%' }}>בחר מה סוג הפונקציה</label>}

    <button type="submit" class="form-submit">הבא</button>
    </form>
  </div>
  );
}
 
export default PickData;