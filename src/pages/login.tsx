import React,{useState} from 'react'
import axios from 'axios';
import  { Redirect } from 'react-router-dom'

const Login = () => {

    if(localStorage.getItem('bearerToken')){
        return <Redirect to='/dashboard'/>
    }
  const [isLogin,setIsLogin] = useState(true);

  const [loginEmail,setLoginEmail] = useState("");
  const [loginEmailEmpty,setLoginEmailState] = useState(false);
  const [loginEmailError,setLoginEmailError] = useState("Invalid email format");
  const [loginPassword,setLoginPassword] = useState("");
  const [loginPasswordEmpty,setLoginPasswordState] = useState(false);
  const [loginPasswordError,setLoginPasswordError] = useState("Password cannot be empty");

  

  const [registerEmail,setRegisterEmail] = useState("");
  const [registerEmailEmpty,setRegisterEmailState] = useState(false);
  const [registerEmailError,setRegisterEmailError] = useState("");
  const [registerPassword,setRegisterPassword] = useState("");
  const [registerPasswordEmpty,setRegisterPasswordState] = useState(false);
  const [registerPasswordError,setRegisterPasswordError] = useState("Password cannot be empty");
  const [registerPasswordConfirmation,setRegisterPasswordConfirmation] = useState("");
  const [registerPasswordConfirmationMismatch,setregisterPasswordConfirmationMismatch] = useState(false);
  const [registerPasswordConfirmationError,setRegisterPasswordConfirmationError] = useState("Passwords do not match");
  
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  function signIn(){
    setLoginEmailState(false)
    setLoginPasswordState(false)
    
    if(!loginEmail){
        setLoginEmailState(true)
        setLoginEmailError("Email cannot be empty")
        return
    }
    if (!validateEmail(loginEmail)){
        setLoginEmailState(true)
        setLoginEmailError("Invalid email format")
        return
    }

    if(!loginPassword){
        setLoginPasswordState(true)
        return
    }

    axios.post('http://127.0.0.1:8000/api/v1/auth/login', {
        username: loginEmail, 
        password: loginPassword   
      }, {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
      })
      .then(response => {
        // Handle successful login
        console.log(response.data.access_token);
      
        // Store the bearer token (if received)
        if (response.data.access_token) {
          localStorage.setItem('bearerToken', response.data.access_token);
          // Or use cookies: document.cookie = `bearerToken=${response.data.token}; HttpOnly`;
          return <Redirect to='/dashboard'/>
        }
      })
      .catch(error => {
        // Handle login errors
        console.error('Login failed:', error.response.data.detail);
        if(error.response.data.detail == "Password does not match the email"){
            setLoginPasswordState(true)
            setLoginPasswordError(error.response.data.detail)
        }
        else{
            setLoginEmailState(true)
            setLoginEmailError(error.response.data.detail)
        }
      });
  }

  function signUp(){
    setRegisterEmailState(false)
    setRegisterPasswordState(false)
    setregisterPasswordConfirmationMismatch(false)
    
    if(!registerEmail){
        setRegisterEmailState(true)
        setRegisterEmailError("Email cannot be empty")
        return
    }
    if (!validateEmail(registerEmail)){
        setRegisterEmailState(true)
        setRegisterEmailError("Invalid email format")
        return
    }
    if(!registerPassword){
        setRegisterPasswordState(true)
        setRegisterPasswordError("Password cannot be empty")
    }
    if(registerPassword.length < 6){
        setRegisterPasswordState(true)
        setRegisterPasswordError("Password must be at least 6 characters long")
    }
    if(registerPasswordConfirmation !== registerPassword){
        setregisterPasswordConfirmationMismatch(true)
        setRegisterPasswordConfirmationError("Passwords do not match")
        return
    }
    console.log("Registering:")
    console.log(`${registerPassword} with password: ${registerPassword}`)
  }

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen md:py-2">
    <main className="flex items-center w-full px-2 md:px-20">
      <div className="hidden md:inline-flex flex-col flex-1 space-y-1">
        <p className='text-6xl text-slate-800 font-bold'>NourishKe</p>
        <p className='font-medium text-lg leading-1 text-green-400'>Nutrition Recommendation API for diabetes management in Kenya</p>
        <p className='text-sm text-slate-500'> Sign in to gain access to this robust API to integrate food recommendations for nutritional management of diabetes into your application!</p>
      </div>
      {
        isLogin? (
            <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-full md:w-1/3 py-5 items-center max-w-4xl transition duration-300 ease-out">
            <h2 className='p-3 text-3xl font-bold text-slate-800'>NourishKe</h2>
            <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
            <h3 className='text-xl font-semibold text-green-400 pt-2'>Sign In!</h3>
            
            {/* Inputs */}
            <div className='flex flex-col items-center justify-center mt-5 w-full px-10 gap-4'>
             <input id="login-email" type='email' className='block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-green-500' placeholder='Email' onChange={e => setLoginEmail(e.target.value)}></input>
             {loginEmailEmpty ? <span className='text-xs text-red-500'>{loginEmailError}</span> : <></>}
             <input id="login-password" type="password" className='block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-green-500' placeholder='Password' onChange={e => setLoginPassword(e.target.value)}></input>
             {loginPasswordEmpty ? <span className='text-xs text-red-500'>{loginPasswordError}</span> : <></>}
             <button className='mt-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white w-full' onClick={signIn}>
               Sign In
             </button>
            </div>
            <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid mt-4"></div>
            <p className='mt-4 text-sm'>Don't have an account?</p>
            <p className='text-slate-900 mb-4 text-sm font-medium cursor-pointer' onClick={() => setIsLogin(false)}>Create a New Account?</p>
         </div>
        ):(
            <div className="bg-slate-800 text-white rounded-2xl shadow-2xl py-5 flex flex-col w-full  md:w-1/3 items-center max-w-4xl transition duration-300 ease-in">
            <h2 className='p-3 text-3xl font-bold text-white'>NourishKe</h2>
           <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
           <h3 className='text-xl font-semibold text-green-500 pt-2'>Create Account!</h3>
           <div className='flex space-x-2 m-4 items-center justify-center'>

           </div>
           {/* Inputs */}
           <div className='flex flex-col items-center justify-center mt-2 gap-4 w-full px-10'>
           <input type="email" className='block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-green-500' placeholder='Email' onChange={e => setRegisterEmail(e.target.value)}></input>
           {registerEmailEmpty ? <span className='text-xs text-red-500'>{registerEmailError}</span> : <></>}

            <input type='password' className='block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-green-500' placeholder='Password' onChange={e => setRegisterPassword(e.target.value)}></input>
           {registerPasswordEmpty ? <span className='text-xs text-red-500'>{registerPasswordError}</span> : <></>}

            <input type="password" className='block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-green-500' placeholder='Confirm Password' onChange={e => setRegisterPasswordConfirmation(e.target.value)}></input>
           {registerPasswordConfirmationMismatch ? <span className='text-xs text-red-500'>{registerPasswordConfirmationError}</span> : <></>}

            <button className='mt-4 py-2 rounded-md bg-green-500 hover:bg-green-400 text-white w-full' onClick={signUp}>
              Sign Up
            </button>
           </div>
           <div className="inline-block border-[1px] justify-center w-20 border-white border-solid mt-4"></div>
           <p className='text-white mt-4 text-sm'>Already have an account?</p>
           <p className='text-white mb-4 text-sm font-medium cursor-pointer' onClick={() => setIsLogin(true)}>Sign In to your Account?</p>
        </div>
        )
      }
    </main>
    </div>
  )
}

export default Login

function validateEmail(email){
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}