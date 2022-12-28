import { useState } from "react";
import '../css/openclass.css'

const EditClass = () => {
  // const [teacherName, setTeacherName] = useState('');
  const [className, setClassName] = useState('');
  const [newClassName, setNewClassName] = useState('');

  return (
    <div className="create">
      <h2>עדכון פרטי כיתה</h2>
      <form>
        <div style={{fontSize:20}}>
          <div style={{marginLeft:0}}>
            <label>:שם המורה</label>
            <label style={{marginTop:20}}>:שם הכיתה</label>
            <label style={{marginTop:20}}>:שם חדש לכיתה</label>
          </div>
          
          <div >

            <input
              required
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              style={{marginRight:0,position:'relative',top:-88,right:-70,height:30,width:200}}
            ></input>

            <input
              required
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              style={{marginRight:0,position:'relative',top:-77,right:-70,height:30,width:200}}
            ></input>

          </div>
          

        </div>
        
        
        <button>עדכון</button>
      </form>
    </div>
  );
}
 
export default EditClass;