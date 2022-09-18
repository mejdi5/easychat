import React, {useEffect, useState} from 'react'
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import Home from './components/Home'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Register from './components/auth/Register'
import Auth from './components/auth/Auth'
import Login from './components/auth/Login'
import { Spinner } from 'reactstrap';
import { getUsers } from './Redux/actions/userActions';
import Manage from './components/AdminManage/Manage'



function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);
  const isLoading  = useSelector((state) => state.isLoading);

  const [manage, setManage] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, []);


  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Auth/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/:authUserId" element={<Home manage={manage} setManage={setManage}/>}/>
          <Route path="/manage" element={<Manage setManage={setManage}/>}/>
        </Routes>
    </BrowserRouter>
    
  );
}

export default App;