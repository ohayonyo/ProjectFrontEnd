import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import '../css/pickData.css'
import Select from 'react-select';
//
const PickData = () => {
  const thisURL = window.location.href;
  const splits = thisURL.split('/')
  const options ={'linear':'פונקציה ליניארית', 'quadratic':'פונקציה ריבועית','polynomial':'פונקצית פולינום', 'sin':'פונקצית סינוס','cos':'פונקצית קוסינוס','tan':'פונקצית טנגנס','cot':'פונקצית קוטנגנס','log':'פונקצית ln','eexp':'פונקציה מעריכית בבסיס e'
,'2exp':'פונקציה מעריכית בבסיס 2','3exp':'פונקציה מעריכית בבסיס 3','root':'פונקצית שורש','3root':'פונקצית שורש שלישי'

}

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
  <div className="form-wrapper" style={{marginTop:-30}}>
    <form onSubmit={handleSubmit} className="form1" style={{marginTop:-80}}>
    <label className='header' style={{fontSize:20,marginTop:90}}>
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

    <button style={{position:'relative',zIndex:0,marginTop:-20}} type="submit" className="form-submit">הבא</button>
    {isErrorAccured && <label style={{ color: 'red',fontSize:20,marginTop:'1%' }}>בחר מה סוג הפונקציה</label>}

    </form>
  </div>
  );
}
 
export default PickData;