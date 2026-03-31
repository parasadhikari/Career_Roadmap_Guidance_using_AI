import React, { useState } from "react";
import axios from "axios";


function Form({ setScreen, setRoadmap, history, setHistory }) {
  const [role, setRole] = useState("");
  const [skill, setSkill] = useState("Beginner");
  const [date, setDate] = useState("");

const generate = async () => {
  if (!role || !date) {
    alert("⚠️ Please enter job role and interview date");
    return;
  }

  const today = new Date();
  const selectedDate = new Date(date);

  if (selectedDate <= today) {
    alert("⚠️ Please select a future date");
    return;
  }

  const days = Math.ceil((selectedDate - today) / 86400000);

  setScreen("loading");

  try {
    const res = await axios.post(
  "https://career-roadmap-guidance-using-ai.onrender.com/generate-roadmap",
  {
    role,
    skill,
    weeks,
    hours: 10
  }
);

    setRoadmap(res.data);
    setHistory((prev) => [...prev, "form"]);
    setScreen("roadmap");

  } catch (err) {
    console.log(err);
    alert("Error generating roadmap");
    setScreen("form");
  }
};

  return (
    <div className="container">

      <div className="card roadmap-card">

        <h2 className="heading">Build Your Roadmap 🚀</h2>
        <p className="motivation">
          Every day counts. Start now and stay ahead of 90% of candidates.
        </p>

        <div style={{ marginBottom: "10px" }}>
  <button
    className="small-btn"
    onClick={() => {
      const prev = history[history.length - 1];
      if (prev) {
        setHistory(history.slice(0, -1));
        setScreen(prev);
      }
    }}
  >
    ⬅ Previous
  </button>
</div>

        {/* ROLE INPUT */}
        <input
          placeholder="🎯 Your dream role (e.g. Software Engineer)"
          onChange={(e) => setRole(e.target.value)}
        />

        {/* SKILL */}
        <select onChange={(e) => setSkill(e.target.value)}>
          <option>🌱 Beginner</option>
          <option>⚡ Intermediate</option>
          <option>🔥 Advanced</option>
        </select>

        {/* DATE */}
        <div className="date-section">
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
          <span className="date-hint">
            📅 Select your interview / exam date
          </span>
        </div>

        {/* COUNTDOWN */}
        {date && (
          <p className="countdown">
            ⏳ You have{" "}
            <b>
              {Math.ceil((new Date(date) - new Date()) / 86400000)} days
            </b>{" "}
            to prepare
          </p>
        )}

        {/* BUTTON */}
        <button className="generate-btn" onClick={generate}>
          ✦ Generate My Crazy Roadmap
        </button>

        <p className="bottom-text">
          ⚡ Your personalized AI roadmap will be ready in seconds
        </p>

      </div>
    </div>
  );
}

export default Form;