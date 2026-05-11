import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import PasswordStrength from './Passwordstrength'

const SignUp = () => {
    //initializing the hooks
 const[username,setUsername]=useState("")
 const[email,setEmail]=useState("")
 const[phone,setPhone]=useState("")
 const [password, setPassword] = useState("")

 const [showPassword, setShowPassword] = useState(false)

 //other hooks
 const[loading,setLoading]=useState("")
  const[success,setSuccess]=useState("")
  const[error,setError]=useState("")

  const navigate = useNavigate()

  //function to send out data to the server
  const submit=async(e)=>{

   e.preventDefault()

    setLoading("please wait.....")
    try {

      const data=new FormData()
    
      data.append("username",username)
      data.append("email",email)
      data.append("phone",phone)
      data.append("password",password)
      
      //calling the API
      const response= await axios.post("https://mary.alwaysdata.net/api/signup",data)

      setLoading("")

      setSuccess(response.data.message)

      //reset your form
      setUsername("")
      setEmail("")
      setPhone("")
      setPassword("")

      //Redirect to user profile after 1.5 seconds
      setTimeout(() => {
        navigate("/userprofile")
      }, 1500)

    } catch (error) {

      setLoading("")
      setError(error.message)
 
    }
  }

  return (
 <div className='row justify-content-center mt-3'>
    <div className='card shadow col-md-6'>

    <form action=""onSubmit={submit}>
        <h1>Sign Up</h1>

        <p className='text-warning'>{loading}</p>
        <p className='text-success'>{success}</p>
        <p className='text-danger'>{error}</p>


        <input type="text" placeholder='Enter your username' className='form-control'required value={username} onChange={(e)=>setUsername(e.target.value)} />
       <br />
       
       
       <input type="email" placeholder='Enter your email' className='form-control'required value={email} onChange={(e)=>setEmail(e.target.value)}/>
       <br />
       
       
        <input type="tel" placeholder='Enter your phone number'className='form-control'required value={phone} onChange={(e)=>setPhone(e.target.value)}/>
       <br />
       
       {/* PASSWORD WITH TOGGLE */}
          <div style={{ position: "relative" }}>

            <input
              type={showPassword ? "text" : "password"}
              placeholder='Password'
              className='form-control'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* EYE ICON */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                userSelect: "none"
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>

          </div>

          {/* 👇 ADD THIS */}
          <PasswordStrength password={password} />

          <br />

       
       
       <br />

       <input type="submit"value='SignUp' className='bg-info w-100 form-control text-white'required/>
       
       <p>Already have an account? <Link to="/signin">Sign in</Link></p>

    </form>

    </div>

    </div>
  )
}

export default SignUp
