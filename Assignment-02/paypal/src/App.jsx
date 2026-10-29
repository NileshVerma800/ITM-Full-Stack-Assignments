import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import './App.css'
import './Auth.css'

function App() {
  const [users, setUsers] = useState([])

  function createAccount(user) {
    const exists = users.some((item) => item.email === user.email)
    if (exists) {
      return 'An account with this email already exists.'
    }
    setUsers([...users, user])
    return 'success'
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup createAccount={createAccount} />} />
          <Route path="/login" element={<Login users={users} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
