import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Redux/actions/authActions'
import {Link} from 'react-router-dom'


function Login() {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const user = useSelector((state) => state.user);

    
    const dispatch = useDispatch();
    let navigate = useNavigate(); 

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, phoneNumber }));
        user && user!== undefined && navigate(`/${user._id}`)
        setEmail('')
        setPhoneNumber('')
    };
    


    return (
    <div className = "auth">
        <h1 className="login_text">Sign In</h1>
        <p className="login_text">If you haven't already registered, go to <Link to="/register">register</Link> page</p>
    <div className = "auth_container">
    <div className = "auth_text"></div>
    <form className="login_form">
            <div className="form-group">
                <label className="form-label" >Email</label>
                <input 
                type="email"
                value={email}
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"  
                aria-describedby="emailHelp" 
                placeholder="enter email address..."
                />
            </div>
            <div className="form-group" style={{display: 'flex',  marginTop: '2rem'}}>
                <label className="form-label">Phone</label>
                <input 
                type="phoneNumber"
                value={phoneNumber}
                name="phoneNumber"
                id="phoneNumber"
                placeholder="enter phone number..."
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="form-control" />
            </div>
            <button 
            type="submit" 
            className="btn btn-primary login_button" 
            onClick={handleLogin}>
                Submit
            </button>
        </form>
        
    </div>
    </div> 
    )
}

export default Login