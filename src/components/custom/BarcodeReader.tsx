import React, { useEffect, useRef } from "react";

interface Props {
  ref: React.RefObject<HTMLInputElement>;
  handleEnterKey: (data: string) => void;
}

const BarcodeReader = (props: Props) => {
  useEffect(() => {
    // Lock focus on the input field when the component mounts
    if (props.ref.current) {
      props.ref.current.focus();
    }
  }, []);

  const handleBlur = () => {
    // Force focus back to the input when the user tries to deselect it
    if (props.ref.current) {
      props.ref.current.focus();
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key != "Enter") {
      return;
    }
    if (!props.ref.current) {
      return;
    }
    props.handleEnterKey(props.ref.current.value);
  };
  return (
    <input
      onBlur={handleBlur}
      // display={"none"}
      ref={props.ref}
      style={{ opacity: 0, position: "absolute", top: -50 }}
      onChange={(e) => {
        console.log(e.target.value);
      }}
      onKeyDown={handleKeyDown}
    />
  );
};

export default BarcodeReader;
