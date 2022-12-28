import { Link } from "react-router-dom";


const Header = () => {
  // return (
  //   <div>
  //     <h1>Home Page</h1>
  //     <br />
  //     <ul>
  //       <li>
  //         {/* Endpoint to route to Home component */}
  //         <Link to="/">Header</Link>
  //       </li>
  //       <li>
  //         {/* Endpoint to route to About component */}
  //         <Link to="/login">LoginPage</Link>
  //       </li>
  //       <li>
  //         {/* Endpoint to route to Contact Us component */}
  //         <Link to="/register">RegisterPage</Link>
  //       </li>
  //     </ul>
  //   </div>
  // );

  return (
    
    <header>
        
    <div style={{textAlign:'center',color:'black'}}>
        
      <h1 className="head_font">𝑀𝒶𝓉𝒽𝑒𝓂𝒶𝓉𝒾𝒸𝒳</h1>
      <p style={{marginBottom:50}}> Log in or Sign Up to start working on your math </p>

      <div>
        <div>
          <button data-ico="✏️" className='reg' >Registration </button>
          <button data-ico="🔒" className='reg'>Login </button>
        </div>
      </div>

    </div>
    </header>
  )
}


export default Header
