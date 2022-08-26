import "./styles.css";
import React from "react";

export default function App() {
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  const [start, setStart] = React.useState(false);
  const [pause, setPause] = React.useState(false);
  React.useEffect(() => {
    if (pause) return;
    if (start) {
      let countdown = setInterval(() => {
        console.log(seconds);
        if (seconds > 0) {
          setSeconds(seconds - 1);
          return;
        } else {
          if (minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            setStart(false);
            clearInterval(countdown);
          }
        }
      }, 1000);
      return () => clearInterval(countdown);
    }
  });
  const getMinutes = (e) => {
    setMinutes(parseInt(e.target.value, 10));
  };
  const getSeconds = (e) => {
    setSeconds(parseInt(e.target.value, 10));
  };
  const handleStart = () => {
    if (seconds > 60) {
      setMinutes(minutes + Math.floor(seconds / 60));
      setSeconds(seconds % 60);
    }
    setStart(true);
  };
  const handleReset = () => {
    setSeconds(0);
    setMinutes(0);
    document.getElementById("minutes").value = "";
    document.getElementById("seconds").value = "";
  };
  return (
    <div className="App">
      <label>
        <input id="minutes" onChange={getMinutes} type="number" />
        Minutes
      </label>
      <label>
        <input id="seconds" onChange={getSeconds} type="number" />
        Seconds
      </label>
      <button onClick={handleStart}>START</button>
      <button onClick={() => setPause(!pause)}>PAUSE / RESUME</button>
      <button onClick={handleReset}>RESET</button>
      <h1 data-testid="running-clock">{`${minutes
        .toString()
        .padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`}</h1>
    </div>
  );
}
