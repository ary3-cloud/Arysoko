import React, { useState } from "react"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom"

import AddProducts from "./components/AddProducts"
import SignIn from "./components/SignIn"
import GetProducts from "./components/GetProducts"
import MpesaPayment from "./components/MpesaPayment"
import SignUp from "./components/SignUp"
import AboutUs from "./components/AboutUs"
import Footer from "./components/Footer"
import AddCart from "./components/AddCart"
import WishList from "./components/WishList"
import UserProfile from "./components/UserProfile"
import Chatbot from "./components/ChatBot"
import DarkMode from "./components/DarkMode"

const Layout = ({ cart, setCart, addToCart }) => {
  const location = useLocation()

  // Pages where footer should NOT appear
  const hideFooterPages = [
    "/signin",
    "/signup",
    "/wishlist",
    "/userprofile",
    "/chatbot",
    "/cart",
    "/mpesa"
  ]

  const hideFooter = hideFooterPages.includes(location.pathname)

  return (
    <div className="App">

      {/* HEADER */}
      <header className="App-header">
        <h1>Local & Handmade Products</h1>
      </header>

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-md sticky-top">
        <div className="navbar-nav">

          <Link className="nav-link" to="/" id='home'>Arynest</Link>
          <Link className="nav-link" to="/signup">Signup</Link>
          <Link className="nav-link" to="/signin">Signin</Link>
          <Link className="nav-link" to="/aboutus">About Us</Link>
          <Link className="nav-link" to="/wishlist">Wishlist</Link>
          <Link className="nav-link" to="/userprofile">User Profile</Link>
          <Link className="nav-link" to="/chatbot">Chat</Link>

          <Link className="nav-link" to="/cart">
            🛒 Cart ({cart.length})
          </Link>

          <DarkMode />

        </div>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<GetProducts addToCart={addToCart} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/addproducts" element={<AddProducts />} />
        <Route path="/mpesa" element={<MpesaPayment />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/cart" element={<AddCart cart={cart} setCart={setCart} />} />
      </Routes>

      {/* FOOTER */}
      {!hideFooter && <Footer />}

    </div>
  )
}

function App() {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  return (
    <Router>
      <Layout
        cart={cart}
        setCart={setCart}
        addToCart={addToCart}
      />
    </Router>
  )
}

export default App