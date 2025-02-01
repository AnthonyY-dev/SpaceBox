import BarcodeReader from "@/components/custom/BarcodeReader";
import { Button, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { LuCamera } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [invalidMarker, setIM] = useState(false);
  const navigate = useNavigate();

  const handleEnterKey = (data: string) => {
    if (data == import.meta.env.VITE_BARCODE_PASSWORD) {
      navigate("/dashboard?code=" + data);
    } else {
      setIM(true);
      setTimeout(() => {
        setIM(false);
      }, 500);
    }
  };
  return (
    <div>
      <Image src="login.png" />
      <Text
        position={"absolute"}
        top={202}
        left={145}
        className={"text" + (invalidMarker ? " red" : "")}
        fontSize={"xl"}
      >
        Please scan the
        <br />
        access code
      </Text>
      <BarcodeReader handleEnterKey={handleEnterKey} />
    </div>
  );
};

export default Login;
