import React, { useMemo } from "react"

const CATEGORY_RULES = {
  fashion: /\b(dress|shirt|clothing|jacket|fashion)\b/i,
  jewelry: /\b(ring|necklace|earring|bracelet|gold|silver)\b/i,
  handmade: /\b(handmade|craft|art|wood|decor)\b/i
}

const getCategory = (product) => {
  const text = `${product?.product_name || ""} ${product?.product_description || ""}`

  for (const [category, regex] of Object.entries(CATEGORY_RULES)) {
    if (regex.test(text)) return category
  }

  return "other"
}

const ProductFilter = ({
  products = [],
  search = "",
  setSearch,
  category = "",
  setCategory,
  maxPrice = "",
  setMaxPrice
}) => {

  const categories = useMemo(() => {
    const unique = new Set()

    products.forEach((product) => {
      unique.add(getCategory(product))
    })

    return Array.from(unique)
  }, [products])

  const isDirty =
    search.trim() !== "" ||
    category !== "" ||
    maxPrice !== ""

  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        marginBottom: 20,
        padding: 12,
        background: "#f8f9fa",
        borderRadius: 12
      }}
    >
      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: 8,
          borderRadius: 8,
          border: "1px solid #ccc",
          flex: 1,
          minWidth: 180
        }}
      />

      {/* Category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{
          padding: 8,
          borderRadius: 8,
          border: "1px solid #ccc",
          minWidth: 150
        }}
      >
        <option value="">ALL</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.toUpperCase()}
          </option>
        ))}
      </select>

      {/* Max Price */}
      <input
        type="number"
        placeholder="Max price"
        value={maxPrice}
        onChange={(e) =>
          setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
        }
        style={{
          padding: 8,
          borderRadius: 8,
          border: "1px solid #ccc",
          width: 140
        }}
      />

      {/* Reset */}
      <button
        onClick={() => {
          setSearch("")
          setCategory("")
          setMaxPrice("")
        }}
        disabled={!isDirty}
        style={{
          padding: "8px 12px",
          borderRadius: 8,
          border: "none",
          background: isDirty ? "#ce4fce" : "#ccc",
          color: "white",
          cursor: isDirty ? "pointer" : "not-allowed"
        }}
      >
        Reset
      </button>
    </div>
  )
}

export default ProductFilter