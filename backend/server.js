import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

import path from "path";
dotenv.config({ path: path.resolve("./.env") });

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate-roadmap", async (req, res) => {
  const { role, skill, weeks, hours } = req.body;

const prompt = `
Generate a detailed roadmap for becoming a ${role}.

User level: ${skill}
Time available: ${weeks} weeks

Return ONLY JSON:

{
  "overview": "...",

  "requiredSkills": {
    "core": [],
    "secondary": []
  },

  "phases": [
    {
      "label": "Week 1",
      "title": "...",
      "topics": [],
      "tasks": []
    }
  ],

  "tools": [
    {
      "name": "...",
      "purpose": "..."
    }
  ],

  "interviewTips": [
    {
      "title": "...",
      "description": "..."
    }
  ],

  "interviewQuestions": [
    {
      "question": "...",
      "answer": "..."
    }
  ]
}
`;

  try {
   const response = await axios.post(
  "https://api.groq.com/openai/v1/chat/completions",
  {
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    }
  }
);

let text = response.data.choices[0].message.content;

// Clean JSON
text = text.replace(/```json|```/g, "").trim();

// Safe parse
const json = JSON.parse(text.match(/{[\s\S]*}/)[0]);

res.json(json);

  } catch (error) {
    console.error("ERROR:", error.response?.data || error.message);
    res.status(500).json({ error: "Gemini failed" });
  }
});

app.listen(5000, () => console.log("✅ Gemini Backend running on http://localhost:5000"));
console.log("KEY:", process.env.GROQ_API_KEY);