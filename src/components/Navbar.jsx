import React, { useState, useEffect } from "react"
import DarkMode from "./DarkMode"
import { Link } from "react-router-dom"

const Navbar = () => {
  const [cart, setCart] = useState([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Load cart from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) setCart(JSON.parse(stored))
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand" to="/"><b>Arynest</b></Link>

        {/* Hamburger Menu Button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleMenu}
          aria-controls="navbarNav" 
          aria-expanded={isMenuOpen} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Navigation */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <div className="navbar-nav me-auto">
            <Link className="nav-link" to="/signup" onClick={() => setIsMenuOpen(false)}>Signup</Link>
            <Link className="nav-link" to="/signin" onClick={() => setIsMenuOpen(false)}>Signin</Link>
            <Link className="nav-link" to="/aboutus" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link className="nav-link" to="/wishlist" onClick={() => setIsMenuOpen(false)}>Wishlist</Link>
            <Link className="nav-link" to="/profile" onClick={() => setIsMenuOpen(false)}>UserProfile</Link>
            <Link className="nav-link" to="/chatbot" onClick={() => setIsMenuOpen(false)}>Chat</Link>
            <Link className="nav-link" to="/cart" onClick={() => setIsMenuOpen(false)}>
              🛒 Cart ({cart.length})
            </Link>
          </div>

          {/* Right Side */}
          <div className="navbar-nav">
            <div className="nav-item">
              <DarkMode />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar