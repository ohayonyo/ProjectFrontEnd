import { waitFor } from '@testing-library/react';
import React, { useState } from 'react';
import { Await } from 'react-router-dom';
import '../css/login.css'

const Login = () => {
  const [username,setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccessfully,setLoginSuccessfully]= useState(false);
  // const [newDest,setNewDest] = useState('/login');
  let newDest='/login';
  const asyncCallWithTimeout = (asyncPromise, timeLimit) => {};
  const [x,setX] = useState(true);

  const [wrongPasswordOrUserName,setWrongPasswordOrUserName] = useState(false);
  const [userNameIsEmpty,setUserNameIsEmpty] = useState(false);
  const [PasswordIsEmpty,setPasswordIsEmpty] = useState(false);

  function timeoutPromise(timeout, err, promise) {
    return new Promise(function(resolve,reject) {
      promise.then(resolve,reject);
      setTimeout(reject.bind(null,err), timeout);
    });
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}




  const fetchData = async ()=> {
    console.log('username:'+username);
    console.log('password:'+password);

    if(username===''){
      setUserNameIsEmpty(true);
      setWrongPasswordOrUserName(false);
    }

    if(password===''){
      setPasswordIsEmpty(true);
      setWrongPasswordOrUserName(false);
    }

    if(username!==''&&password!==''){
      setUserNameIsEmpty(false);
      setPasswordIsEmpty(false);
      setWrongPasswordOrUserName(false);
      
      console.log("if")
      const urlToFetch='http://localhost:5000/login?username=' + username + '&password='+password;
      console.log(urlToFetch)
      const response = await fetch(urlToFetch);
      console.log((response.status))
      if(response.status==200){
        console.log("cccc")
        const body = await response.text();
        const myArray = body.split(" ");
        console.log(myArray)
        if(myArray[0]==1){
          console.log("BBBBBBB")
          newDest='/'+myArray[1]+'/teacherMenu';
        }else if(myArray[0]==2){
          newDest='/'+myArray[1]+'/studentMenu';
        }else{
          newDest='/login';
        }

        
        const navigateTo = window.location.href;
        const myArray2 = navigateTo.split("/");
        console.log('http://'+myArray2[2]+newDest);
        window.location.assign('http://'+myArray2[2]+newDest);
      }else{
        setWrongPasswordOrUserName(true);
      }

    }
  }
  return (
    <div id="login_page">
      <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'></link>

      <div className='LoginPage_Screen'>
        <div style={{marginRight:110}}>
          <h2 className='active h2' style={{fontWeight:400,color:'white'}}> sign in </h2>
          <h2 className='nonactive h2'> <a href="/register" style={{textDecoration:'none'}}>sign up</a></h2>
        </div>
        <div className='LoginPage_Form'>

          <input 
            type="text" 
            className='LoginPage_text' 
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            // name="username" 
            required
          ></input>

          <span className='LoginRegister_Span text_span span' style={{marginRight:'100%'}}>username</span>
    
  
          <input 
            type="password" 
            className='LoginPage_text'
            // name="password" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required>
           </input>

          <span className='LoginRegister_Span text_span span' style={{marginRight:'100%'}}>password</span>
          <br></br>

          <div className='keep_me_signed' style={{marginRight:160}}>
            <input type="checkbox" id="checkbox-1-1" className='LoginPage_RememberMeCheckbox' />
            <label for="checkbox-1-1" className='LoginPage_Label' style={{color:'white'}}>Keep me Signed in</label>
          </div>
          


          <button className='LoginPage_SigninButton' onClick={fetchData}>
            {/* <a href={newDest}> */}
              Sign In
            {/* </a> */}
          </button>

          <div className='dont_have_an_account'>
            <p style={{color:'white'}}>Don't have an account? <a href="/register">sign up</a></p>
          </div>

          {wrongPasswordOrUserName && <div style={{marginTop:-20}}>
            <label style={{color:'red',fontSize:24,fontWeight:200}}>שם המשתמש או הסיסמה שגויים</label>
            </div>
            }

          {(userNameIsEmpty || PasswordIsEmpty) && <div style={{marginTop:-20}}>
            <label style={{color:'red',fontSize:24,fontWeight:200}}>אחד או יותר מהשדות ריקים</label>
            </div>
            }

          
          <div className='LoginPage_forgotPasswordLink'>
            <a href="#">Forgot Password?</a>
          </div>
          

        </div>
      </div>
      
    </div>
  )
}

export default Login