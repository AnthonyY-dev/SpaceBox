import DeleteBoxModal from "@/components/custom/DeleteBoxModal";
import { Avatar } from "@/components/ui/avatar";
import isoToMMDDYY from "@/functions/isoToMMDDYY";
import supabase from "@/hooks/supabase";
import useAuthenticated from "@/hooks/useAuthenticated";
import Box from "@/types/Box";
import Item from "@/types/Item";
import {
  VStack,
  Text,
  Spinner,
  Flex,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuX } from "react-icons/lu";
import { Link, useNavigate, useParams } from "react-router-dom";

const BoxDataPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const accessCode = useAuthenticated();

  const [box, setBox] = useState<Box | null>(null);
  const [items, setItems] = useState<Item[] | null>(null);

  const [bLoading, setBLoading] = useState<boolean>(true);
  const [iLoading, setILoading] = useState<boolean>(true);

  async function loadItems() {
    const { data: BoxData, error: BoxError } = await supabase
      .from("boxes")
      .select("*")
      .eq("id", id);
    if (BoxData?.length == 0) {
      navigate("/catalog?code=" + accessCode);
    }
    if (!BoxError) {
      setBox(BoxData?.[0]);
      setBLoading(false);
      const { data: ItemsData, error: _ } = await supabase
        .from("items")
        .select("*");

      if (!_) {
        setItems(ItemsData);
        setILoading(false);
      }
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <>
      {bLoading || iLoading ? (
        <VStack margin="auto" marginTop={"125px"}>
          <Spinner />
          <Text>Loading...</Text>
        </VStack>
      ) : (
        <>
          <Flex padding={"20px"} justifyContent={"space-evenly"} flexDir="row">
            <VStack>
              <Flex flexDir={"column"} gap="10px">
                <Avatar
                  name={box?.boxName}
                  shape="rounded"
                  style={{ height: 150, width: 150 }}
                  src={box?.boxImageUrl}
                />
                <Link to={"/space/" + box?.space + "?code=" + accessCode}>
                  <Button
                    variant={"outline"}
                    colorPalette={"cyan"}
                    width={"150px"}
                  >
                    View Space
                  </Button>
                </Link>
                <DeleteBoxModal boxData={box} accessCode={accessCode} />
              </Flex>
            </VStack>

            <VStack>
              <Flex
                bg="#2B2B2B"
                height="100px"
                width="260px"
                borderRadius={7}
                padding={"3px"}
                alignItems={"center"}
                flexDir="column"
              >
                <Text className="text">{box?.boxName}</Text>
                <Text className="pop">
                  Created on {isoToMMDDYY(box?.created_at)}
                </Text>
                <Text className="pop" color="gray.500">
                  Item Count: {box?.items.length}
                </Text>
                <Text fontSize={"2xs"} color={"#2F2F2F"}>
                  Box ID: {box?.id}
                </Text>
              </Flex>
              <Flex
                // bg="tomato"
                width={"260px"}
                minHeight={"50px"}
                flexDir={"column"}
                gap={"10px"}
              >
                {box?.items.map((itemInfo) => (
                  <Link
                    to={
                      "/item/" +
                      items?.filter((item) => item.id == itemInfo)[0].id +
                      "?code=" +
                      accessCode
                    }
                    key={items?.filter((item) => item.id == itemInfo)[0].id}
                  >
                    <Button
                      width={"full"}
                      variant={"outline"}
                      colorPalette={"yellow"}
                    >
                      <Avatar
                        width={"32px"}
                        height={"32px"}
                        shape={"rounded"}
                        name={
                          items?.filter((item) => item.id == itemInfo)[0].name
                        }
                        src={
                          items?.filter((item) => item.id == itemInfo)[0]
                            .imageUrl
                        }
                      ></Avatar>
                      {items?.filter((item) => item.id == itemInfo)[0].name}
                    </Button>
                  </Link>
                ))}
              </Flex>
            </VStack>
          </Flex>
          <Link to={"/catalog?code=" + accessCode}>
            <IconButton
              position={"absolute"}
              right="10px"
              top="10px"
              variant={"subtle"}
            >
              <LuX />
            </IconButton>
          </Link>
        </>
      )}
    </>
  );
};

export default BoxDataPage;
