import React, { useEffect, useState } from "react"

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true"
  })

  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = "#121212"
      document.body.style.color = "#ffffff"
      localStorage.setItem("darkMode", "true")
    } else {
      document.body.style.backgroundColor = "#ffffff"
      document.body.style.color = "#000000"
      localStorage.setItem("darkMode", "false")
    }
  }, [darkMode])

  return (
    <div
      onClick={() => setDarkMode((prev) => !prev)}
      style={{
        width: 55,
        height: 28,
        borderRadius: 50,
        background: darkMode ? "#4f46e5" : "#ccc",
        display: "flex",
        alignItems: "center",
        padding: 3,
        cursor: "pointer",
        transition: "0.3s ease",
        position: "relative"
      }}
    >
      {/* circle */}
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "#fff",
          position: "absolute",
          left: darkMode ? 30 : 3,
          transition: "all 0.3s ease",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
        }}
      />

      {/* icons */}
      <span style={{ fontSize: 12, marginLeft: 6 }}>
        {darkMode ? "🌙" : "☀️"}
      </span>
    </div>
  )
}

export default DarkMode