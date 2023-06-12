import React, { useState,useEffect } from 'react';
//import { useHistory } from 'react-router-dom';
import '../css/PickParams.css'
import { MyRange } from './MyRange';
import ReactList from 'react-list';

const dict ={"quadratic":3,"linear":2,"trigonometric":4,"polynomial":4,"eexp":4,"2exp":4,"3exp":4,"sin":4,"cos":4,"log":4,"tan":4,"cot":4,"root":4,"3root":4}
const PickParams = () => {
  const thisURL = window.location.href;
  const temp = thisURL.split('?')
  const splits = temp[0].split('/')


  const [func_type,setFunc_type] = useState(splits[9])
  const question_types = splits[8].split(',')
  let hasIntegral = false;
  console.log("print question types:")
  for(let i=0;i<question_types.length;i++){
      if(question_types[i] === 'definiteIntegral')
      hasIntegral=true;
      console.log("question_types["+i+"]="+question_types[i])
  }

  console.log("hasIntegral="+hasIntegral)

  console.log("question_types="+question_types)
  
  const [numInputs,setNumInputs] = useState(func_type!=="polynomial" ? dict[splits[9]] : 1);
  const options ={'linear':'פונקציה ליניארית', 'quadratic':'פונקציה ריבועית','polynomial':'פונקצית פולינום', 'sin':'פונקצית סינוס','cos':'פונקצית קוסינוס','tan':'פונקצית טנגנס','cot':'פונקצית קוטנגנס','log':'פונקצית ln','eexp':'פונקציה מעריכית בבסיס e'
,'2exp':'פונקציה מעריכית בבסיס 2','3exp':'פונקציה מעריכית בבסיס 3','root':'פונקצית שורש','3root':'פונקצית שורש שלישי'

}

  const label = "טווח פרמטרים של "+options[splits[9]];

  const initialState = [-10, 10];
  const [ranges, setRanges] = useState(Array.from({ length: hasIntegral ? numInputs + 1 : numInputs}, () => initialState));
  const [degree, setDegree] = useState(0);

  const [className, setClassName] = useState(splits[4]);
  const first = (splits[6]=="new") 
  const nname = splits[6]+"n"
  let nameS = splits[10]
  

  useEffect(() => {
    setRanges(Array.from({ length: hasIntegral ? numInputs + 1 : numInputs}, () => initialState));
  }, [numInputs]);


  const parseTemp = () =>{
    let res = []
    if(hasIntegral){
      let params = []
      for (let i = 0; i < ranges.length-1; i++){
        params.push([ranges[i][0],ranges[i][1]])
      }
      res.push([ranges[ranges.length-1][0],ranges[ranges.length-1][1]])
      console.log(splits[8]+'_'+splits[9]+'_'+params+'_'+res)
      return splits[8]+'_'+splits[9]+'_'+params+'_'+res
    }
    
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

    const url = "http://87.71.64.163:5000/openUnit?teacher="+splits[3]+"&unitName="+nameS
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
    for (let i = 0; i < ranges.length; i++) {
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

  const moveToParamsPage = () => {
    setFunc_type("polynomial_cont")
    // setNumInputs(prevNumInputs => prevNumInputs + 1);
  }


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

  if(func_type==="polynomial"){
    return(
      <div>
        <div className='form1' style={{marginTop:100,height:410,width:700,marginLeft:-45}}>
          <label className='header' style={{fontSize:30,marginTop:115}}>פרטי הפולינום</label>

          <label className='label2'>
            :דרגת הפולינום
          <br />
          <input
              className='input_data2'
              type="number"
              value={numInputs - 1}
              onChange={(e) => setNumInputs(parseInt(e.target.value) + 1)}
              style={{ ...inputStyle, textAlign: 'center' }}
              min={0}
            />
          </label>
          <button className="form-submit" onClick={moveToParamsPage}>המשך</button>
        </div>

       
    </div>
    )
  }if(func_type!=="polynomial"){
    if(func_type==="polynomial_cont"){
      // setRanges(Array.from({ length: numInputs }, () => initialState))
    }
    
    return (
      <div style={{transform: 'scale(0.65)',marginLeft: '-10%'}}>
            <div className={numInputs>=3 ? "form-container" : "form-container2"} style={{marginTop: (numInputs>=3 || (numInputs===2 && hasIntegral)) ? -325 : (numInputs===2 && !hasIntegral) || (numInputs==1 && hasIntegral) ? -280 : (numInputs==1 && !hasIntegral) ? -270:-320 ,marginLeft:(numInputs<3 && !hasIntegral) ? -90 : -115,height:(numInputs>=3 || (numInputs===2 && hasIntegral)) ? 900 : (numInputs===2 && !hasIntegral) || (numInputs==1 && hasIntegral) ? 750 : (numInputs===2 && hasIntegral) ? 920 :700,width:1000}}>
              <div className="scrollable-content" style={{marginTop:170}}>
                <h1 className='header'>
                  {label}
                </h1>
  
                {Array.from({ length: numInputs }).map((_, index) => (
                    <div key={index}>
                      <div style={{ width: '200%', marginTop: numInputs>=3 ? '-10%' :'-7%',marginLeft: 65 }}>
                        <MyRange paramName={String.fromCharCode(index+'a'.charCodeAt(0))} ranges={ranges} setRanges={setRanges} index={index}></MyRange>
                      </div>
                    </div>
                ))}

                {hasIntegral && <div style={{width: '200%', marginTop: numInputs>=3 ? '-10%' : '-7%',marginLeft: 65 }}>
                        <MyRange paramName={'Integral range'} ranges={ranges} setRanges={setRanges} index={numInputs}></MyRange>
                      </div>
                  
                }
  
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