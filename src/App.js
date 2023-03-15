
// importing components from react-router-dom package
import {BrowserRouter as Router, Route,Routes,useParams} from 'react-router-dom'
  
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
import ClassUnits from './components/ClassUnits';
import PickData from './components/PickData';
import PickQuestion from './components/PickQuestion';
import PickParams from './components/PickParams';
import PickDetails from './components/PickDetails';

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
import SingleSelection from './components/selectionElements/SingleSelection';
import MutlipleSelection from './components/selectionElements/MutlipleSelection';
// import MultiStep from './components/templateForm/MultiStep';
import CreateUnitForm from './components/templateForm/CreateUnitForm';
import QuestionView from './components/QuestionsView';
import StudentClasses from './components/StudentClasses';
import StudentClassUnits from './components/StudentClassUnits';
import GradeAfterUnit from './components/GradeAfterUnit';

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




const studentMenuPage = new RegExp('^[a-zA-Z][a-zA-Z0-9]*/studentMenu$');

const teacherMenuPage = new RegExp('^[a-zA-Z][a-zA-Z0-9]*/teacherMenu$');

const regex = "/^(a|b).*/"

const idRegex = '([0-9a-zA-Z]*)';

const options1 = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]


function ValidateStudent(){
  let params = useParams();
  let userId = params.username.match(/[a-zA-Z0-9]+/);
  if (!userId) {
    return <div><h1>page not found</h1></div>
  }
  return <StudentMenu userName={params.username}></StudentMenu>;
}


function ValidateTeacher(){
  let params = useParams();
  let userId = params.username.match(/[a-zA-Z0-9]+/);
  if (!userId) {
    return <div><h1>page not found</h1></div>
  }
  return <TeacherMenu></TeacherMenu>;
}



// function App() {
//   return (
//     <Routes>
//       <Route path="/users/:id" element={<ValidateUser />} />
//       <Route path="/users/*" element={<NotFound />} />
//     </Routes>
//   );
// }

// function ValidateUser() {
//   let params = useParams();
//   let userId = params.id.match(/\d+/);
//   if (!userId) {
//     return <NotFound />;
//   }
//   return <User id={params.userId} />;
// }

// function User(props) {
//   let id = props.id;
//   // ...
// }



{/* <Route path={`/-${idRegex}`} component={Home} /> */}



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

          <Route path="/:username/studentMenu" element={<ValidateStudent></ValidateStudent>}></Route>

          <Route path="/:username/teacherMenu" element={<ValidateTeacher></ValidateTeacher>}></Route>

          <Route exact path='/register' element={<Register></Register>}></Route>
          <Route exact path='/studentMenu' element={
            <div>
              <TeacherMenu></TeacherMenu>

              {/* <div  style={{resize: 'both',
              overflow: 'auto',width:'70%',paddingLeft:'20%'}}>
                  <BottomAppBar></BottomAppBar>
              </div> */}

            </div>
            
            
            // <TeacherMenu></TeacherMenu>
          }></Route>
          <Route path='/openclass' element={
          <div>
              <style>
                {styles}
              </style>
              <TeacherMenu btn='btn1'></TeacherMenu>


              
              <h1>Hello</h1>
          </div>
          
          }></Route>

          <Route exact path='/:username/teacherMenu/openClass' element={
            <div>
                <TeacherMenu></TeacherMenu>
                <OpenClass></OpenClass>
            </div>
            
          }></Route>

          <Route exact path='/:username/teacherMenu/removeClass' element={
            <div>
                <TeacherMenu></TeacherMenu>
                <RemoveClass></RemoveClass>
            </div>
            
          }></Route>

          <Route exact path='/:username/:className/editClass' element={
            <div>
                <TeacherMenu></TeacherMenu>
                <EditClass></EditClass>
            </div>
            
          }></Route>
          <Route exact path='/:username/:className/classUnits' element={
            <div>
                <TeacherMenu></TeacherMenu>
                <ClassUnits></ClassUnits>
            </div>
            
            
          }></Route>
          
          <Route exact path='/:username/:className/openUnit/:prev/data' element={
            <div>
                <TeacherMenu></TeacherMenu>
                <div className='background2'>
                  <PickData></PickData>
                </div>
            </div>
            
            
          }></Route>

          <Route exact path='/:username/:className/openUnit/:prev/question/:dataS' element={
            <div>
                <TeacherMenu></TeacherMenu>
                <PickQuestion></PickQuestion>
            </div>
            
            
          }></Route>
          <Route exact path='/:username/:className/openUnit/:prev/parameters/:dataS/:questionS' element={
            <div>
                <TeacherMenu></TeacherMenu>
                <PickParams></PickParams>
            </div>
            
            
          }></Route>

          <Route exact path='/:username/:className/openUnit/:prev/details/:template' element={
            <div>
                <TeacherMenu></TeacherMenu>
                <PickDetails></PickDetails>
            </div>
            
            
          }></Route>

          <Route exact path='/removeUnit' element={
            <div>
                <TeacherMenu></TeacherMenu>
                <RemoveUnit></RemoveUnit>
            </div>
            
          }></Route>

          <Route exact path='/:username/teacherMenu/registerClass' element={
            <div>
                <TeacherMenu></TeacherMenu>
                <RegisterClass></RegisterClass>
            </div>
            
          }></Route>

          <Route exact path='/:username/teacherMenu/myClasses' element={
            <div>
                <TeacherMenu></TeacherMenu>
                <TeacherClasses></TeacherClasses>
            </div>
            
          }></Route>
          <Route exact path='/:username/studentMenu/myClasses' element={
            <div>
                <StudentMenu></StudentMenu>
                <StudentClasses></StudentClasses>
            </div>
            
          }></Route>

          <Route exact path='/:username/:class/studentClassUnits' element={
            <div>
                <StudentMenu></StudentMenu>
                <StudentClassUnits></StudentClassUnits>
            </div>
            
          }></Route>

          <Route exact path='/:username/teacherMenu/studentsRequestToClass' element={
            <div>
                <TeacherMenu></TeacherMenu>
                <StudentRequestsToClass></StudentRequestsToClass>
            </div>
            
          }></Route>

          <Route exact path='/:username/:unitName/:className/:qnum/QuestionView' element={
            <div>
                <StudentMenu></StudentMenu>
                <QuestionView></QuestionView>
            </div>
            
          }></Route>

          <Route exact path='/QuestionView' element={
            <div>
                <StudentMenu></StudentMenu>
                <QuestionView></QuestionView>
            </div>
            
          }></Route>

          <Route exact path='/:username/:unitName/:className/getGrade' element={
            <div>
                <StudentMenu></StudentMenu>
                <GradeAfterUnit></GradeAfterUnit>
            </div>
            
          }></Route>

          <Route exact path='/getGrade' element={
            <div>
                <StudentMenu></StudentMenu>
                <GradeAfterUnit></GradeAfterUnit>
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

          
          <Route exact path='/selectionSingle' element={
            <div>
              <SingleSelection options={options1}></SingleSelection>
              <MutlipleSelection options={options1}></MutlipleSelection>
            </div>
            
          }></Route>

          <Route exact path='/createUnitForm' element={
            <div>
              <CreateUnitForm></CreateUnitForm>
            </div>
            
          }></Route>



          </Routes>


       
       


      </div>
    </Router>
  );
}

export default App;
