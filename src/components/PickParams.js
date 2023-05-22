import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import '../css/PickParams.css'
import { MyRange } from './MyRange';
import ReactList from 'react-list';

const dict ={"quadratic":3,"linear":2,"trigonometric":4,"polynomial":4}
const PickParams = () => {
  const thisURL = window.location.href;
  const temp = thisURL.split('?')
  const splits = temp[0].split('/')


  const [func_type,setFunc_type] = useState(splits[9])
  
  const [numInputs,setNumInputs] = useState(dict[splits[9]]);
  const [minValues, setMinValues] = useState(Array(numInputs).fill(5));
  const [maxValues, setMaxValues] = useState(Array(numInputs).fill(5));
  const [checkboxValues, setCheckboxValues] = useState(Array(numInputs).fill(true));
  const options ={'linear':'פונקציה ליניארית', 'quadratic':'פונקציה ריבועית', 'trigonometric':'פונקציה טריגונומטרית', 'exponential':'פונקציה אקספוננציאלית','polynomial':'פונקצית פולינום'}
  const label = "טווח פרמטרים של "+options[splits[9]];

  const initialState = [-10, 10];
  const [ranges, setRanges] = useState(Array.from({ length: numInputs }, () => initialState));

  const [className, setClassName] = useState(splits[4]);
  const first = (splits[6]=="new") 
  const nname = splits[6]+"n"
  let nameS = splits[10]

  const parseTemp = () =>{
    let res = []
    for (let i = 0; i < ranges.length; i++){
      res.push([ranges[i][0],ranges[i][1]])
    }
    console.log(splits[8]+'_'+splits[9]+'_'+res)
    return splits[8]+'_'+splits[9]+'_'+res
  }
  const fetchData = async () =>{

    const thisURL = window.location.href;
    const temp = thisURL.split('?')

    const splits = temp[0].split('/')
    
    if (!first){
      nameS = nname
    }

    console.log(" in fetchData")
    for (let i = 0; i < splits.length; i++) {
        console.log(''+(i)+splits[i]);
    }

    // console.log('date: '+splits[13].getUTCDate())

    const url = "http://localhost:5000/openUnit?teacher="+splits[3]+"&unitName="+nameS
    +"&className="+splits[4]+"&template="+parseTemp()+"&Qnum="+splits[11]+"&maxTime="+splits[12]
    +"&subDate="+splits[13]+"&first="+first+"&prev="+splits[6]+"&desc="+splits[14]
    console.log(url);
    const response = await fetch(url);
    console.log(response)
    return response.status==200
        
  }
  const handleFinishUnit = async () => {
    const res = await fetchData()
    console.log(res + " in finishUnit")
    for (let i = 0; i < numInputs; i++) {
      let paramName=String.fromCharCode(i+'a'.charCodeAt(0));
      console.log(""+paramName+":"+ranges[i][0]+"->"+ranges[i][1])
    }
    if(res){
       window.location.href = `http://${splits[2]}/${splits[3]}/${splits[4]}/classUnits`;
    }
  };

  const handleAddExercise = async () => {
    const res = await fetchData()
    console.log(res + " in addExercise"+ nameS)
    if(res){
      window.location.href = `http://${splits[2]}/${splits[3]}/${splits[4]}/openUnit/${nameS}/details`;
    }
  };

  const inputElements = [];

  const inputStyle = {
    marginBottom: '10px',
    padding: '0.5 rem',
    fontSize: '1.2rem',
    borderRadius: '5px',
    border: '1px solid gray',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
    outline: 'none',
    width: '250px',
    height:'35px',
    color: 'black'
  };



  // for (let i = 0; i < numInputs; i++) {
  //   let paramName=String.fromCharCode(i+'a'.charCodeAt(0));
  //   inputElements.push(
  //     <div key={i}>
  //       <label className='label'>
  //         {paramName} :
  //         <input type="number" name="min" value={minValues[i]} onChange={(event) => handleChangeMin(event, i)} />
  //         <input type="number" name="max" value={maxValues[i]} onChange={(event) => handleChangeMax(event, i)} />
  //       </label>
  //     </div>
  //   );
  // }

  for (let i = 0; i < numInputs; i++) {
    let paramName=String.fromCharCode(i+'a'.charCodeAt(0));
    inputElements.push(
      <div key={i}>
        <div>
          <div style={{width:'200%',marginRight:200,marginTop:'-10%'}}>
            <MyRange paramName={paramName} ranges={ranges} setRanges={setRanges} index={i}></MyRange>
          </div>
        </div>   
      </div>
    );
  }

  if(func_type==="polynomial"){
    return(
      <div>
        <div className='container' style={{marginTop:200,height:400}}>
          <label className='header' style={{fontSize:30}}>פרטי הפולינום</label>

          <label className='label2'>
            :דרגת הפולינום
          <br />
          <input
            className='input_data2'
            type="number"
            // value={qnum}
            onChange={(e) => setNumInputs(e.target.value)}
            style={{ ...inputStyle, textAlign: 'center' }}
            min={1}
          />
          </label>
        </div>

        <button className="form-submit" onClick={()=>setFunc_type("polynomial_cont")}>המשך</button>
    </div>
    )
  }if(func_type!=="polynomial"){
    if(func_type==="polynomial_cont"){
      setRanges(Array.from({ length: numInputs }, () => initialState))
    }
    return (
      <div style={{transform: 'scale(0.65)',marginLeft: '-10%'}}>
            <div className={numInputs>=3 ? "form-container" : "form-container2"} style={{marginTop: numInputs>=3 ? '9.5%' :'17.5%'}}>
              <div className="scrollable-content">
                <h1 className='header'>
                  {label}
                </h1>
  
                {Array.from({ length: numInputs }).map((_, index) => (
                    <div key={index}>
                      <div style={{ width: '200%', marginTop: '-10%',marginLeft:-30 }}>
                        <MyRange paramName={String.fromCharCode(index+'a'.charCodeAt(0))} ranges={ranges} setRanges={setRanges} index={index}></MyRange>
                      </div>
                    </div>
                ))}
  
                <br></br>
  
                <div>
                  <button onClick={handleAddExercise} className="form-submit" style={{transform: 'scale(1.35)',marginBottom:20}}>להוספת תרגילים</button>
                </div>
                <div style={{marginTop:'1.5%'}}>
                  <button onClick={handleFinishUnit} className="form-submit" style={{transform: 'scale(1.35)'}}>לסיום</button>
                </div>
  
              </div>
            </div>
      
      </div>
  
      
    );
  }


  

}
 
export default PickParams;