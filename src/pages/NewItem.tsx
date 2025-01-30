import { Field } from "@/components/ui/field";
import useAuthenticated from "@/hooks/useAuthenticated";
import {
  Text,
  Flex,
  Tabs,
  Input,
  IconButton,
  VStack,
  Spinner,
  createListCollection,
  Button,
} from "@chakra-ui/react";
import { LuApple, LuPackage, LuSpace, LuX } from "react-icons/lu";
import { Link } from "react-router-dom";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import supabase from "@/hooks/supabase";
import { useEffect, useState } from "react";
import Box from "@/types/Box";

interface StupidThingThatTheStupidChakraCollectionWants {
  label: string;
  value: string;
}

const NewItem = () => {
  const accessCode = useAuthenticated();
  const [boxes, setBoxes] = useState<Box[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [boxesCollection, setBoxesCollection] = useState<any>(null);

  async function load() {
    const { data, error } = await supabase.from("boxes").select("*");

    if (error) {
      setLoading(false);
    } else {
      setBoxes(data);
      setLoading(false);
    }
  }

  useEffect(() => {
    let itemList: StupidThingThatTheStupidChakraCollectionWants[] = [];
    for (let i = 0; i < (boxes?.length ?? 0); i++) {
      itemList.push({
        label: boxes?.[i].boxName ?? "",
        value: boxes?.[i].id ?? "",
      });
    }
    load();
    setBoxesCollection(
      createListCollection({
        items: itemList,
      })
    );
  }, [boxes]);

  return (
    <>
      {loading ? (
        <VStack margin="auto" marginTop={"125px"}>
          <Spinner />
          <Text>Loading...</Text>
        </VStack>
      ) : (
        <Flex flexDir={"column"} gap={"10px"} alignItems={"center"}>
          <Text
            paddingTop={"5px"}
            paddingBottom={"5px"}
            className="text "
            textAlign={"center"}
            verticalAlign={"middle"}
            bgColor={"blackAlpha.900"}
          >
            New Item/Box/Space Creator
          </Text>
          <Tabs.Root defaultValue="item" variant={"enclosed"}>
            <Tabs.List>
              <Tabs.Trigger value="item">
                <LuApple />
                Item
              </Tabs.Trigger>
              <Tabs.Trigger value="box">
                <LuPackage />
                Box
              </Tabs.Trigger>
              <Tabs.Trigger value="space">
                <LuSpace />
                Space
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="item">
              <Field
                required
                label="Item Name"
                helperText="This is how your item will display"
              >
                <Input />
              </Field>

              <SelectRoot
                collection={boxesCollection}
                size="sm"
                width="320px"
                marginTop={"8px"}
              >
                <SelectLabel>Location</SelectLabel>
                <SelectTrigger>
                  <SelectValueText placeholder="Select Box" />
                </SelectTrigger>
                <SelectContent>
                  {boxesCollection?.items?.map(
                    (box: StupidThingThatTheStupidChakraCollectionWants) => (
                      <SelectItem item={box} key={box.value}>
                        {box.label}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </SelectRoot>

              <Button
                width={"100%"}
                colorPalette={"green"}
                marginTop={"10px"}
                marginBottom={"0px"}
              >
                Submit
              </Button>
            </Tabs.Content>
            <Tabs.Content value="box">Manage your projects</Tabs.Content>
            <Tabs.Content value="space">
              Manage your tasks for freelancers
            </Tabs.Content>
          </Tabs.Root>
          <Link to={"/dashboard?code=" + accessCode}>
            <IconButton
              variant={"subtle"}
              position={"absolute"}
              top="10px"
              right="10px"
            >
              <LuX />
            </IconButton>
          </Link>
        </Flex>
      )}
    </>
  );
};

export default NewItem;
