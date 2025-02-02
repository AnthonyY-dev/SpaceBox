import { useColorMode } from "@/components/ui/color-mode";
import { Button } from "@chakra-ui/react";

const Settings = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <div>
      <Button variant="outline" onClick={toggleColorMode}>
        Toggle Mode
      </Button>
    </div>
  );
};

export default Settings;
