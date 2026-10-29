import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Popup from './Popup'

function Login({ users }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [popup, setPopup] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()
    const value = email.trim().toLowerCase()

    if (!value || !password) {
      setPopup({ success: false, title: 'Missing information', message: 'Please enter your email and password.' })
      return
    }

    const user = users.find((item) => item.email === value && item.password === password)
    if (!user) {
      setPopup({ success: false, title: 'Login failed', message: 'Email or password is incorrect. Sign up first if you do not have a demo account.' })
      return
    }

    setEmail('')
    setPassword('')
    setPopup({ success: true, title: 'Login successful!', message: `Welcome back, ${user.name}.` })
  }

  function handleClose() {
    const wasSuccessful = popup.success
    setPopup(null)
    if (wasSuccessful) {
      navigate('/')
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <span className="demo-badge">Demo</span>
        <h1>Log in</h1>
        <p className="auth-description">Use the demo account you created on the sign up page.</p>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="loginEmail">Email address</label>
          <input id="loginEmail" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" />

          <label htmlFor="loginPassword">Password</label>
          <input id="loginPassword" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" />

          <button type="submit" className="btn btn-dark auth-submit">Log In</button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        <p className="demo-note">Demo form for a college assignment. Data is kept only in the browser and is cleared on refresh.</p>
      </section>

      {popup && <Popup {...popup} onClose={handleClose} />}
    </main>
  )
}

export default Login
