import React, { useMemo } from "react"

const PasswordStrength = ({ password }) => {

  const strength = useMemo(() => {
    let score = 0

    if (!password) {
      return { label: "Empty", color: "#999", score: 0 }
    }

    // Length
    if (password.length >= 6) score++
    if (password.length >= 10) score++

    // Complexity
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[@$!%*?&]/.test(password)) score++

    if (score <= 2) {
      return { label: "Weak", color: "#dc3545", score: 30 }
    }

    if (score === 3 || score === 4) {
      return { label: "Medium", color: "#fd7e14", score: 65 }
    }

    return { label: "Strong", color: "#198754", score: 100 }

  }, [password])

  return (
    <div className="mt-2">

      {/* PROGRESS BAR BACKGROUND */}
      <div
        style={{
          height: "6px",
          background: "#e9ecef",
          borderRadius: "10px",
          overflow: "hidden"
        }}
      >
        {/* PROGRESS BAR */}
        <div
          style={{
            width: `${strength.score}%`,
            height: "100%",
            backgroundColor: strength.color,
            transition: "width 0.3s ease"
          }}
        />
      </div>

      {/* LABEL */}
      <small style={{ color: strength.color, fontWeight: "bold" }}>
        {strength.label}
      </small>

    </div>
  )
}

export default PasswordStrength