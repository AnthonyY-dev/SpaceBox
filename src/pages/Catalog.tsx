import { Avatar } from "@/components/ui/avatar";
import useAuthenticated from "@/hooks/useAuthenticated";
import {
  Button,
  Flex,
  IconButton,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import supabase from "@/hooks/supabase";
import { Link, useNavigate } from "react-router-dom";
import Item from "@/types/Item";
import { LuApple, LuPackage, LuSpace, LuX } from "react-icons/lu";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import Box from "@/types/Box";
import Space from "@/types/Space";
import BarcodeReader from "@/components/custom/BarcodeReader";

const Catalog = () => {
  var accessCode = useAuthenticated();

  const [dbItemData, setDbItemData] = useState<Item[] | null>(null);
  const [dbBoxesData, setDbBoxesData] = useState<Box[] | null>(null);
  const [dbSpacesData, setDbSpacesData] = useState<Space[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleBarcodeRead = (data: string) => {
    if (data.startsWith("ITEM")) {
      navigate("/item/" + data + "?code=" + accessCode);
    }
    if (data.startsWith("BOX")) {
      navigate("/box/" + data + "?code=" + accessCode);
    }
    if (data.startsWith("SPACE")) {
      navigate("/space/" + data + "?code=" + accessCode);
    }
  };

  useEffect(() => {
    async function loadItems() {
      const { data: itemsData, error: error1 } = await supabase
        .from("items")
        .select("*");
      const { data: boxesData, error: error2 } = await supabase
        .from("boxes")
        .select("*");
      const { data: spacesData, error: error3 } = await supabase
        .from("spaces")
        .select("*");
      if (error1) {
        setError(error1.message);
      } else {
        setDbItemData(itemsData);
      }
      if (error2) {
        setError(error2.message);
      } else {
        setDbBoxesData(boxesData);
      }
      if (error3) {
        setError(error3.message);
      } else {
        setDbSpacesData(spacesData);
      }
      setLoading(false);
    }
    loadItems();
  }, []);

  return (
    <>
      <Flex
        //   bg="dodgerblue"
        width="480px"
        h="320px"
        padding={"15px"}
        alignItems={"center"}
        flexDir="column"
        gap={"10px"}
      >
        {error && (
          <Button
            variant="outline"
            width="450px"
            h="40px"
            display={"flex"}
            flexDir={"row"}
            colorPalette={"red"}
            disabled
          >
            <Avatar
              name="Error"
              shape={"rounded"}
              height={"80%"}
              width={"32px"}
              position={"absolute"}
              left="10px"
            />
            <Text>Error: {error}</Text>
          </Button>
        )}
        {loading ? (
          <VStack margin={"auto"}>
            <Spinner />
            <Text>Loading...</Text>
          </VStack>
        ) : (
          <AccordionRoot marginTop={"40px"} collapsible>
            <AccordionItem value="items" key="items">
              <AccordionItemTrigger key="1">
                <Button
                  variant="outline"
                  width="450px"
                  h="40px"
                  display={"flex"}
                  flexDir={"row"}
                  colorPalette={"green"}
                >
                  <LuApple color="white" />{" "}
                  <span className="text" style={{ color: "white" }}>
                    Items
                  </span>
                </Button>
              </AccordionItemTrigger>
              <AccordionItemContent
                display={"flex"}
                flexDir={"column"}
                gap="10px"
                key="2"
              >
                {dbItemData?.map((itemData) => (
                  <Link
                    to={"/item/" + itemData.id + "?code=" + accessCode}
                    key={itemData.id}
                  >
                    <Button
                      variant="outline"
                      width="450px"
                      h="40px"
                      display={"flex"}
                      flexDir={"row"}
                    >
                      <Avatar
                        name={itemData.name}
                        shape={"rounded"}
                        height={"80%"}
                        width={"32px"}
                        position={"absolute"}
                        left="10px"
                        src={itemData.imageUrl}
                      />
                      <Text>{itemData.name}</Text>
                    </Button>
                  </Link>
                ))}
              </AccordionItemContent>
            </AccordionItem>
            <AccordionItem value="boxes" key="boxes">
              <AccordionItemTrigger key="1">
                <Button
                  variant="outline"
                  width="450px"
                  h="40px"
                  display={"flex"}
                  flexDir={"row"}
                  colorPalette={"yellow"}
                >
                  <LuPackage color="white" />{" "}
                  <span className="text" style={{ color: "white" }}>
                    Boxes
                  </span>
                </Button>
              </AccordionItemTrigger>
              <AccordionItemContent
                display={"flex"}
                flexDir={"column"}
                gap="10px"
                key="2"
              >
                {dbBoxesData?.map((boxData) => (
                  <Link
                    to={"/box/" + boxData.id + "?code=" + accessCode}
                    key={boxData.id}
                  >
                    <Button
                      variant="outline"
                      width="450px"
                      h="40px"
                      display={"flex"}
                      flexDir={"row"}
                    >
                      <Avatar
                        name={boxData.boxName}
                        shape={"rounded"}
                        height={"80%"}
                        width={"32px"}
                        position={"absolute"}
                        left="10px"
                        src={boxData.boxImageUrl}
                      />
                      <Text>{boxData.boxName}</Text>
                    </Button>
                  </Link>
                ))}
              </AccordionItemContent>
            </AccordionItem>
            <AccordionItem value="spaces" key="spaces">
              <AccordionItemTrigger key="1">
                <Button
                  variant="outline"
                  width="450px"
                  h="40px"
                  display={"flex"}
                  flexDir={"row"}
                  colorPalette={"blue"}
                >
                  <LuSpace color="white" />{" "}
                  <span className="text" style={{ color: "white" }}>
                    Spaces
                  </span>
                </Button>
              </AccordionItemTrigger>
              <AccordionItemContent
                key="2"
                display={"flex"}
                flexDir={"column"}
                gap="10px"
              >
                {dbSpacesData?.map((spaceData) => (
                  <Link
                    to={"/space/" + spaceData.id + "?code=" + accessCode}
                    key={spaceData.id}
                  >
                    <Button
                      variant="outline"
                      width="450px"
                      h="40px"
                      display={"flex"}
                      flexDir={"row"}
                    >
                      <Avatar
                        name={spaceData.spaceName}
                        shape={"rounded"}
                        height={"80%"}
                        width={"32px"}
                        position={"absolute"}
                        left="10px"
                        src={spaceData.spaceImageUrl}
                      />
                      <Text>{spaceData.spaceName}</Text>
                    </Button>
                  </Link>
                ))}
              </AccordionItemContent>
            </AccordionItem>
          </AccordionRoot>
        )}
      </Flex>
      <Link to={"/dashboard?code=" + accessCode}>
        <IconButton
          position={"fixed"}
          right="20px"
          top="10px"
          variant={"subtle"}
        >
          <LuX />
        </IconButton>
      </Link>
      <BarcodeReader handleEnterKey={handleBarcodeRead} delay={250} />
    </>
  );
};

export default Catalog;
