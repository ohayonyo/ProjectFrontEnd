import React from 'react'

const TeacherToolbar = ({btn}) => {

  function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
  }
   
  function w3_close(name) {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
  
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');
    const btn4 = document.getElementById('btn4');
  
    const buttons = [btn1,btn2,btn3,btn4]
    const button_names=['btn1','btn2','btn3','btn4']
  
    for (let i = 0; i < buttons.length; i++) {
      if(button_names[i]==name){
        buttons[i].style.backgroundColor = 'white';
        buttons[i].style.color = 'black';
      }else{
        buttons[i].style.color='white';
        buttons[i].style.background = "#c8a970";
      }
    }
  
  }




  const style_menu_labels = {textAlign:'right',marginTop:0,marginBottom:0,fontSize:'3vh'};
  return (
    <div>
      {/* <h1>{btn}</h1> */}
       <nav class="w3-sidebar w3-mycolor w3-collapse w3-top w3-large w3-padding style1" style={{position:'fixed',right:0,top:0,width:'15%'}} id="mySidebar">
        <br></br>
        <a href="javascript:void(0)" onClick={()=>w3_close('1')} class="w3-button w3-hide-large w3-display-topleft style2" style={{fontSize:'4.5vh'}}>סגור תפריט</a>
        <div style={{textAlign:'center'}}>
          <div>
            <h3 class="w3-padding-64"><b style={{textAlign:'center',fontSize:'3.5vh'}}>𝑀𝒶𝓉𝒽𝑒𝓂𝒶𝓉𝒾𝒸𝒳<br></br></b></h3>
          </div>
          <div class="w3-bar-block" style={{fontSize:'20px',marginTop:'-10%'}}>
            <a href="/openClass" onClick={()=>w3_close('btn1')} class="w3-bar-item w3-button w3-hover-white w3-click-white" id="btn1" ><p style={style_menu_labels}>פתיחת כיתה</p></a> 
            <a href="/myClasses" onClick={()=>w3_close('btn2')} class="w3-bar-item w3-button w3-hover-white w3-click-white" id="btn2"> <p style={style_menu_labels}>הכיתות שלי</p></a> 
            <a href="/studentsRequestToClass" onClick={()=>w3_close('btn3')} class="w3-bar-item w3-button w3-hover-white w3-click-white" id="btn3"><p style={style_menu_labels}>בקשות רישום לכיתות</p></a> 
            <a href="/studentsRequestToClass" onClick={()=>w3_close('btn4')} class="w3-bar-item w3-button w3-hover-white w3-click-white" id="btn4"><p style={style_menu_labels}>הוספת יחידת לימוד</p></a> 
          </div>
        </div>
       
      </nav>

        {/* Top menu on small screens */}
      <header class="w3-container w3-top w3-hide-large w3-mycolor w3-xlarge w3-padding">
        <a href="javascript:void(0)" class="w3-button w3-mycolor w3-margin-right" style={{position:'fixed',right:0,top:0}} onClick={w3_open}>☰</a>
        <span>𝑀𝒶𝓉𝒽𝑒𝓂𝒶𝓉𝒾𝒸𝒳</span>
      </header>



       {/* Overlay effect when opening sidebar on small screens */}
       <div class="w3-overlay w3-hide-large" onClick={()=>w3_close('2')} style={{cursor:'pointer'}} title="close side menu" id="myOverlay"></div>

    </div>
  )
}

export default TeacherToolbar