import { Avatar } from "@/components/ui/avatar";
import useAuthenticated from "@/hooks/useAuthenticated";
import {
  Button,
  Flex,
  Group,
  IconButton,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  LuHouse,
  LuToggleLeft,
  LuToggleRight,
  LuTrash,
  LuX,
} from "react-icons/lu";
import { useParams, Link, useNavigate } from "react-router-dom";
import supabase from "@/hooks/supabase";
import Item from "@/types/Item";
import isoToMMDDYY from "@/functions/isoToMMDDYY";

function ItemDataPage() {
  const { id } = useParams();

  const accessCode = useAuthenticated();

  const [itemData, setItemData] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [boxName, setBoxName] = useState<string | null>(null);
  const navigate = useNavigate();

  async function loadItems() {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .eq("id", id);

    if (error) {
      setLoading(false);
    } else {
      if (data.length == 0) {
        navigate("/catalog?code=" + accessCode);
      }
      setItemData(data[0]);

      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    async function loadBoxName() {
      if (itemData != null) {
        const { data } = await supabase
          .from("boxes")
          .select("*")
          .eq("id", itemData.location)
          .single();
        setBoxName(data.boxName);
      }
    }
    loadBoxName();
  }, [itemData]);

  const toggleUsing = () => {
    async function toggleUsing() {
      await supabase
        .from("items")
        .update({ inUse: !itemData?.inUse })
        .eq("id", itemData?.id);
    }
    toggleUsing();

    window.location.reload();
  };
  return loading ? (
    <VStack margin="auto" marginTop={"125px"}>
      <Spinner />
      <Text>Loading...</Text>
    </VStack>
  ) : (
    <Flex padding={"20px"}>
      <Avatar
        shape="rounded"
        style={{ height: 150, width: 150 }}
        src={itemData?.imageUrl}
      />

      <Flex
        height="150px"
        width={"260px"}
        marginLeft={"20px"}
        borderRadius={5}
        backgroundColor={"#27272a"}
        padding={"5px"}
        flexDir={"column"}
      >
        <Text className="text" fontSize={"2xl"}>
          {itemData?.name}
        </Text>
        <Text className="text" fontSize={"large"} color={"#d6d6d6"}>
          {itemData?.inUse
            ? "Currently In Use"
            : 'Currently in "' + boxName + '"'}
        </Text>
        <Text className="text" color={"#b0b0b0"}>
          Created on {isoToMMDDYY(itemData?.created_at)}
        </Text>
      </Flex>

      <Group
        height="125px"
        width={"384px"}
        borderRadius={5}
        backgroundColor={"#27272a"}
        padding={"5px"}
        flexDir={"row"}
        position={"absolute"}
        bottom={"10px"}
        left="48px"
        right={"48px"}
        attached
      >
        <Button
          variant={"subtle"}
          height={"full"}
          width={"33.333%"}
          flexDir={"column"}
          className="text"
          bg={itemData?.inUse ? "green.500" : "red.500"}
          onClick={toggleUsing}
        >
          {itemData?.inUse ? (
            <LuToggleRight style={{ height: 50, width: 50 }} />
          ) : (
            <LuToggleLeft style={{ height: 50, width: 50 }} />
          )}
          Toggle Using
        </Button>
        <Button
          variant={"subtle"}
          height={"full"}
          width={"33.333%"}
          flexDir={"column"}
          className="text"
          bg="blue.500"
        >
          <LuHouse style={{ height: 50, width: 50 }} />
          Move Home
        </Button>
        <Button
          variant={"subtle"}
          height={"full"}
          width={"33.333%"}
          flexDir={"column"}
          className="text"
        >
          <LuTrash style={{ height: 50, width: 50 }} />
          Delete Item
        </Button>
      </Group>
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
    </Flex>
  );
}

export default ItemDataPage;
