import React, { useEffect, useRef } from "react";

interface Props {
  handleEnterKey: (data: string) => void;
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
    // Force focus back to the input when the user tries to deselect it
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key != "Enter") {
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
      // display={"none"}
      ref={inputRef}
      style={{ opacity: 0, position: "absolute", top: -50 }}
      onKeyDown={handleKeyDown}
    />
  );
};

export default BarcodeReader;
