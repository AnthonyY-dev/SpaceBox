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
import React, { useEffect, useState } from "react";
import supabase from "@/hooks/supabase";
import { Link } from "react-router-dom";
import Item from "@/types/Item";
import { LuX } from "react-icons/lu";

const Catalog = () => {
  var accessCode = useAuthenticated();

  const [data, setData] = useState<Item[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    async function loadItems() {
      const { data, error } = await supabase.from("items").select("*");
      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        setData(data);
        setLoading(false);
      }
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
          data?.map((itemData) => (
            <Link to={"/item/" + itemData.id + "?code=" + accessCode}>
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
          ))
        )}
      </Flex>
      <Link to={"/dashboard?code=" + accessCode}>
        <IconButton
          position={"fixed"}
          right="10px"
          top="10px"
          variant={"subtle"}
        >
          <LuX />
        </IconButton>
      </Link>
    </>
  );
};

export default Catalog;
