import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' })

  const onChange = (e) => {
    const { name, value } = e.target
    setCredentials({
      ...credentials, [name]: value
    })
  }

  const clickHandler = async (e) => {
    e.preventDefault()
    // api call
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ name:credentials.name,email: credentials.email, password: credentials.password })
    });

    const data = await response.json()
    console.log(data)
    if (data.success) {
      localStorage.setItem('token', data.authtoken)
      navigate('/');
      props.showAlert('Account created Successfully','success')
    }
    else {
      props.showAlert('Some error Occured','danger')
    }
  }

  return (
    <div className='container mt-2'>
    <h2 className='my-3'>Singup to use iNotebook</h2>
      <form className='my-3' onSubmit={clickHandler}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" onChange={onChange} className="form-control" value={credentials.name} id="name" name="name" autoComplete='off' minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" onChange={onChange} className="form-control" value={credentials.email} id="email" name="email" autoComplete='off' required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" onChange={onChange} className="form-control" value={credentials.password} id="password" name="password" autoComplete='off' minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" onChange={onChange} className="form-control" value={credentials.cpassword} id="cpassword" name="cpassword" autoComplete='off' minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup