import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import React, { useState } from 'react';
import '../css/register.css'
import SingleSelection from './selectionElements/SingleSelection'
const Register = () => {
  let newDest='/login';
  const [username,setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [isErrorAccured,setIsErrorAccured] = useState(false);

  const [userNameIsAlreadyExists,setUserNameIsAlreadyExists] = useState(false);
  const [userNameIsEmpty,setUserNameIsEmpty] = useState(false);
  const [PasswordIsEmpty,setPasswordIsEmpty] = useState(false);

  const options = [
    { value: '1', label: 'Teacher' },
    { value: '2', label: 'Student'},
    { value: '3', label: 'Admin' }
  ]
  const [selectedOption, setSelectedOption] = useState(1);

  const handleSelectionChange = (event) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value);
  }

  const fetchData = async ()=> {
    console.log('username:'+username);
    console.log('password:'+password);

    if(username===''){
      setUserNameIsEmpty(true);
      setUserNameIsAlreadyExists(false);
    }

    if(PasswordIsEmpty===''){
      setPasswordIsEmpty(true);
      setUserNameIsAlreadyExists(false);
    }

    if(username!==''&&password!==''){
      setUserNameIsEmpty(false);
      setPasswordIsEmpty(false);
      setUserNameIsAlreadyExists(false);

      console.log("im in")
      const urlToFetch='http://localhost:5000/register?username=' + username + '&password='+password+"&typ="+selectedOption;
      console.log(urlToFetch)
      let isErrorAccured = false;
      while(true){
        isErrorAccured = false;
        try {
          const response = await fetch(urlToFetch);
          console.log("after request");
          console.log(response);
      
          if (response.status === 200) {
            setUserNameIsAlreadyExists(false);
            console.log("okkkkk");
            const navigateTo = window.location.href;
            const myArray2 = navigateTo.split("/");
            window.location.assign('http://' + myArray2[2] + newDest);
          }else{
            setUserNameIsAlreadyExists(true);
          }
          break
          // Handle the response
        } catch (error) {
          console.log("isErrorAccured=" + isErrorAccured);
          isErrorAccured = true;
          console.log("isErrorAccured=" + isErrorAccured);
          console.log('Error:', error);
        }
      }
      
    }
  }

  return (
    <div>

      <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'></link>

      <div className='RegisterPage_Screen'>
        <div style={{marginRight:110}}>
          <h2 className='nonactive h2' ><a href="/login" style={{textDecoration:'none'}}>sign in</a></h2>
          <h2 className='active h2' style={{fontWeight:400,color:'white'}}>sign up</h2>
        </div>

        <div className='RegisterPage_Form' style={{marginTop:'13%'}}>
          {/* <input type="text" className='RegisterPage_text' name="email" required/>
          <span className='LoginRegister_Span text_span' style={{marginRight:'100%'}}>email</span> */}
          <input type="text" className='RegisterPage_text' name="username" value={username}
            onChange={(e)=>setUsername(e.target.value)} required/>
          <span className='LoginRegister_Span text_span' style={{marginRight:'100%'}}>username</span>
          <input type="password" className='RegisterPage_text' name="password" value={password}
            onChange={(e)=>setPassword(e.target.value)} required></input>
          <span className='LoginRegister_Span text_span' style={{marginRight:'100%'}}>password</span> 

          <select value={selectedOption.value} onChange={handleSelectionChange}>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          
          <button style={{marginTop:10}} className='RegisterPage_SignupButton' onClick={fetchData}>
            Sign Up
          </button>

          {userNameIsAlreadyExists && <div style={{marginTop:20}}>
            <label style={{color:'red',fontSize:24,fontWeight:200}}>שם משתמש זה כבר קיים במערכת</label>
            </div>
            }

          {(userNameIsEmpty || PasswordIsEmpty) && <div style={{marginTop:20}}>
            <label style={{color:'red',fontSize:24,fontWeight:200}}>אחד או יותר מהשדות ריקים</label>
            </div>
            }
          

        </div>
      </div>
      
    </div>
    
  )
}

export default Register