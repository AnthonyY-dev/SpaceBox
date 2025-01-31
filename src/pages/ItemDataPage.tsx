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
import { LuHouse, LuToggleLeft, LuToggleRight, LuX } from "react-icons/lu";
import { useParams, Link, useNavigate } from "react-router-dom";
import supabase from "@/hooks/supabase";
import Item from "@/types/Item";
import isoToMMDDYY from "@/functions/isoToMMDDYY";
import DeleteItemModal from "@/components/custom/DeleteItemModal";
import Box from "@/types/Box";

function ItemDataPage() {
  const { id } = useParams();

  const accessCode = useAuthenticated();

  const [itemData, setItemData] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [boxData, setBoxData] = useState<Box | null>(null);
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
    async function loadBoxData() {
      if (itemData != null) {
        const { data } = await supabase
          .from("boxes")
          .select("*")
          .eq("id", itemData.location)
          .single();
        setBoxData(data);
      }
    }
    loadBoxData();
  }, [itemData]);

  const toggleUsing = async () => {
    if (!itemData) return; // Avoid updating if itemData is not yet loaded

    const { error } = await supabase
      .from("items")
      .update({ inUse: !itemData.inUse })
      .eq("id", itemData.id);

    if (error) {
      console.error("Error toggling item use:", error);
      return;
    }

    // Wait for update before reloading
    window.location.reload();
  };

  return loading ? (
    <VStack margin="auto" marginTop={"125px"}>
      <Spinner />
      <Text>Loading...</Text>
    </VStack>
  ) : (
    <>
      <Flex padding={"20px"}>
        <Avatar
          shape="rounded"
          style={{ height: 150, width: 150 }}
          src={itemData?.imageUrl}
          name={itemData?.name}
        />

        <Flex
          height="150px"
          width={"260px"}
          marginLeft={"20px"}
          borderRadius={5}
          backgroundColor={"#27272a"}
          padding={"5px"}
          flexDir={"column"}
          alignItems={"center"}
          gap="3px"
        >
          <Text className="text" fontSize={"2xl"}>
            {itemData?.name}
          </Text>
          <Text className="text" fontSize={"large"} color={"#d6d6d6"}>
            {itemData?.inUse
              ? "Currently In Use"
              : 'Currently in "' + boxData?.boxName + '"'}
          </Text>
          <Text className="text" color={"#b0b0b0"}>
            Created on {isoToMMDDYY(itemData?.created_at)}
          </Text>
          <Link to={"/box/" + itemData?.location + "?code=" + accessCode}>
            <Button variant={"subtle"}>View Box</Button>
          </Link>
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
            <Link to={"move?code=" + accessCode}>
              <LuHouse style={{ height: 50, width: 50 }} />
              Move
            </Link>
          </Button>
          <DeleteItemModal
            itemData={itemData}
            boxData={boxData}
            accessCode={accessCode}
          />
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
    </>
  );
}

export default ItemDataPage;
