import React from 'react'
import '../css/register.css'
const Register = () => {
  return (
    <div>

      <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'></link>

      <div className='RegisterPage_Screen'>
        <h2 className='nonactive h2' ><a href="/login" style={{textDecoration:'none'}}>sign in</a></h2>

        <h2 className='active h2' style={{fontWeight:400,color:'white'}}>sign up</h2>

        <form className='RegisterPage_Form' action="/">
          <input type="text" className='RegisterPage_text' name="firstname" required/>
          <span className='LoginRegister_Span text_span'>first name</span>

          <input type="text" className='RegisterPage_text' name="lastname" required/>
          <span className='LoginRegister_Span text_span'>last name</span>

          <input type="text" className='RegisterPage_text' name="id" required/>
          <span className='LoginRegister_Span text_span'>id</span>

          <input type="text" className='RegisterPage_text' name="username" required/>
          <span className='LoginRegister_Span text_span'>username</span>
          <input type="password" className='RegisterPage_text' name="password" required></input>
          <span className='LoginRegister_Span text_span'>password</span> 
          
          <button className='RegisterPage_SignupButton'>
            Sign Up
          </button>
        
          <h1></h1>

        </form>
      </div>
      
    </div>
    
  )
}

export default Register