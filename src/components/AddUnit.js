import { useState } from "react";
import '../css/openclass.css'

const AddUnit = () => {
  // const [teacherName, setTeacherName] = useState('');
  const [className, setClassName] = useState('');

  return (
    <div className="create">
      <h2>הוספת כיתה חדשה</h2>
      <form>
        <div style={{fontSize:20}}>
          <label>:שם המורה</label>
          <label style={{marginTop:20}}>:שם הכיתה</label>
        </div>
       
       
        <div >
          <input
            required
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            style={{marginRight:0,position:'relative',top:-35,right:-90,height:30,width:200}}
          ></input>
        </div>
        
        
        <button>הוסף</button>
      </form>
    </div>
  );
}
 
export default AddUnit;