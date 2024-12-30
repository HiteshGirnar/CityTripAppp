import React, { useEffect, useState }from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {

    const [loggedInUser,setloggedInUser]= useState('');
    const [products,setProducts] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        setloggedInUser(localStorage.getItem('loggedInUser'))
    },[])
    const handleLogout = (e) =>{
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout')
        setTimeout(()=>{
            navigate("/login")

        },1000)
    }

    const fetchProducts = async () =>{
        try{
            const url = "http://localhost:8080/products";
            const headers = {
                'Authorization':localStorage.getItem('token')
            }
            const response = await fetch(url, {headers});
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            const result = await response.json();
            console.log(result);
            setProducts(result);

        }catch(err){
            handleError(err);
        }
    }
    useEffect(()=>{
        fetchProducts()
    },[])

  return (

    <div><h1>Welcome {loggedInUser}</h1>
    <button onClick={handleLogout}>Logout</button>

    <ToastContainer/>
    </div>
  )
}

export default Home