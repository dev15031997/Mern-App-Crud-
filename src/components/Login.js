import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  let navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target
    setCredentials({
      ...credentials, [name]: value
    })
  }

  const clickHandler = async (e) => {
    e.preventDefault()
    // api call
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const data = await response.json()
    console.log(data)
    if (data.success) {
      // save the authtoken and redirect
      localStorage.setItem('token', data.authtoken)
      props.showAlert('Logged in Successfully','success')
      navigate('/');

    }
    else {
      props.showAlert('Invalid credentials','danger')
    }
  }

  return (
    <div className='mt-3'>
    <h2>Login to continue</h2>
      <form className='my-3' onSubmit={clickHandler}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" onChange={onChange} className="form-control" value={credentials.email} id="email" name="email" autoComplete='off' required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" onChange={onChange} className="form-control" value={credentials.password} id="password" name="password" autoComplete='off' required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login