import React, { useState } from "react";
import ReactDOM from "react-dom";
import MultiStep from "react-multistep";
import Select from 'react-select';
// import ReactScrollableList from 'react-scrollable-list';
import ItemsList from "./ItemsList/ItemsList";
// import SingleSelection from "../selectionElements/SingleSelection";
// import { StepOne } from "./step-one";
// import { StepTwo } from "./step-two";
// import { StepThree } from "./step-three";
// import { StepFour } from "./step-four";

// import "./prog-track.css";
// import "./styles.css";


const CreateUnitForm = () => {
  const [checked1,setChecked1] = useState(null);
  const [checked2,setChecked2] = useState(null);

  const SingleSelection = ({options,isDisabled,func,checkedNumber}) => {
    
    // func();
    
    if(checkedNumber===1){
      return (
        <>
          <Select
            className="basic-single"
            classNamePrefix="select"
            // defaultValue={options[0]}
            isDisabled={isDisabled}
            isLoading={false}
            isClearable={true}
            isRtl={true}
            isSearchable={true}
            name="color"
            options={options}
            required={true}
            value={checked1}
            onChange={(e)=>setChecked1(e)}
  
          />
    
        </>
      );
    }else if(checkedNumber===2){
      return (
        <>
          <Select
            className="basic-single"
            classNamePrefix="select"
            // defaultValue={options[0]}
            isDisabled={isDisabled}
            isLoading={false}
            isClearable={true}
            isRtl={true}
            isSearchable={true}
            name="color"
            options={options}
            required={true}
            value={checked2}
            onChange={(e)=>setChecked2(e)}
  
          />
    
        </>
      );
    }
    
  }

  const options1 = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry'},
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const optionsPage3_chocolate = [
    { value: 'chocolate1', label: 'Chocolate1' },
    { value: 'strawberry1', label: 'Strawberry1'},
    { value: 'vanilla1', label: 'Vanilla1' }
  ]

  const optionsPage3_strawberry = [
    { value: 'chocolate2', label: 'Chocolate2' },
    { value: 'strawberry2', label: 'Strawberry2'},
    { value: 'vanilla2', label: 'Vanilla2' }
  ]

  const optionsPage3_vanilla = [
    { value: 'chocolate3', label: 'Chocolate3' },
    { value: 'strawberry3', label: 'Strawberry3'},
    { value: 'vanilla3', label: 'Vanilla3' }
  ]


  const Page1 = ()=>{
    setChecked2(null);
    return(
      <div style={{marginRight:400,marginBottom:40}}><SingleSelection options={options1} isDisabled={false} func={nothing} checkedNumber={1}></SingleSelection></div>
    );

  }


  // const [minValues, setMinValues] = useState([]);
  // const [maxValues, setMaxValues] = useState([]);

  
  const Page2 = () =>{

    const [minValues, setMinValues] = useState([0,0,0,0]);
    const [maxValues, setMaxValues] = useState([0,0,0,0]);


    if(checked1===null){
      return(
        <div>
          <h1>Must fill first page selection field</h1>
        </div>
      );
    }else if(checked1.value==='chocolate'){ 
      console.log('minValues:'+minValues); 
      return(
        [<div>
            <ItemsList minValues={minValues} setMinValues={setMinValues} maxValues={maxValues} setMaxValues={setMaxValues} />
        </div>,minValues]
      );
    }
}

  

  const Page3 = ()=>{
    // console.log('minValues:'+minValues);
    // console.log('maxValues:'+maxValues);
    // console.log('checked1='+checked1);
      if(checked1===null){
        return(
          <div>
            <h1>Must fill first page selection field</h1>
          </div>
        );
      }else if(checked1.value==='chocolate'){
        return(
          <div>
            <SingleSelection options={optionsPage3_chocolate} isDisabled={false} func={nothing} checkedNumber={2}></SingleSelection>
        </div>
        );
      }else if(checked1.value==='strawberry'){
        return(
          <div>
            <SingleSelection options={optionsPage3_strawberry} isDisabled={false} func={nothing} checkedNumber={2}></SingleSelection>
          </div>
        );
      }else if(checked1.value==='vanilla'){
        return(
          <div>
            <SingleSelection options={optionsPage3_vanilla} isDisabled={false} func={nothing} checkedNumber={2}></SingleSelection>
          </div>
        );
      }

  }


  function nothing(){
      
  }



  const steps = [
    { name: "Name A", component: <Page1></Page1> },
    { name: "Email", component: <Page2></Page2> },
    { name: "Password", component:  <div style={{marginRight:400,marginBottom:40}}><Page3></Page3></div> },
    { name: "Agreement", component:  <div><h1>Page4</h1></div> }
  ];


  return (
    <div className="App" style={{marginLeft:400}}>
       <MultiStep activeStep={0} required steps={steps} showTitles={false} stepCustomStyle={null} nextStyle={{position:'fixed',right:'46%'}} prevStyle={{position:'fixed',right:'50%'}}/>  
    </div>
  )
}

export default CreateUnitForm