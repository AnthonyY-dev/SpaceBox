import BarcodeReader from "@/components/custom/BarcodeReader";
import useAuthenticated from "@/hooks/useAuthenticated";
import { Button, Image } from "@chakra-ui/react";

const Dashboard = () => {
  useAuthenticated();

  const handleEnterKey = (data: string) => {};

  return (
    <div>
      <Image src="dashboard.png" />
      <Button
        position={"absolute"}
        top={"25px"}
        left="32px"
        h="156px"
        w="185px"
        bgColor="#ff5757"
        onClick={() => {
          console.log("Red");
        }}
      />
      <Button
        position={"absolute"}
        top={"25px"}
        right="32px"
        h="156px"
        w="185px"
        bgColor="#99ff5b"
        onClick={() => {
          console.log("Green");
        }}
      />
      <Button
        position={"absolute"}
        bottom={"15px"}
        right="32px"
        h="101px"
        w="185px"
        bgColor="#545454"
        onClick={() => {
          console.log("Gray");
        }}
      />
      <Button
        position={"absolute"}
        bottom={"15px"}
        left="32px"
        h="101px"
        w="185px"
        bgColor="#38b6ff"
        onClick={() => {
          console.log("Blue");
        }}
      />
      <BarcodeReader handleEnterKey={handleEnterKey} />
    </div>
  );
};

export default Dashboard;
