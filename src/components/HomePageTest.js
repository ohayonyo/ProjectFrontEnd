// import React from 'react'
import React from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css'

const HomePageTest = () => {
  
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


// Modal Image Gallery
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
}

const styles = `
  body,h1,h2,h3,h4,h5 {
    font-family: "Poppins", sans-serif
  }

  body {
    font-size:16px;
  }

  .w3-half img{
  margin-bottom:-6px;margin-top:16px;opacity:0.8;cursor:pointer
  }
  .w3-half img:hover{
    opacity:1
  }

`;


  
// function hello(){
//   const root = ReactDOM.createRoot(document.getElementById('register_page'));
//   alert("yessssssssssss")
//   root.render(
//     <React.StrictMode>
//     <h1>YESSSSS</h1>
//   </React.StrictMode>
//   );

// }
{
  // let x=5
  // if(x<6){
  //   const root = ReactDOM.createRoot(document.getElementById('root'));
  //   const root2 = ReactDOM.createRoot(document.getElementById('root2'));
  //   root.render(
  //     <React.StrictMode>
  //     <h1>YESSSSS</h1>
  //   </React.StrictMode>
  //   );

  //   root2.render(
  //     <React.StrictMode>
  //     <h1>Hello</h1>
  //   </React.StrictMode>
  //   );
  // }
    
}
const style_menu_labels = {textAlign:'right',marginTop:0,marginBottom:0,fontSize:'3vh'};
  return (
    <div>
      {/* <style scoped>
        {styles}
      </style> */}
      {/* Sidebar/menu */}
      <nav class="w3-sidebar w3-mycolor w3-collapse w3-top w3-large w3-padding style1" style={{position:'fixed',right:0,top:0,width:'15%'}} id="mySidebar">
        <br></br>
        <a href="javascript:void(0)" onClick={()=>w3_close('1')} class="w3-button w3-hide-large w3-display-topleft style2" style={{fontSize:'4.5vh'}}>סגור תפריט</a>
        <div style={{textAlign:'center'}}>
          <div>
            <h3 class="w3-padding-64"><b style={{textAlign:'center',fontSize:'3.5vh'}}>𝑀𝒶𝓉𝒽𝑒𝓂𝒶𝓉𝒾𝒸𝒳<br></br></b></h3>
          </div>
          <div class="w3-bar-block" style={{fontSize:'20px',marginTop:'-10%'}}>
            <a href="#" onClick={()=>w3_close('btn1')} class="w3-bar-item w3-button w3-hover-white w3-click-white" id="btn1" ><p style={style_menu_labels}>דף הבית</p></a> 
            <a href="#commonquestions" onClick={()=>w3_close('btn2')} class="w3-bar-item w3-button w3-hover-white w3-click-white" id="btn2"> <p style={style_menu_labels}>שאלות נפוצות</p></a> 
            <a href="/login" onClick={()=>w3_close('btn3')} class="w3-bar-item w3-button w3-hover-white w3-click-white" id="btn3"><p style={style_menu_labels}>התחברות</p></a> 
            {/* <a href="/register" onClick={()=>w3_close('btn4')} class="w3-bar-item w3-button w3-hover-white w3-click-white" id="btn4"><p style={style_menu_labels}>הרשמה</p></a>  */}
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

       {/* PAGE CONTENT */}
      <div >

          {/* Header */}
        <div  style={{textAlign:'center',marginRight:'20%'}}>
          <h1 class="w3-jumbo"><b style={{fontSize:'7vh'}}>MathematicX-ברוכים הבאים ל</b></h1>

          <br></br>
          <h1 class="w3-xxxlarge w3-text-mycolor"><b style={{fontSize:'5.5vh'}}>?מי אנחנו</b></h1>
          <div style={{fontWeight:'bold',fontSize:20,textAlign:'right'}}>
            <p>האתר הינו כלי חינוכי למורים המעודד יצירתיות בקרב התלמידים בכך שהוא מאפשר להם ליצור בעיות מתמטיות משלהם. המערכת יכולה לעזור למורה לעקוב אחר התקדמות השיפור של התלמידים. בנוסף, המערכת יכולה לעזור לתלמידים לשפר את כישורי המתמטיקה שלהם על ידי יצירת השאלות עליהן לא הצליחו לענות עם נתונים שונים</p>
            {/* <a>.האתר הינו כלי חינוכי למורים המעודד יצירתיות בקרב התלמידים בכך שהוא מאפשר להם ליצור בעיות מתמטיות משלהם</a>
            <br></br>
            <a>.המערכת יכולה לעזור למורה לעקוב אחר התקדמות השיפור של התלמידים</a>
            <br></br>
            <a>.בנוסף, המערכת יכולה לעזור לתלמידים לשפר את כישורי המתמטיקה שלהם על ידי יצירת השאלות עליהן לא הצליחו לענות עם נתונים שונים</a> */}
          </div>
          
        </div>

      
      {/* Common questions */}
      <div class="w3-container" id="commonquestions" style={{textAlign:'center',marginRight:'20%'}}>
        <h1 class="w3-xxxlarge w3-text-mycolor"><b style={{fontSize:'5.5vh'}}>שאלות נפוצות</b></h1>
        <p style={{fontWeight:'bold',fontSize:20,textAlign:'right'}}>כאן יופיעו שאלות נפוצות להתמצאות</p>
      </div>


      </div>

      
    </div>
    
  )
}

export default HomePageTest