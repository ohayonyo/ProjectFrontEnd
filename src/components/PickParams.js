import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import '../css/PickParams.css'
import { MyRange } from './MyRange';
import ReactList from 'react-list';

const dict ={"quadratic":3,"linear":2,"trigonometric":4,"polynomial":10}
const PickParams = () => {
  const thisURL = window.location.href;
  const temp = thisURL.split('?')
  const splits = temp[0].split('/')
  
  const numInputs = dict[splits[9]]
  const [minValues, setMinValues] = useState(Array(numInputs).fill(5));
  const [maxValues, setMaxValues] = useState(Array(numInputs).fill(5));
  const [checkboxValues, setCheckboxValues] = useState(Array(numInputs).fill(true));
  const options ={'linear':'פונקציה ליניארית', 'quadratic':'פונקציה ריבועית', 'trigonometric':'פונקציה טריגונומטרית', 'exponential':'פונקציה אקספוננציאלית','polynomial':'פונקצית פולינום'}
  const label = "טווח פרמטרים של "+options[splits[9]];

  const initialState = [-10, 10];
  const [ranges, setRanges] = useState(Array.from({ length: numInputs }, () => initialState));

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  const loadMore = () => {
    if (page * itemsPerPage >= 1000) {
      setHasMore(false);
    } else {
      setTimeout(() => {
        setPage(page + 1);
      }, 2000);
    }
  };

  const renderItems = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const items = [];
    for (let i = startIndex; i < endIndex; i++) {
      items.push(
        <div key={i}>
          <div style={{ width: '200%', marginRight: 200, marginTop: '-10%' }}>
            <MyRange
              paramName={String.fromCharCode(i + 'a'.charCodeAt(0))}
              ranges={ranges}
              setRanges={setRanges}
              index={i}
            />
          </div>
        </div>
      );
    }

    return items;
  };
  
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
        </div>   
      </div>
    );
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
                    <div style={{ width: '200%', marginTop: '-10%' }}>
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

//   return (
//   <div style={{ marginTop: numInputs === 3 ? '9.5%' : '20%', transform: 'scale(0.65)', width: '120%', height: numInputs === 3 ? '100%' : '120%', marginLeft: '-10%' }}>
//     <div className="form-container" style={{ height: 'calc(600px)'}}>
//       <h1 className='header'>
//         {label}
//       </h1>
//       <div style={{ maxHeight: 'calc(500px)', overflowY: 'auto' }}>
//         <ReactList
//           itemRenderer={(index, key) => (
//             <div key={key}>
//               <div>
//                 <div style={{ width: '200%', marginRight: 200, marginTop: '-10%' }}>
//                   <MyRange paramName={String.fromCharCode(index + 'a'.charCodeAt(0))} ranges={ranges} setRanges={setRanges} index={index}></MyRange>
//                 </div>
//               </div>
//             </div>
//           )}
//           length={numInputs}
//           type="uniform"
//           pageSize={3}
//         />
//       </div>
//       <br />
//       <div>
//         <button onClick={handleAddExercise} className="form-submit" style={{ transform: 'scale(1.35)', marginBottom: 20 }}>להוספת תרגילים</button>
//       </div>
//       <div style={{ marginTop: '1.5%' }}>
//         <button onClick={handleFinishUnit} className="form-submit" style={{ transform: 'scale(1.35)' }}>לסיום</button>
//       </div>
//     </div>
//   </div>
// );
}
 
export default PickParams;