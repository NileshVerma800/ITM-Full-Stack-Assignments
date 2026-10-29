import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Popup from './Popup'

const emptyForm = { name: '', email: '', password: '', confirmPassword: '' }

function Signup({ createAccount }) {
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [popup, setPopup] = useState(null)

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function showError(message) {
    setPopup({ success: false, title: 'Please check your details', message })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const name = form.name.trim()
    const email = form.email.trim().toLowerCase()

    if (!name || !email || !form.password || !form.confirmPassword) {
      showError('All fields are required.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('Enter a valid email address.')
      return
    }
    if (form.password.length < 6) {
      showError('Password must be at least 6 characters.')
      return
    }
    if (form.password !== form.confirmPassword) {
      showError('Passwords do not match.')
      return
    }

    const result = createAccount({ name, email, password: form.password })
    if (result !== 'success') {
      showError(result)
      return
    }

    setForm(emptyForm)
    setPopup({
      success: true,
      title: 'Account created!',
      message: `Welcome, ${name}. You can now log in with your demo account.`,
    })
  }

  function handleClose() {
    const wasSuccessful = popup.success
    setPopup(null)
    if (wasSuccessful) {
      navigate('/login')
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <span className="demo-badge">Demo</span>
        <h1>Create an account</h1>
        <p className="auth-description">Fill in your details to sign up.</p>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Enter your full name" />

          <label htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter your email" />

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="At least 6 characters" />

          <label htmlFor="confirmPassword">Confirm password</label>
          <input id="confirmPassword" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Re-enter your password" />

          <button type="submit" className="btn btn-dark auth-submit">Sign Up</button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
        <p className="demo-note">Demo form for a college assignment. Data is kept only in the browser and is cleared on refresh.</p>
      </section>

      {popup && <Popup {...popup} onClose={handleClose} />}
    </main>
  )
}

export default Signup
