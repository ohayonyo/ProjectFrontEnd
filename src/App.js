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
import EditUnit from './components/EditUnit';
import UnitStats from './components/UnitStats';
import StudentStats from './components/StudentStats';
import QuestionReview from './components/QuestionReview';

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
// import HorizontalLinearStepper from './components/stepper/HorizontalLinearStepper';
// import Stepper from './components/stepper/HorizontalLinearStepper';
import Stepper from 'react-stepper-horizontal';

import Select from 'react-select';


import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { useState } from 'react';
import MySelect from './components/MySelect';
import ListOfLoginUsers from './components/ListOfLoginUsers';
import { Tmln } from './components/Tmln';
import CommonQuestions from './components/CommonQuestions';


function App() {

  const [textInput,setTextInput] = useState("");

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
  { value: 'chocolate', label: 'Chocolate1' },
  { value: 'strawberry', label: 'Strawberry1' },
  { value: 'vanilla', label: 'Vanilla1' }
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



  return (
    
    <Router>
      <div className="App">

        <Routes>
          <Route exact path='/' element={
            <HomePageTest></HomePageTest>

          }></Route>
          <Route exact path='/login' element={<Login></Login>}></Route>

          <Route exact path='/commonquestions' element={
            <CommonQuestions></CommonQuestions>
          }></Route>

          <Route path="/:username/studentMenu" element={
            <div>
                <ValidateStudent></ValidateStudent>
                <StudentMenu></StudentMenu>
                <StudentClasses></StudentClasses>
            </div>
          }>

        </Route>

          <Route path="/:username/teacherMenu" element={
            <div>
                <ValidateTeacher></ValidateTeacher>
                <TeacherMenu></TeacherMenu>
                <TeacherClasses></TeacherClasses>
            </div>
          }></Route>

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
          <Route exact path='/:username/:className/:unitName/editUnit' element={
            <div className='background5' style={{zIndex:-1}}>
            <TeacherMenu></TeacherMenu>

            <div style={{zIndex:2}}>
                <div style={{transform: 'scale(0.8)',marginTop:'-1%',marginLeft:'-10%'}}>
                <EditUnit></EditUnit>
                </div>
            </div>

            </div>

          }></Route>
          <Route exact path='/:username/:className/:unitName/unitStats' element={
            <div>
                <TeacherMenu></TeacherMenu>
                <UnitStats></UnitStats>
            </div>
            
            
          }></Route>
          
          <Route exact path='/:username/:className/:unitName/:studentName/studentStats' element={
            <div>
                <TeacherMenu></TeacherMenu>
                <StudentStats></StudentStats>
            </div>
            
            
          }></Route>

          <Route exact path='/:username/:className/:unitName/:studentName/:correct/questionReview' element={
            <div>
                <TeacherMenu></TeacherMenu>
                <QuestionReview></QuestionReview>
            </div>
            
            
          }></Route>


          
          <Route exact path='/:username/:className/openUnit/:prev/data/:name/:qnum/:timeLimit/:dueDate/:desc' element={
            <div className='background5' style={{zIndex:-1}}>
              <TeacherMenu></TeacherMenu>
              
              <div style={{zIndex:2,marginTop:28}}>

                  <div style={{width:'50%',position:'relative',left:'20%',transform: 'scale(0.8)',zIndex:1}}>
                    <Stepper circleTop={'20%'} 
                    size={40}
                    steps={ [{title: 'פרטי יחידת הלימוד'},{title: 'סוג הפונקציה'}, {title: 'נושאי היחידה'}, {title: 'ערכי פרמטרים'}] } activeStep={1} />
                    </div>
                 
                  <div style={{transform: 'scale(1)',marginTop:'-15%',marginLeft:'-10%'}}>
                    <PickData></PickData>
                  </div>
                  
              </div>

            </div>
              
          }></Route>

          <Route exact path='/:username/:className/openUnit/:prev/question/:dataS/:name/:qnum/:timeLimit/:dueDate/:desc' element={
              
            <div className='background5' style={{zIndex:-1}}>
              <TeacherMenu></TeacherMenu>
              
              <div style={{zIndex:2,marginTop:28}}>

                  <div style={{width:'50%',position:'relative',left:'20%',transform: 'scale(0.8)',zIndex:2}}>
                    <Stepper circleTop={'20%'} 
                    size={40}
                    steps={ [{title:'פרטי יחידת הלימוד'},{title: 'סוג הפונקציה'}, {title: 'נושאי היחידה'}, {title: 'ערכי פרמטרים'}] } activeStep={2} />
                    </div>
                 
                  <div style={{transform: 'scale(1)',marginTop:'-15%',marginLeft:'-10%'}}>
                    <PickQuestion></PickQuestion>
                  </div>
                  
              </div>

            </div>
  
          }></Route>
          <Route exact path='/:username/:className/openUnit/:prev/parameters/:questionS/:dataS/:name/:qnum/:timeLimit/:dueDate/:desc' element={
            
            <div className='background5' style={{zIndex:-1}}>
              <TeacherMenu></TeacherMenu>
              
              <div style={{zIndex:2,marginTop:28}}>

                  <div>
                    {/* <div style={{width: 510,height: 100,backgroundColor:'red',marginLeft:300}}></div> */}

                    <div style={{width:'50%',position:'relative',left:'20%',transform: 'scale(0.8)',zIndex:2}}>
                      <Stepper circleTop={'20%'} 
                      size={40}
                      steps={ [{title: 'פרטי יחידת הלימוד'},{title: 'סוג הפונקציה'}, {title: 'נושאי היחידה'}, {title: 'ערכי פרמטרים'}] } activeStep={3} />
                    </div>

                  </div>
                 
                  <div style={{width:'50%',position:'relative',transform: 'scale(0.8)',marginLeft:'20%',marginTop:'-20%'}}>
                    <PickParams></PickParams>
                  </div>
                  <br></br>
                  <br></br>
              </div>

            </div>
                        
          }></Route>

          <Route exact path='/:username/:className/openUnit/:prev/details' element={


            <div className='background5' style={{zIndex:-1}}>
            <TeacherMenu></TeacherMenu>

            <div style={{zIndex:2,marginTop:0}}>


            
                <div style={{width:'50%',position:'relative',left:'20.3%',transform: 'scale(0.8)',position:'relative',zIndex:3}}>
                  <Stepper circleTop={'15%'} 
                  size={40}
                  steps={ [{title: 'פרטי יחידת הלימוד'},{title: 'סוג הפונקציה'}, {title: 'נושאי היחידה'}, {title: 'ערכי פרמטרים'}] } activeStep={0} />
                  </div>
              
                <div style={{transform: 'scale(0.6)',marginTop:'-10%',marginLeft:'-10%'}}>
                <PickDetails></PickDetails>
                </div>
                
            </div>

            </div>
            
          }></Route>

          <Route exact path='/removeUnit' element={
            <div>
                <TeacherMenu></TeacherMenu>
                <RemoveUnit></RemoveUnit>
            </div>
            
          }></Route>


          <Route exact path='/selection' element={
            <div>
              <MySelect></MySelect>
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
             <Route exact path='/:username/teacherMenu/logingStudents' element={
            <div>
                <TeacherMenu></TeacherMenu>
                <ListOfLoginUsers></ListOfLoginUsers>
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


          <Route exact path='/editable' element={
            <div style={{color:'black'}}>
            <EditText showEditButton style={{color:'black'}} 
            onChange={(e) => setTextInput(e.target.value)}
            value={textInput}
            />

            <h1>{textInput}</h1>

          </div>
            
          }></Route>

            <Route exact path='/:username/studentMenu/studentsRequestToClass' element={
            <div>
                <StudentMenu></StudentMenu>
                <StudentRequestsToClass></StudentRequestsToClass>
            </div>
            
          }></Route>

          <Route exact path='/:username/:unitName/:className/:qnum/QuestionView/:time/:unitNum' element={
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

          
          <Route exact path='/:username/teacherMenu/studentsRegisterToClass' element={
            <div>
                <TeacherMenu></TeacherMenu>
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

          <Route exact path='/stepper' element={
            <div>
              <Stepper steps={ [{title: 'Step One'}, {title: 'Step Two'}, {title: 'Step Three'}, {title: 'Step Four'}] } activeStep={ 0 } />
            </div>
            
          }></Route>

          <Route exact path='/tmln' element={
            <div>
              <Tmln></Tmln>
            </div>
            
          }></Route>

          </Routes>

      </div>
    </Router>
  );
}

export default App;