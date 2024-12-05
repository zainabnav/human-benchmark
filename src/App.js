import React, { useState } from "react";

export default function ReactionTest() {
  const [screen, setScreen] = useState("initial"); 
  const [message, setMessage] = useState(
    "When the red box turns green, click as quickly as you can. Click anywhere to start."
  );
  const [reactionTimes, setReactionTimes] = useState([]); 
  const [startTime, setStartTime] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const startTest = () => {
    setScreen("red");
    setMessage("Wait for Green...");

    const delay = Math.random() * 3000 + 2000; 

    const id = setTimeout(() => {
      setScreen("green");
      setMessage("Click now!");
      setStartTime(Date.now());
    }, delay);

    setTimeoutId(id);
  };

  const handleClick = () => {
    if (screen === "initial") {
      startTest();
    } else if (screen === "red") {
      clearTimeout(timeoutId);
      setScreen("blue");
      setMessage("Too soon! Click 'Try Again' to restart.");
    } else if (screen === "blue") {
      startTest();
    } else if (screen === "green") {
    const endTime = Date.now();
      const reactionTime = endTime - startTime;

      setReactionTimes((prev) => {
        const updatedTimes = [...prev, reactionTime];

        if (updatedTimes.length === 5) {
          setScreen("results");
          setMessage("Your average reaction time:" + calculateAverage(updatedTimes) + "ms");
        } else {
          setScreen("blue");
          setMessage(`Your reaction time: ${reactionTime} ms. Click to try again.`);
        }
return updatedTimes;
      });
    }
  };

  const calculateAverage = (times) => {
    return Math.round(times.reduce((a, b) => a + b, 0) / times.length);
  };

  const resetTest = () => {
    setScreen("initial");
    setMessage(
      "When the red box turns green, click as quickly as you can. Click anywhere to start."
    );
    setReactionTimes([]);
    setStartTime(null);
    setTimeoutId(null);
  };

  return (
    <div
      onClick={
        screen !== "results" ? handleClick : undefined 
      }
    style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:
          screen === "initial"
            ? "blue" 
            : screen === "red"
            ? "red"
            : screen === "blue"
            ? "blue"
            : screen === "green"
            ? "green"
            : "blue", 
        color: "white",
        fontSize: "24px",
        textAlign: "center",
        cursor: screen !== "results" ? "pointer" : "default", 
  }}
    >
      <div>
        {screen === "initial" && (
          <>
            <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>REACTION TEST</h1>
            <p>{message}</p>
          </>
        )}
        {screen !== "initial" && <p>{message}</p>}

        {screen === "blue" && reactionTimes.length < 5 && (
          <button
            onClick={() => startTest()}
            style={{
              margin: "20px",
              padding: "10px 20px",
              backgroundColor: "white",
              color: "black",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Try Again
          </button>
        )}

        {screen === "results" && (
          <div>
            <h2>{message}</h2>
            <button
              onClick={resetTest}
              style={{
                margin: "10px",
                padding: "10px 20px",
                backgroundColor: "white",
                color: "black",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Try Again
            </button>
            <button
              onClick={() => alert("Score Saved!")}
              style={{
                margin: "10px",
                padding: "10px 20px",
                backgroundColor: "white",
                color: "black",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Save Score
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
