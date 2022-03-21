import {Link} from 'react-router-dom'
import {MDBBtn} from 'mdb-react-ui-kit';

function Auth() {
    return (

      <div className = "auth">
        <h1 className="auth_title">Welcome to Easy Chat</h1>
      <div className = "auth_container">
      <img src="/easy-chat.png" alt=""/>
      <h3>Join Easy Chat</h3>
      <div className = "auth_text">
        you'll get fast and simple messaging available all over the world.
      </div>
        <div className='auth_form'>
        <Link to="/register">
          <MDBBtn>Register</MDBBtn>
        </Link>
        <Link to="/login">
        <MDBBtn color='success'>Login</MDBBtn>
        </Link>
        </div>
      </div>
      </div> 
    )
  }

export default Auth