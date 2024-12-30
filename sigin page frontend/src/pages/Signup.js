
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer} from 'react-toastify'
import React, {useState} from 'react'
import { handleError, handleSuccess } from '../utils'

function Signup() {

  const[signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate();
  const handleChange = (e)=>{
    const {name, value}= e.target;
    console.log(name,value);
    const copySignupInfo = { ...signupInfo};
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);

  }
  console.log('signupInfo ->',signupInfo)
  const handleSignup= async (e)=>{
    e.preventDefault();
    const{name, email, password} = signupInfo;
    if(!name || !email || !password){
        return handleError('All Fields Are Required')
    }
  
  try{
    const url ="http://localhost:8080/auth/signup";
    const response = await fetch(url,{
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
    }) ;
    const result = await response.json();
    const{success, message }= result;
    if(success){
        handleSuccess(message);
        setTimeout(()=>{
            navigate('/login')
        }, 1000)
    }else if (!success){
        handleError(message);
    }
    console.log(result);
  }catch(err){
    handleError(err);
  }
  }

  return (
    <div className='container'>
        <h1>Signup</h1>
        <form onSubmit={handleSignup}>
            <div>
            <label htmlFor='name'>Name</label>
            <input
            id='name'
            onChange={handleChange}
            type='text'
            placeholder='Enter your name...'
            name='name'
            autoFocus
            value={signupInfo.name}
            />
            </div>
            <div>
            <label htmlFor='email'>Email</label>
            <input
            id='email'
            onChange={handleChange}
            type='email'
            placeholder='Enter your email...'
            name='email'
            value={signupInfo.email}
            />
            </div>
            <div>
            <label htmlFor='password'>Password</label>
            <input
            id='password'
            onChange={handleChange}
            type='password'
            placeholder='Enter your password...'
            name='password'
            value={signupInfo.password}
            />
            </div>
            <button type='submit'>Signup</button>
            <span>Already have a account?<Link to="/login">Login</Link></span>
        </form>
        <ToastContainer />
    </div>
  )
}

export default Signup