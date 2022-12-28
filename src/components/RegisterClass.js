import { useState } from "react";
import '../css/openclass.css'

const RegisterClass = () => {
  // const [teacherName, setTeacherName] = useState('');
  const [studentName,setStudentName] = useState('');
  const [className, setClassName] = useState('');

  return (
    <div className="create">
      <h2>רישום לכיתה</h2>
      <form>
        <div style={{marginLeft:275,fontSize:20}}>
          <label>:שם התלמיד</label>
          <label style={{marginTop:20}}>:שם הכיתה</label>
        </div>
       
       
        <div >
          <input
            required
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            style={{marginRight:0,position:'relative',top:-88,right:-70,height:30,width:200}}
          ></input>

          <input
            required
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            style={{marginRight:0,position:'relative',top:-78,right:-70,height:30,width:200}}
          ></input>
        </div>
        
        <div style={{marginTop:-50}}>
          <button>הרשמה</button>
        </div>
        
      </form>
    </div>
  );
}
 
export default RegisterClass;