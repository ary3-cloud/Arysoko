// GetProducts.jsx
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Caro from "./Caro";

const GetProducts = ({ addToCart }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [page, setPage] = useState(1);
  const [wishlist, setWishlist] = useState([]);

  const navigate = useNavigate();

  const img_url = "http://mary.alwaysdata.net/static/images/";
  const itemsPerPage = 8;

  // ---------------- FETCH ----------------
  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://mary.alwaysdata.net/api/getproductdetails",
          { signal: controller.signal }
        );
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        if (err.name !== "CanceledError") {
          setError("Failed to load products");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, []);

  // ---------------- SEARCH DEBOUNCE ----------------
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // ---------------- WISHLIST ----------------
  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) setWishlist(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);

    if (exists) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([
        ...wishlist,
        {
          id: product.id,
          name: product.product_name,
          price: product.product_cost,
          image: img_url + product.product_photo,
        },
      ]);
    }
  };

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  // ---------------- CATEGORY ENGINE ----------------
  const CATEGORY_RULES = {
    fashion: /\b(shoe|dress|shirt|clothing|wear)\b/i,
    jewelry: /\b(ring|necklace|earring|gold|silver)\b/i,
    handmade: /\b(handmade|craft|art|wood)\b/i,
  };

  const getCategory = (p) => {
    const text = `${p?.product_name || ""} ${p?.product_description || ""}`.toLowerCase();

    for (const key in CATEGORY_RULES) {
      if (CATEGORY_RULES[key].test(text)) return key;
    }

    return "other";
  };

  // ---------------- FILTER ----------------
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const name = (p?.product_name || "").toLowerCase();
      const matchSearch = name.includes(debouncedSearch.toLowerCase());
      const productCategory = getCategory(p);
      const matchCategory = category === "" || productCategory === category;
      const matchPrice =
        maxPrice === "" || Number(p?.product_cost || 0) <= Number(maxPrice);
      return matchSearch && matchCategory && matchPrice;
    });
  }, [products, debouncedSearch, category, maxPrice]);

  // ---------------- PAGINATION ----------------
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / itemsPerPage)
  );

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  const visibleProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // ---------------- CATEGORIES ----------------
  const categories = useMemo(() => {
    const unique = new Set(products.map(getCategory));
    return Array.from(unique);
  }, [products]);

  return (
    <div className="row">
      <h1 className="text-info text-center">Available Products</h1>

      <Caro />
      <br />
      <br />

      {/* FILTERS */}
      <div className="row justify-content-center mb-3">
        <div className="col-md-10 d-flex gap-2 flex-wrap">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.toUpperCase()}
              </option>
            ))}
          </select>

          <input
            type="number"
            className="form-control"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </div>
      </div>

      {/* STATUS */}
      {loading && <p className="text-warning">Loading products...</p>}
      {error && <p className="text-danger">{error}</p>}

      {/* PRODUCTS */}
      {visibleProducts.map((product) => (
        <div className="col-md-3" key={product.id}>
          <div className="card shadow mt-3">
            <img
              src={img_url + product.product_photo}
              alt={product.product_name}
              className="product_img"
              onError={(e) => (e.target.src = "/fallback.png")}
            />

            <div className="card-body">
              <h5 className="text-success">{product.product_name}</h5>
              <p className="text-primary">{product.product_description}</p>
              <b className="text-warning">
                KES {Number(product.product_cost || 0).toLocaleString()}
              </b>

              <button
                className="btn btn-primary w-100 mt-2"
                onClick={() => navigate("/mpesa", { state: { product } })}
              >
                Purchase Now
              </button>

              <button
                className="btn btn-info w-100 mt-2"
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.product_name,
                    price: product.product_cost,
                    image: img_url + product.product_photo,
                  })
                }
              >
                🛒 Add to Cart
              </button>

              <button
                className={`btn w-100 mt-2 ${
                  isInWishlist(product.id) ? "btn-danger" : "btn-outline-danger"
                }`}
                onClick={() => toggleWishlist(product)}
              >
                {isInWishlist(product.id)
                  ? "❤️ Remove from Wishlist"
                  : "🤍 Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* PAGINATION */}
      <div className="d-flex justify-content-center mt-4 w-100 mb-4">
        <button
          className="btn btn-info me-2"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="btn btn-info ms-2"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GetProducts;