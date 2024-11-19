import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // Step 1: Use useEffect to start and manage the countdown
  useEffect(() => {
    // If timeRemaining reaches 0, reset the timer and trigger onAnswered(false)
    if (timeRemaining === 0) {
      setTimeRemaining(10);
      onAnswered(false);
      return;
    }

    // Step 2: Set a timeout to decrease the timeRemaining every second
    const timerId = setTimeout(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    // Step 3: Cleanup the timeout when timeRemaining changes or component unmounts
    return () => clearTimeout(timerId);
  }, [timeRemaining, onAnswered]); // Effect depends on timeRemaining and onAnswered

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset time when an answer is selected
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
