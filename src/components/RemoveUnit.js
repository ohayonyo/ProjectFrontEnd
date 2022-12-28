import { useState } from "react";
import '../css/openclass.css'

const RemoveUnit = () => {
  // const [teacherName, setTeacherName] = useState('');
  const [unitName,setUnitName] = useState('');
  const [className, setClassName] = useState('');

  return (
    <div className="create">
      <h2>מחיקת יחידת לימוד</h2>
      <form>
        <div style={{fontSize:20}}>
          <label>:שם יחידת הלימוד</label>
          <label style={{marginTop:20}}>:שם הכיתה</label>
        </div>
       
       
        <div >
          <input
            required
            value={unitName}
            onChange={(e) => setUnitName(e.target.value)}
            style={{marginRight:0,position:'relative',top:-88,right:-40,height:30,width:200}}
          ></input>

          <input
            required
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            style={{marginRight:0,position:'relative',top:-78,right:-40,height:30,width:200}}
          ></input>
        </div>
        
        <div style={{marginTop:-50}}>
          <button>מחק</button>
        </div>
        
      </form>
    </div>
  );
}
 
export default RemoveUnit;