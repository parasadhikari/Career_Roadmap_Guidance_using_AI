import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Roadmap({ roadmap, setScreen, history, setHistory }) {

  const [openIndex, setOpenIndex] = useState(null);
  const [expandAll, setExpandAll] = useState(false);
  const [completedTasks, setCompletedTasks] = useState({});

  const toggleTask = (phaseIndex, taskIndex) => {
    const key = `${phaseIndex}-${taskIndex}`;
    setCompletedTasks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const downloadPDF = async () => {
    const element = document.getElementById("roadmap-content");

    setExpandAll(true); // open all

    setTimeout(async () => {
      element.classList.add("pdf-mode");

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff"
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= 295;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= 295;
      }

      pdf.save("career-roadmap.pdf");

      element.classList.remove("pdf-mode");
      setExpandAll(false);
    }, 500);
  };

  return (
    <div className="container" id="roadmap-content">
      <h2>🚀 Your Roadmap</h2>

      {/* Overview */}
      <div className="card">
        <h3>Overview</h3>
        <p>{roadmap?.overview || "No overview available"}</p>
      </div>

      {/* Skills */}
      <div className="card">
        <h3>🎯 Core Skills</h3>

        <div className="skills-grid">
          {roadmap?.requiredSkills?.core?.map((s, i) => (
            <span className="skill-badge primary" key={i}>
              {typeof s === "object" ? s.name : s}
            </span>
          ))}
        </div>

        <h4 style={{ marginTop: "15px" }}>Supporting Skills</h4>
        <div className="skills-grid">
          {roadmap?.requiredSkills?.secondary?.map((s, i) => (
            <span className="skill-badge secondary" key={i}>
              {typeof s === "object" ? s.name : s}
            </span>
          ))}
        </div>
      </div>

      {/* Study Plan */}
      <div className="card">
        <h3>Study Plan</h3>

        <div className="timeline">
          {roadmap?.phases?.map((p, i) => (
            <div className="timeline-item" key={i}>

              <div className="timeline-left">
                <div style={{ fontSize: "12px", color: "#f0a500" }}>
                  {p.label || `Week ${i + 1}`}
                </div>
                <div className="timeline-dot"></div>
              </div>

              <div className="timeline-content">
                <h4
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  style={{ cursor: "pointer", color: "#f0a500" }}
                >
                  {(expandAll || openIndex === i) ? "▼" : "▶"} {p.title}
                </h4>

                {(expandAll || openIndex === i) && (
                  <>
                    {/* Topics */}
                    {p.topics?.map((t, j) => (
                      <div key={j}>
                        🔹 {typeof t === "object" ? t.name || t.description : t}
                      </div>
                    ))}

                    {/* Tasks */}
                    {p.tasks
                      ?.filter((task) => {
                        if (typeof task === "string") return task.trim() !== "";
                        if (typeof task === "object") return task.description?.trim();
                        return false;
                      })
                      .map((task, j) => {
                        const key = `${i}-${j}`;
                        const isChecked = completedTasks[key];

                        return (
                          <div key={j}>
                            <input
                              type="checkbox"
                              checked={isChecked || false}
                              onChange={() => toggleTask(i, j)}
                            />

                            <span
                              style={{
                                marginLeft: "8px",
                                textDecoration: isChecked ? "line-through" : "none",
                                opacity: isChecked ? 0.6 : 1,
                              }}
                            >
                              {typeof task === "object"
                                ? `${task.description} ${task.duration ? `(${task.duration})` : ""}`
                                : task}
                            </span>
                          </div>
                        );
                      })}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
  <h3>🛠 Tools</h3>

  {roadmap?.tools?.length > 0 ? (
    roadmap.tools.map((t, i) => (
      <div key={i} className="tool-item">
        🔧 <b>{t.name}</b> — {t.purpose}
      </div>
    ))
  ) : (
    <p>No tools available</p>
  )}
</div>
<div className="card">
  <h3>❓ Interview Questions</h3>

  {roadmap?.interviewQuestions?.length > 0 ? (
    roadmap.interviewQuestions.map((q, i) => (
      <div className="question-card" key={i}>
        <p><b>Q:</b> {q.question}</p>
        <p><b>A:</b> {q.answer}</p>
      </div>
    ))
  ) : (
    <p>No questions available</p>
  )}
</div>
<div className="card">
  <h3>💡 Interview Tips</h3>

  {roadmap?.interviewTips?.length > 0 ? (
    roadmap.interviewTips.map((tip, i) => (
      <div key={i} className="tip-item">
        <b>💡 {tip.title}</b>
        <p>{tip.description}</p>
      </div>
    ))
  ) : (
    <p>No tips available</p>
  )}
</div>
      {/* Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <div>
          <button className="small-btn" onClick={downloadPDF}>
            📄 Download
          </button>

          <button className="small-btn" onClick={() => setScreen("form")}>
            🔙 Back to Edit
          </button>
        </div>

        <button
          style={{ background: "red", color: "white" }}
          onClick={() => setScreen("form")}
        >
          New Roadmap
        </button>
      </div>
    </div>
  );
}

export default Roadmap;