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

    if(username!=''&&password!=''){
      console.log("if")
      const urlToFetch='http://localhost:5000/login?username=' + username + '&password='+password;
      console.log(urlToFetch)
      const response = await fetch(urlToFetch);
      console.log("AAAAAAAA")
      if(response.status==200){
        console.log("cccc")
        const body = await response.text();
        const myArray = body.split(" ");
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
        window.location.assign('http://'+myArray2[2]+newDest);
      }

    }
  }
  return (
    <div id="login_page">
      <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'></link>

      <div className='LoginPage_Screen'>
        <h2 className='active h2' style={{fontWeight:400,color:'white'}}> sign in </h2>

        <h2 className='nonactive h2'> <a href="/register" style={{textDecoration:'none'}}>sign up</a></h2>

        <form className='LoginPage_Form' action={newDest}>

          <input 
            type="text" 
            className='LoginPage_text' 
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            // name="username" 
            required
          ></input>

          <span className='LoginRegister_Span text_span'>username</span>
    
  
          <input 
            type="password" 
            className='LoginPage_text'
            // name="password" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required>
           </input>

          <span className='LoginRegister_Span text_span'>password</span>
          <br></br>

          <div className='keep_me_signed'>
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
          
          <div className='LoginPage_forgotPasswordLink'>
            <a href="#">Forgot Password?</a>
          </div>
          

        </form>
      </div>
      
    </div>
  )
}

export default Login