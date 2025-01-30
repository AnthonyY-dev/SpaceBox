import BarcodeReader from "@/components/custom/BarcodeReader";
import MessageBox from "@/components/custom/MessageBox";
import useAuthenticated from "@/hooks/useAuthenticated";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { LuPackage, LuPlus, LuSearch, LuSettings } from "react-icons/lu";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const accessCode = useAuthenticated();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const msg = searchParams.get("msg");
  console.log(msg);
  const handleEnterKey = (data: string) => {
    if (data.startsWith("ITEM")) {
      navigate("/item/" + data + "?code=" + accessCode);
    }
  };

  return (
    <div>
      <Image src="dashboard.png" />
      <Link to={"/find?code=" + accessCode}>
        <Button
          position={"absolute"}
          top={"25px"}
          left="32px"
          h="156px"
          w="185px"
          bgColor="#ff5757"
          className="dashBtn"
        >
          <Flex
            w="full"
            h="full"
            alignItems={"center"}
            flexDir={"column"}
            padding={"10px"}
            justifyContent={"space-evenly"}
          >
            <LuSearch color="white" style={{ width: 75, height: 75 }} />
            <Text className="text" color="white" fontSize={"2xl"}>
              Find Location
            </Text>
          </Flex>
        </Button>
      </Link>
      <Link to={"/catalog?code=" + accessCode}>
        <Button
          position={"absolute"}
          top={"25px"}
          right="32px"
          h="156px"
          w="185px"
          bgColor="#99ff5b"
          className="dashBtn"
        >
          <Flex
            w="full"
            h="full"
            alignItems={"center"}
            flexDir={"column"}
            padding={"10px"}
            justifyContent={"space-evenly"}
          >
            <LuPackage color="#2B2B2B" style={{ width: 75, height: 75 }} />
            <Text className="text" color="#2B2B2B" fontSize={"2xl"}>
              Catalog
            </Text>
          </Flex>
        </Button>
      </Link>
      <Link to={"/settings?code=" + accessCode}>
        <Button
          position={"absolute"}
          bottom={"15px"}
          right="32px"
          h="101px"
          w="185px"
          bgColor="#545454"
          className="dashBtn"
        >
          <Flex
            w="full"
            h="full"
            alignItems={"center"}
            flexDir={"column"}
            padding={"10px"}
            justifyContent={"space-evenly"}
          >
            <Text
              className="text"
              color="white"
              fontSize={"2xl"}
              display={"flex"}
              gap="7px"
              alignItems={"center"}
            >
              <LuSettings style={{ width: 50, height: 50 }} />
              Settings
            </Text>
          </Flex>
        </Button>
      </Link>
      <Link to={"/new?code=" + accessCode}>
        <Button
          position={"absolute"}
          bottom={"15px"}
          left="32px"
          h="101px"
          w="185px"
          bgColor="#38b6ff"
          className="dashBtn"
        >
          <Flex
            w="full"
            h="full"
            alignItems={"center"}
            flexDir={"column"}
            padding={"10px"}
            justifyContent={"space-evenly"}
          >
            <Text
              className="text"
              color="white"
              fontSize={"2xl"}
              display={"flex"}
              gap="7px"
              alignItems={"center"}
            >
              <LuPlus style={{ width: 50, height: 50 }} />
              New
            </Text>
          </Flex>
        </Button>
      </Link>
      {msg && <MessageBox accessCode={accessCode} msg={msg} />}
      <BarcodeReader handleEnterKey={handleEnterKey} />
    </div>
  );
};

export default Dashboard;
