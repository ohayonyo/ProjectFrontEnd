import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import '../css/PickParams.css'
import { MyRange } from './MyRange';
const dict ={"quadratic":3,"linear":2,"trigonometric":4}
const PickParams = () => {
  const thisURL = window.location.href;
  const temp = thisURL.split('?')
  const splits = temp[0].split('/')
  
  const numInputs = dict[splits[9]]
  const [minValues, setMinValues] = useState(Array(numInputs).fill(5));
  const [maxValues, setMaxValues] = useState(Array(numInputs).fill(5));
  const [checkboxValues, setCheckboxValues] = useState(Array(numInputs).fill(true));
  const options ={'linear':'פונקציה ליניארית', 'quadratic':'פונקציה ריבועית', 'trigonometric':'פונקציה טריגונומטרית', 'exponential':'פונקציה אקספוננציאלית'}
  const label = options[splits[9]];

  const initialState = [-20, 0];
  const [ranges, setRanges] = useState(Array.from({ length: numInputs }, () => initialState));
  
  //const history = useHistory();
  // const [teacherName, setTeacherName] = useState('');
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

            {/* <label className='label'>
              {paramName} :
            </label> */}

            

        </div>
        
        
        
      </div>
    );
  }

  return (
    <div style={{marginTop: numInputs === 3 ? '13%' : '20%', transform: 'scale(0.65)', width: '120%', marginLeft: '-10%'}}>
      <div className="form-container">
        <h1>
          {label}
        </h1>
        {inputElements}
        <br></br>
        <div>
          <button onClick={handleAddExercise} className="form-submit">להוספת תרגילים</button>
        </div>
        <div style={{marginTop:'1.5%'}}>
          <button onClick={handleFinishUnit} className="form-submit">לסיום</button>
        </div>
        
      </div>
    </div>
    
  );
}
 
export default PickParams;