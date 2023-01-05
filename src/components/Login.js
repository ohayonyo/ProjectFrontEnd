import React, { useState } from 'react';
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
      const urlToFetch='http://localhost:5000/login?username=' + username + '&password='+password;

      const response = await fetch(urlToFetch);
      if(response.status==200){
        const body = await response.text();
        const myArray = body.split(" ");
        if(myArray[0]==1){
          // setNewDest('/'+myArray[1]+'/teacherMenu');
          newDest='/'+myArray[1]+'/teacherMenu';
        }else if(myArray[0]==2){
          // setNewDest('/'+myArray[1]+'/studentMenu');
          newDest='/'+myArray[1]+'/studentMenu';
        }else{
          newDest='/login';
        }


        const navigateTo = window.location.href;
        const myArray2 = navigateTo.split("/");
        // console.log('myArray2:'+myArray2);
        // console.log('http://'+myArray2[2]+newDest);
        // console.log('newDest:'+newDest);
        window.location.assign('http://'+myArray2[2]+newDest);
      }
      

    

      // let result = fetch(url);
      // const res = (await result);
      // const reader = res.then(
      //   (val)=>{
      //     console.log('val:'+val)
      //   }
      // )
      // const reader = res.body.getReader();
      // reader.read().then(
      //   (done,val)=>
      //   !done ? console.log(val) : 'done'
      // )

      
      // fetch(url).then((result)=>{
      //   if(result.status==200){
      //     const json = await result.json();
      //     const res = json.then((value)=>{
      //       console.log('start');
      //       console.log(value);
      //     })
      //     console.log(res);
      //     const myArray = res.split(" ");
      //     console.log('hello');
          
          
      
      //     newDest = '/login'; 
      //     // setNewDest('/login')
      //   }
      // })
      
      
      // try{        
        

      //   console.log('after');
      // }catch(exception){
      //   await sleep(500);
      //   fetchData();
      // }
      
      
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