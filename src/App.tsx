import React from "react";
import './App.css'

class Counter {
  counter: number;
  setCounter: (c: number) => void

  initial_count: number = 0;
  initial_time: number = 0;

  constructor(initial: number, seconds: number, setCounter: (c: number) => void) {
    this.initial_count = initial;
    this.counter = seconds;
    this.setCounter = setCounter;
  }
  display() {
    const minutes = Math.floor(this.counter / 60);
    const seconds = this.counter % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  start() {
    this.initial_time = Date.now()
    setTimeout(this.loop.bind(this), 1000);
  }

  loop() {
    const current_time = Date.now()
    this.setCounter(Math.max(this.initial_count - Math.floor((current_time - this.initial_time) / 1000), 0))
    if (this.counter > 0) {
      setTimeout(this.loop.bind(this), this.initial_count - this.counter + 1 -  (current_time - this.initial_time) / 1000);
    }
  }
}


function App() {
  const [count, setCounter] = React.useState(60);  // eslint-disable-line react-hooks/rules-of-hooks
  const counter = new Counter(60, count, setCounter);

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
        <button id="timer" onClick={counter.start.bind(counter)}>{counter.display()}</button>
      </div>
    </>
  )
}

export default App
