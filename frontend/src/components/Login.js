import React from "react";

function Login({ setScreen, history, setHistory }) {
  return (
    <div className="login-container">

      {/* Background Effects */}
      <div className="bg-grid"></div>
      <div className="orb orb1"></div>
      <div className="orb orb2"></div>

      <div className="login-card">
        <h1 className="logo">Career<span>Path</span> AI</h1>
        <p className="subtitle">
          Your AI-powered roadmap to success 🚀
        </p>

        <input placeholder="Enter your email" />
        <input placeholder="Enter password" type="password" />
        
        <button
          onClick={() => {
            console.log("clicked");
            setHistory((prev) => [...prev, "login"]);
            setScreen("form");
          }}
        >
          ✦ Start Your Journey
        </button>
        <p className="hint">
          Demo mode — just click the button
        </p>
      </div>
    </div>
  );
}

export default Login;