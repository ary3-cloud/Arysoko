import React, { useState, useEffect, useRef } from "react"
import axios from "axios"

const Chatbot = () => {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: [
        {
          type: "text",
          text: "Hey 👋 welcome to Arynest! Ask me about products anytime."
        }
      ]
    }
  ])

  const [products, setProducts] = useState([])
  const bottomRef = useRef(null)

  const API = "http://mary.alwaysdata.net/api/getproductdetails"
  const img_url = "http://mary.alwaysdata.net/static/images/"

  // ---------------- FETCH PRODUCTS ----------------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(API)
        setProducts(res.data || [])
      } catch (err) {
        console.log(err)
      }
    }

    fetchProducts()
  }, [])

  // ---------------- AUTO SCROLL ----------------
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // ---------------- BOT LOGIC ----------------
  const getBotReply = (msg) => {
    const text = msg.toLowerCase()

    // 👋 GREETING
    if (["hi", "hello", "hey"].some((t) => text.includes(t))) {
      return [
        {
          type: "text",
          text: "Hey 👋 welcome to Arynest! You can ask me anything about the products."
        }
      ]
    }

    // 🛍️ SHOW PRODUCTS
    if (text.includes("product")) {
      if (products.length === 0) {
        return [{ type: "text", text: "Loading products... ⏳" }]
      }

      return [
        { type: "text", text: "Here are some products 🛍️:" },
        ...products.slice(0, 3).map((p, i) => ({
          type: "product",
          showImage: i === 0,
          name: p.product_name || "Unnamed Product",
          price: p.product_cost || 0,
          image: img_url + (p.product_photo || "")
        }))
      ]
    }

    // 🤑 CHEAPEST PRODUCTS
    if (
      text.includes("cheap") ||
      text.includes("cheapest") ||
      text.includes("low price")
    ) {
      const sorted = [...products]
        .filter((p) => p.product_cost)
        .sort((a, b) => a.product_cost - b.product_cost)

      return [
        { type: "text", text: "🤑 Cheapest products:" },
        ...sorted.slice(0, 3).map((p, i) => ({
          type: "product",
          showImage: i === 0,
          name: p.product_name || "Unnamed Product",
          price: p.product_cost,
          image: img_url + (p.product_photo || "")
        }))
      ]
    }

    // 💎 MOST EXPENSIVE PRODUCTS
    if (
      text.includes("expensive") ||
      text.includes("highest") ||
      text.includes("premium") ||
      text.includes("most expensive")
    ) {
      const sorted = [...products]
        .filter((p) => p.product_cost)
        .sort((a, b) => b.product_cost - a.product_cost)

      return [
        { type: "text", text: "💎 Most expensive products:" },
        ...sorted.slice(0, 3).map((p, i) => ({
          type: "product",
          showImage: i === 0,
          name: p.product_name || "Unnamed Product",
          price: p.product_cost,
          image: img_url + (p.product_photo || "")
        }))
      ]
    }

    // 🔍 SEARCH PRODUCTS
    const matched = products.filter((p) =>
      (p.product_name || "").toLowerCase().includes(text)
    )

    if (matched.length > 0) {
      return matched.slice(0, 3).map((p, i) => ({
        type: "product",
        showImage: i === 0,
        name: p.product_name || "Unnamed Product",
        price: p.product_cost || 0,
        image: img_url + (p.product_photo || "")
      }))
    }

    // 💬 FALLBACK
    return [
      {
        type: "text",
        text: "I can help you with products 🛍️, cheapest 💰, and expensive 💎 items."
      }
    ]
  }

  // ---------------- SEND MESSAGE ----------------
  const sendMessage = () => {
    if (!input.trim()) return

    const userMsg = {
      sender: "user",
      text: input
    }

    setMessages((prev) => [...prev, userMsg])

    const botReply = getBotReply(input)

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }])
    }, 400)

    setInput("")
  }

  return (
    <div>

      {/* FLOAT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "#ce4fceff",
          color: "white",
          border: "none",
          fontSize: 22,
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
        }}
      >
        💬🛍️
      </button>

      {/* CHAT BOX */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 90,
            right: 20,
            width: 340,
            height: 450,
            background: "white",
            border: "1px solid #ddd",
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
          }}
        >

          {/* HEADER */}
          <div
            style={{
              background: "#ee66e3ff",
              color: "white",
              padding: 10,
              fontWeight: "bold"
            }}
          >
            Arynest Assistant 🛍️
          </div>

          {/* MESSAGES */}
          <div style={{ flex: 1, padding: 10, overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  marginBottom: 10
                }}
              >
                {/* USER MESSAGE */}
                {msg.sender === "user" && (
                  <span
                    style={{
                      background: "#ce4fceff",
                      color: "white",
                      padding: 8,
                      borderRadius: 10,
                      display: "inline-block"
                    }}
                  >
                    {msg.text}
                  </span>
                )}

                {/* BOT MESSAGE */}
                {msg.sender === "bot" &&
                  Array.isArray(msg.text) &&
                  msg.text.map((item, j) => (
                    <div key={j} style={{ marginBottom: 10 }}>

                      {/* TEXT */}
                      {item.type === "text" && (
                        <span
                          style={{
                            background: "#eee",
                            padding: 8,
                            borderRadius: 10,
                            display: "inline-block"
                          }}
                        >
                          {item.text}
                        </span>
                      )}

                      {/* PRODUCT CARD */}
                      {item.type === "product" && (
                        <div
                          style={{
                            width: 200,
                            border: "1px solid #ddd",
                            borderRadius: 10,
                            padding: 8,
                            background: "white"
                          }}
                        >
                          {item.showImage && item.image && (
                            <img
                              src={item.image}
                              alt=""
                              style={{
                                width: "100%",
                                borderRadius: 8,
                                marginBottom: 5
                              }}
                            />
                          )}

                          <p style={{ margin: 0 }}>{item.name}</p>
                          <strong style={{ color: "#ce4fceff" }}>
                            KES {item.price}
                          </strong>
                        </div>
                      )}

                    </div>
                  ))}
              </div>
            ))}

            <div ref={bottomRef}></div>
          </div>

          {/* INPUT */}
          <div style={{ display: "flex", borderTop: "1px solid #ddd" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about products..."
              style={{
                flex: 1,
                padding: 10,
                border: "none",
                outline: "none"
              }}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              onClick={sendMessage}
              style={{
                padding: "10px 15px",
                background: "#ce4fceff",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
            >
              ➤
            </button>
          </div>

        </div>
      )}
    </div>
  )
}

export default Chatbot