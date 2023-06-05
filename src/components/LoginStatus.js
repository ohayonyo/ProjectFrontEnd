import React from 'react';
import '../css/LoginStatus.css'; // Import CSS file for styling

const LoginStatus = ({ username, isLoggedIn }) => {

  return (
    <div className="login-status" style={{marginTop:0}}>
  <div className="user-details" style={{marginTop:0}}>
    <span className="username">{username}</span>
    <span style={{paddingRight: isLoggedIn ? 25 : 10, color: isLoggedIn ? 'green' : 'grey'}} className="status">{isLoggedIn ? 'מחובר' : 'לא מחובר'}</span>
  </div>
  <img className="avatar" src="https://www.kindpng.com/picc/m/22-224091_avatar-computer-icons-blog-clip-art-avatar-png.png" alt="Avatar" />
  <div className={`avatar-circle ${isLoggedIn ? 'green' : 'grey'}`}></div>
</div>
  );
};

export default LoginStatus;