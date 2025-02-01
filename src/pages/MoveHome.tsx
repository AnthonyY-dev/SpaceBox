import { Avatar } from "@/components/ui/avatar";
import supabase from "@/hooks/supabase";
import useAuthenticated from "@/hooks/useAuthenticated";
import Box from "@/types/Box";
import Item from "@/types/Item";
import { Button, Flex, Spinner, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MoveHome = () => {
  const { id } = useParams();
  const accessCode = useAuthenticated();
  const navigate = useNavigate();

  const [itemData, setItemData] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [_, setErrorMsg] = useState<string>("");

  const [boxesData, setBoxesData] = useState<Box[] | null>(null);
  const [oldBoxData, setOldBoxData] = useState<Box | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const { data: itemData, error: error1 } = await supabase
        .from("items")
        .select("*")
        .eq("id", id);

      const { data: boxData, error: error2 } = await supabase
        .from("boxes")
        .select("*");
      const { data: cBoxData, error: error3 } = await supabase
        .from("boxes")
        .select("*")
        .eq("id", itemData?.[0].location);
      if (error1 || error2 || error3) {
        setLoading(false);
        if (error1) {
          setErrorMsg(error1.message);
        }
        if (error2) {
          setErrorMsg(error2.message);
        }
        if (error3) {
          setErrorMsg(error3.message);
        }
      } else {
        if (
          itemData?.length == 0 ||
          cBoxData?.length == 0 ||
          boxData.length == 0
        ) {
          navigate("/catalog?code=" + accessCode);
        }
        setItemData(itemData[0]);
        setOldBoxData(cBoxData[0]);
        setBoxesData(boxData);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const onSelectBox = async (boxId: string) => {
    if (boxId == itemData?.location) {
      navigate("/item/" + itemData.id + "?code=" + accessCode);
      return;
    }
    var newBoxItemsData = oldBoxData?.items;
    newBoxItemsData = newBoxItemsData?.filter((item) => item !== itemData?.id);

    var newTGBI = boxesData?.find((box) => box.id === boxId)?.items;
    newTGBI?.push(itemData?.id || "");

    await supabase
      .from("boxes")
      .update({ items: newBoxItemsData })
      .eq("id", oldBoxData?.id);
    await supabase.from("boxes").update({ items: newTGBI }).eq("id", boxId);
    await supabase
      .from("items")
      .update({ location: boxId })
      .eq("id", itemData?.id);
    navigate("/item/" + itemData?.id + "?code=" + accessCode);
  };

  return (
    <div>
      {loading && (
        <VStack margin="auto" marginTop={"125px"}>
          <Spinner />
          <Text>Loading...</Text>
        </VStack>
      )}
      {!loading && (
        <Flex flexDir={"column"} gap="10px" alignItems={"center"}>
          <Text
            paddingTop={"5px"}
            paddingBottom={"5px"}
            className="text "
            textAlign={"center"}
            verticalAlign={"middle"}
            bgColor={"blackAlpha.900"}
          >
            Select a new Box
          </Text>
          {boxesData?.map((boxData: Box) => (
            <Button
              variant={"subtle"}
              width={"80%"}
              key={boxData.id}
              onClick={() => {
                onSelectBox(boxData.id);
              }}
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
          ))}
        </Flex>
      )}
    </div>
  );
};

export default MoveHome;
