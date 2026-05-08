import React, { useEffect, useState } from "react"

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([])

  // Load wishlist
  useEffect(() => {
    const stored = localStorage.getItem("wishlist")
    if (stored) {
      setWishlist(JSON.parse(stored))
    }
  }, [])

  // Remove item
  const removeItem = (id) => {
    const updated = wishlist.filter((item) => item.id !== id)
    setWishlist(updated)
    localStorage.setItem("wishlist", JSON.stringify(updated))
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center text-danger">My Wishlist ❤️</h2>

      {wishlist.length === 0 ? (
        <p className="text-center mt-3">No items in wishlist</p>
      ) : (
        <div className="row">
          {wishlist.map((item) => (
            <div className="col-md-3" key={item.id}>
              <div className="card shadow mt-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="product_img"
                />

                <div className="card-body">
                  <h5 className="text-success">{item.name}</h5>

                  <b className="text-warning">
                    KES {Number(item.price).toLocaleString()}
                  </b>

                  <button
                    className="btn btn-danger w-100 mt-2"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist