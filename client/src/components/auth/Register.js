import React, {useState} from 'react'
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../Redux/actions/authActions'
import {Link} from 'react-router-dom'

function Register() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");


const dispatch = useDispatch();
const navigate = useNavigate();
const user = useSelector((state) => state.user);


const handleRegister = (e) => {
    const newUser = { firstName, lastName, phoneNumber, email };
    e.preventDefault();
    dispatch(registerUser(newUser));
    user && navigate(`/login`)
    alert('registered with success')
    setEmail('')
    setFirstName('')
    setLastName('')
    setPhoneNumber('')
};


    return (
    <div className = "auth">
        <h1 className="register_text">Sign Up</h1>
        <p className="register_text">If you have already registered, go to <Link to="/login">login</Link> page</p>
    <div className = "auth_container">
    <div className = "auth_text"></div>
    <form>
            <div className="form-group">
                <label className="form-label">First Name</label>
                <input 
                type="firstName"
                value={firstName}
                name="firstName"
                id="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="form-control"  
                aria-describedby="firstNameHelp" 
                placeholder="Your first name..."
                required
                />
            </div>
            <div className="form-group" >
                <label className="form-label">Last Name</label>
                <input 
                type="lastName"
                value={lastName}
                name="lastName"
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
                className="form-control"  
                aria-describedby="lastNameHelp" 
                placeholder="Your last name..."
                />
            </div>
            <div className="form-group" >
                <label className="form-label">Email</label>
                <input 
                type="email"
                value={email}
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"  
                aria-describedby="emailHelp" 
                placeholder="Your email address..."
                />
            </div>
            <div className="form-group" >
                <label className="form-label">Phone</label>
                <input 
                type="phoneNumber"
                value={phoneNumber}
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Your phone number..."
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="form-control" />
            </div>
            <button 
            type="submit"
            onClick={handleRegister}
            className="btn btn-primary register_button" 
            >Submit</button>
        </form>
    </div>
    </div> 
    )
}

export default Register