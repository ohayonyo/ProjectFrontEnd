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

