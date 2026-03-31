import React, { useState } from "react";
import Login from "./components/Login";
import Form from "./components/Form";
import Loading from "./components/Loading";
import Roadmap from "./components/Roadmap";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("login");
  const [roadmap, setRoadmap] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [history, setHistory] = useState([]);

  return (
    <div className={theme}>
      {screen !== "login" && <Header
        setScreen={setScreen}
        theme={theme}
        setTheme={setTheme}
      />}

      {screen === "login" && <Login
        setScreen={setScreen}
        history={history}
        setHistory={setHistory}
      />}
      {screen === "form" && (
        <Form
          setScreen={setScreen}
          setRoadmap={setRoadmap}
          history={history}
          setHistory={setHistory}
        />
      )}
      {screen === "loading" && <Loading />}
      {screen === "roadmap" && (
        <Roadmap
          roadmap={roadmap}
          setScreen={setScreen}
          history={history}
          setHistory={setHistory}
        />
      )}
    </div>
  );
}

export default App;