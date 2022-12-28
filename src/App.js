
// importing components from react-router-dom package
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
  
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import HomePageTest from "./components/HomePageTest";
import Register from './components/Register';
import Login from './components/Login';
import './index.css'
import TeacherMenu from './components/TeacherMenu';
// import Classes from './components/Classes'
import OpenClass from './components/OpenClass';
import RemoveClass from './components/RemoveClass';
import EditClass from './components/EditClass';
import RemoveUnit from './components/RemoveUnit';
import RegisterClass from './components/RegisterClass';
import TeacherClasses from './components/TeacherClasses';
import StudentRequestsToClass from './components/StudentRequestsToClass';
import StudentMenu from './components/StudentMenu';
import StudentRegisterToClass from './components/StudentRegisterToClass';
import Form1 from './components/Form1'
import SelectionList from './components/SelectionList';
import SelectionListForm from './components/SelectionListForm';
import UserForm from './React_Step_Form/Components/UserForm'
function App() {

  const styles = `
  #btn1 {
    background-color:'white';
    color:'black';
  }

`;


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




  // return (
  //   <>
  //     {/* This is the alias of BrowserRouter i.e. Router */}
  //     <Router>
  //       <Routes>
  //         {/* This route is for home component 
  //         with exact path "/", in component props 
  //         we passes the imported component*/}
  //         <Route exact path="/" component={Header} />
            
  //         {/* This route is for about component 
  //         with exact path "/about", in component 
  //         props we passes the imported component*/}
  //         <Route path="/login" component={LoginPage} />
            
  //         {/* This route is for contactus component
  //         with exact path "/contactus", in 
  //         component props we passes the imported component*/}
  //         <Route path="/register" component={RegisterPage} />
            
  //         {/* If any route mismatches the upper 
  //         route endpoints then, redirect triggers 
  //         and redirects app to home component with to="/" */}
  //         <Navigate to="/" />
  //       </Routes>
  //     </Router>
  //   </>
  // );

  return (
    
    <Router>
      <div className="App">

        {/* <h1>Home Page</h1>

        <a href='/login'> Login </a>
        <br></br>
        <a href='/register'> Register </a> */}
        <Routes>
          <Route exact path='/' element={
            <HomePageTest></HomePageTest>
            // <div>
            // <h1>Home Page</h1>

            // <a href='/login'> Login </a>
            // <br></br>
            // <a href='/register'> Register </a>
            // <br></br>
            // <a href='/questions'> Questions</a>
            // </div>
          }></Route>
          <Route exact path='/login' element={<Login></Login>}></Route>
          <Route exact path='/register' element={<Register></Register>}></Route>
          <Route exact path='/teacherMenu' element={
            <div>
              <TeacherMenu></TeacherMenu>

              {/* <div  style={{resize: 'both',
              overflow: 'auto',width:'70%',paddingLeft:'20%'}}>
                  <BottomAppBar></BottomAppBar>
              </div> */}

            </div>
            
            
            // <TeacherMenu></TeacherMenu>
          }></Route>
          <Route exact path='/teacherMenu/openclass' element={
          <div>
              <style>
                {styles}
              </style>
              <TeacherMenu btn='btn1'></TeacherMenu>


              
              <h1>Hello</h1>
          </div>
          
          }></Route>

          <Route exact path='/openClass' element={
            <div>
                <TeacherMenu></TeacherMenu>
                <OpenClass></OpenClass>
            </div>
            
          }></Route>

          <Route exact path='/removeClass' element={
            <div>
                <TeacherMenu></TeacherMenu>
                <RemoveClass></RemoveClass>
            </div>
            
          }></Route>

          <Route exact path='/editClass' element={
            <div>
                <TeacherMenu></TeacherMenu>
                <EditClass></EditClass>
            </div>
            
          }></Route>


          <Route exact path='/removeUnit' element={
            <div>
                <TeacherMenu></TeacherMenu>
                <RemoveUnit></RemoveUnit>
            </div>
            
          }></Route>

          <Route exact path='/registerClass' element={
            <div>
                <TeacherMenu></TeacherMenu>
                <RegisterClass></RegisterClass>
            </div>
            
          }></Route>

          <Route exact path='/myClasses' element={
            <div>
                <TeacherMenu></TeacherMenu>
                <TeacherClasses></TeacherClasses>
            </div>
            
          }></Route>

          <Route exact path='/studentsRequestToClass' element={
            <div>
                <TeacherMenu></TeacherMenu>
                <StudentRequestsToClass></StudentRequestsToClass>
            </div>
            
          }></Route>

          
          <Route exact path='/studentRegisterToClass' element={
            <div>
                <StudentMenu></StudentMenu>
                <StudentRegisterToClass></StudentRegisterToClass>
            </div>
            
          }></Route>

          <Route exact path='/form' element={
            <div>
                <TeacherMenu></TeacherMenu>
                <Form1></Form1>
            </div>
            
          }></Route>

          <Route exact path='/list' element={
            <div>
                <TeacherMenu></TeacherMenu>
                <SelectionList></SelectionList>
            </div>
            
          }></Route>

            <Route exact path='/listform' element={
            <div>
                <SelectionListForm></SelectionListForm>
            </div>
            
          }></Route>

          <Route exact path='/userForm' element={
            <div className="App">
              <UserForm />
            </div>
            
          }></Route>





          </Routes>


       
       


      </div>
    </Router>
  );
}

export default App;
