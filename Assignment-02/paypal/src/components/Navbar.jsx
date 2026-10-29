import { Link } from 'react-router-dom'
import { navLinks } from '../data/content'

function Chevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-left">
             <Link to="/" className="logo"><img src="/logo.png" alt="PayPal" height="40" /></Link>
          <nav className="nav-links">
            {navLinks.map((link) => (
              <button key={link} className="nav-link">
                {link} <Chevron />
              </button>
            ))}
          </nav>
        </div>
        <div className="navbar-right">
          <Link to="/login" className="btn btn-light">Log In</Link>
          <Link to="/signup" className="btn btn-dark">Sign Up</Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
