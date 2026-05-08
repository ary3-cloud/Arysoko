import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import PasswordStrength from './Passwordstrength'

const SignIn = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading("Please wait....")
    setError("")
    setSuccess("")

    try {
      const data = new FormData()
      data.append("email", email)
      data.append("password", password)

      const response = await axios.post(
        "http://mary.alwaysdata.net/api/signin",
        data
      )

      setLoading("")

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user))
        setSuccess(response.data.message)

        setTimeout(() => {
          navigate("/")
        }, 1500)

      } else {
        setError(response.data.message)
      }

      setEmail("")
      setPassword("")

    } catch (err) {
      setLoading("")
      setError(err.message)
    }
  }

  return (
    <div className='row justify-content-center'>
      <div className='card shadow col-md-6 p-3'>

        <form onSubmit={submit}>

          <h1>Sign In</h1>

          <p className='text-warning'>{loading}</p>
          <p className='text-success'>{success}</p>
          <p className='text-danger'>{error}</p>

          {/* EMAIL */}
          <input
            type="email"
            placeholder='Email'
            className='form-control'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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

          {/* SUBMIT */}
          <input
            type="submit"
            value="Sign In"
            className='bg-info text-white w-100 form-control'
          />

          <p className='mt-2'>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>

        </form>

      </div>
    </div>
  )
}

export default SignIn