import React from "react";
import "./App.css";

function App() {
  const initialCount = 60;
  const [count, setCount] = React.useState(initialCount);
  const timer = React.useRef(0);
  const timeLeft = React.useRef(0);
  const lastUpdate = React.useRef(0);
  const paused = React.useRef(false);

  function display() {
    const minutes = Math.floor(count / 60);
    const seconds = count % 60;
    return `${String(minutes)}:${String(seconds).padStart(2, "0")}`;
  }

  function start(audio: HTMLAudioElement | undefined) {
    if (paused.current) {
      clearInterval(timer.current);
      lastUpdate.current = Date.now();
      timer.current = setInterval(step, 1000, audio);
      paused.current = false;
    } else if (timer.current) {
      clearInterval(timer.current);
      timeLeft.current -= Date.now() - lastUpdate.current;
      paused.current = true;
    } else {
      reset(audio);
    }
  }

  function reset(audio: HTMLAudioElement | undefined) {
    clearInterval(timer.current);
    timeLeft.current = initialCount * 1000;
    lastUpdate.current = Date.now();
    paused.current = false;
    setCount(initialCount);
    timer.current = setInterval(step, 1000, audio);
  }

  function step(audio: HTMLAudioElement | undefined) {
    timeLeft.current -= Date.now() - lastUpdate.current;
    lastUpdate.current = Date.now();
    setCount(Math.max(Math.ceil(timeLeft.current / 1000), 0));
    if (timeLeft.current <= 0) {
      clearInterval(timer.current);
      timer.current = 0;
      audio?.play();
    }
  }

  return (
    <>
      <div id="header">
        <h1 id="title">Game Timer</h1>
        <label id="menu">
          <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
            <line x1="5" y1="10" x2="25" y2="10" stroke="black" strokeWidth="2" />
            <line x1="5" y1="15" x2="25" y2="15" stroke="black" strokeWidth="2" />
            <line x1="5" y1="20" x2="25" y2="20" stroke="black" strokeWidth="2" />
          </svg>
        </label>
      </div>
      <div id="content">
        <button
          id="timer"
          onClick={() => {
            const audio = new Audio("beep.mp3");
            start(audio);
          }}
          onDoubleClick={() => {
            const audio = new Audio("beep.mp3");
            reset(audio);
          }}
        >
          {display()}
        </button>
      </div>
    </>
  );
}

export default App;
