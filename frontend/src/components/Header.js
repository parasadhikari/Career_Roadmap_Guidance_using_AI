import React from "react";

function Header({ setScreen, theme, setTheme }) {
  return (
    <div style={{ padding: "10px", borderBottom: "1px solid #1e2d4a" }}>
      
      <b>CareerPath AI</b>

      {/* LOGOUT BUTTON */}
      <button
        className="small-btn"
        style={{ float: "right", marginLeft: "10px" }}
        onClick={() => {
          console.log("logout clicked");
          setScreen("login");
        }}
      >
        Logout
      </button>

    </div>
  );
}

export default Header;