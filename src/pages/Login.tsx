import BarcodeReader from "@/components/custom/BarcodeReader";
import { Image, Text } from "@chakra-ui/react";

const Login = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEnterKey = (data: string) => {};
  return (
    <div>
      <Image src="login.png" />
      <Text position={"absolute"} top={202} left={145} className="loginText">
        Please scan the
        <br />
        access code
      </Text>
      <BarcodeReader ref={inputRef} handleEnterKey={handleEnterKey} />
    </div>
  );
};

export default Login;
