import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import React, { useState } from 'react'
import { handleError, handleSuccess } from '../utils'

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = {...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);

    }
    console.log('loginInfo ->', loginInfo)
    const handleLogin = async(e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('All Fields Are Required')
        }

        try {
            const url = "http://localhost:8080/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, error, jwtToken, name } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home')
                }, 1000)
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

    return ( <div className = 'container' >
        <h1 > Login </h1> <
        form onSubmit = { handleLogin } >
        <div >
        <label htmlFor = 'email' > Email </label> <
        input id = 'email'
        onChange = { handleChange }
        type = 'email'
        placeholder = 'Enter your email...'
        name = 'email'
        value = { loginInfo.email }/> </div> <div >
        <label htmlFor = 'password' > Password </label> <
        input id = 'password'
        onChange = { handleChange }
        type = 'password'
        placeholder = 'Enter your password...'
        name = 'password'
        value = { loginInfo.password } /> </div> <button type = 'submit' > Login </button> <
        span > You have to register ? <Link to = "/signup" > Signup </Link></span >
        </form> <
        ToastContainer / >
        </div>
    )
}

export default Login