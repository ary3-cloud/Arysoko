import React, { useEffect, useState } from "react"

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: ""
  })

  const [editMode, setEditMode] = useState(false)

  // LOAD USER DATA
  useEffect(() => {
    const storedUser = localStorage.getItem("user")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      // default demo user (optional)
      setUser({
        name: "Guest User",
        email: "guest@example.com",
        phone: "N/A"
      })
    }
  }, [])

  // SAVE USER DATA
  const saveUser = () => {
    localStorage.setItem("user", JSON.stringify(user))
    setEditMode(false)
  }

  // INPUT CHANGE
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">

        <h2 className="text-center text-primary">👤 User Profile</h2>

        <hr />

        {/* NAME */}
        <label>Name</label>
        <input
          className="form-control mb-3"
          name="name"
          value={user.name}
          disabled={!editMode}
          onChange={handleChange}
        />

        {/* EMAIL */}
        <label>Email</label>
        <input
          className="form-control mb-3"
          name="email"
          value={user.email}
          disabled={!editMode}
          onChange={handleChange}
        />

        {/* PHONE */}
        <label>Phone</label>
        <input
          className="form-control mb-3"
          name="phone"
          value={user.phone}
          disabled={!editMode}
          onChange={handleChange}
        />

        {/* BUTTONS */}
        <div className="d-flex gap-2">
          {!editMode ? (
            <button
              className="btn btn-info w-100"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button className="btn btn-success w-100" onClick={saveUser}>
                Save
              </button>

              <button
                className="btn btn-secondary w-100"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* EXTRA INFO SECTION */}
      <div className="row mt-4 text-center">

        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h5>🛒 Cart</h5>
            <p>{JSON.parse(localStorage.getItem("cart") || "[]").length} items</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h5>❤️ Wishlist</h5>
            <p>{JSON.parse(localStorage.getItem("wishlist") || "[]").length} items</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h5>📦 Orders</h5>
            <p>0 orders (backend ready)</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default UserProfile