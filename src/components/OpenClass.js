import { useState } from "react";
import '../css/openclass.css'

const OpenClass = () => {
  // const [teacherName, setTeacherName] = useState('');
  const [className, setClassName] = useState('');

  const fetchData = async ()=> {

      const url = window.location.href;
      const myArray = url.split("/");
      const userName= myArray[3];
      const target='http://mathematix.duckdns.org:5000/openClass?teacher=' + userName + '&className='+className;
      await fetch(target);
      
  }
  



  return (
    <div className="create">
      <h2>הוספת כיתה חדשה</h2>
      <form>
        <div style={{fontSize:20}}>
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
        
        
        <button onClick={fetchData}>הוסף</button>
      </form>
    </div>
  );
}

 
export default OpenClass;