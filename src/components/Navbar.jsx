import React, { useState, useEffect } from "react"
import DarkMode from "./DarkMode"
import { Link } from "react-router-dom"

const Navbar = () => {
  const [cart, setCart] = useState([])

  // Load cart from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) setCart(JSON.parse(stored))
  }, [])

  return (
    <nav className="navbar navbar-expand-md sticky-top">
      <div className="navbar-nav w-100 d-flex justify-content-between align-items-center px-2">

        {/* LEFT LINKS */}
        <div className="d-flex flex-wrap">
          <Link className="nav-link" to="/"><b>Arynest</b></Link>
          <Link className="nav-link" to="/signup">Signup</Link>
          <Link className="nav-link" to="/signin">Signin</Link>
          <Link className="nav-link" to="/aboutus">About Us</Link>
          <Link className="nav-link" to="/wishlist">Wishlist</Link>
          <Link className="nav-link" to="/profile">UserProfile</Link>
          <Link className="nav-link" to="/chatbot">Chat</Link>

          <Link className="nav-link" to="/cart">
            🛒 Cart ({cart.length})
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="d-flex align-items-center">
          <DarkMode />
        </div>

      </div>
    </nav>
  )
}

export default Navbar