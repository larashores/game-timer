import React from "react";
import "./App.css";


function App() {
  const initialCount = 5;
  const [count, setCount] = React.useState(initialCount);
  const timer = React.useRef(0);
  const initialTime = React.useRef(0)

  function display() {
    const minutes = Math.floor(count / 60);
    const seconds = count % 60;
    return `${String(minutes)}:${String(seconds).padStart(2, "0")}`;
  }

  function start(audio: HTMLAudioElement | undefined) {
    clearInterval(timer.current);
    setCount(initialCount)
    initialTime.current = Date.now()
    timer.current = setInterval(loop, 1000, audio);
  }

  function loop(audio: HTMLAudioElement | undefined) {
    const left = Math.ceil(initialCount - (Date.now() - initialTime.current) / 1000)
    setCount(left);
    if (left == 0) {
      clearInterval(timer.current);
      audio?.play();
    }
  }

  return (
    <>
      <div>
        <h1 id="title">Game Timer</h1>
        <label id="menu">
          {/* <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
            <line x1="5" y1="10" x2="25" y2="10" stroke="black" stroke-width="2" />
            <line x1="5" y1="15" x2="25" y2="15" stroke="black" stroke-width="2" />
            <line x1="5" y1="20" x2="25" y2="20" stroke="black" stroke-width="2" />
          </svg> */}
        </label>
      </div>
      <div id="content">
        <button id="timer" onClick={start.bind(null, new Audio("beep.mp3"))}>
          {display()}
        </button>
      </div>
    </>
  );
}

export default App;
