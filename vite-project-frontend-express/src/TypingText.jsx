import React, { useEffect, useState } from "react";

const TypingText = ({ text, className = "" }) => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const totalDuration = 3500; // same as typing animation duration
    const timer = setTimeout(() => setDone(true), totalDuration);
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <span className={`typing-text ${done ? "done" : ""} ${className}`}>
      {text}
    </span>
  );
};

export default TypingText;
