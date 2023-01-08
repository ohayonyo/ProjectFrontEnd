import { useState } from "react";
import '../css/openclass.css'

const EditClass = () => {
  const thisURL = window.location.href;
  const splits = thisURL.split('/')
  // const [teacherName, setTeacherName] = useState('');
  const [className, setClassName] = useState(splits[4]);
  const [newClassName, setNewClassName] = useState('');

async function doEdit(){
  const url = "http://localhost:5000/editClass?teacher="+splits[3]+"&className=" + className+"&newClassName=" + newClassName
  const promise = await fetch(url)
    if(promise.status ===200){
      setClassName(newClassName);
      window.location.assign('http://'+splits[2]+"/"+splits[3]+"/"+newClassName+"/editClass");
    }
    else
      console.log("didn't work try again")
}

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
              onChange={() => (console.log('nothing'))}
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
        
        
        <button onClick={()=>doEdit()}>עדכון</button>
      </form>
    </div>
  );
}
 
export default EditClass;