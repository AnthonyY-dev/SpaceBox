import React, { useEffect, useRef } from "react";

interface Props {
  handleEnterKey: (data: string) => void;
  delay?: number;
}

const BarcodeReader = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Lock focus on the input field when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleBlur = () => {
    // Ensure the input is only refocused if it's actually blurred
    setTimeout(() => {
      if (inputRef.current && document.activeElement !== inputRef.current) {
        inputRef.current.focus();
      }
    }, props.delay || 0);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "Enter") {
      return;
    }

    if (!inputRef.current) {
      return;
    }
    props.handleEnterKey(inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <input
      onBlur={handleBlur}
      ref={inputRef}
      style={{ opacity: 0, position: "absolute", top: -50 }}
      onKeyDown={handleKeyDown}
    />
  );
};

export default BarcodeReader;
