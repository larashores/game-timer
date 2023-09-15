import React from "react";
import './App.css'

class Counter {
  counter: number;
  setCounter: (c: number) => void

  audio: HTMLAudioElement | undefined
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
    return `${String(minutes)}:${String(seconds).padStart(2, '0')}`;
  }

  start(audio: HTMLAudioElement | undefined) {
    this.audio = audio
    this.initial_time = Date.now()
    setTimeout(this.loop.bind(this), 1000);
  }

  loop() {
    const current_time = Date.now()
    const counter = Math.max(this.initial_count - Math.floor((current_time - this.initial_time) / 1000), 0)
    const timeout = 1000 * (this.initial_count - counter + 1) -  (current_time - this.initial_time)
    console.log("Here", Date.now() - this.initial_time, counter, timeout)
    this.setCounter(counter)
    if (counter > 0) {
      setTimeout(this.loop.bind(this), timeout);
    } else if (this.audio) {
      this.audio.play()
    }
  }
}


function App() {
  const length = 5;
  const [count, setCounter] = React.useState(length);  // eslint-disable-line react-hooks/rules-of-hooks
  const counter = new Counter(length, count, setCounter);

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
        <button id="timer" onClick={() => counter.start.bind(counter)(new Audio("beep.mp3"))}>{counter.display()}</button>
      </div>
    </>
  )
}

export default App
