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
import { useEffect, useRef, useState } from "react";
import Box from "@/types/Box";
import Space from "@/types/Space";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { error } from "console";

type itemInputs = {
  itemName: string;
  location: string;
};
type boxInputs = {
  boxName: string;
  space: string;
};
type spaceInputs = {
  spaceName: string;
};
interface StupidThingThatTheStupidChakraCollectionWants {
  label: string;
  value: string;
}

const NewItem = () => {
  const accessCode = useAuthenticated();
  const [boxes, setBoxes] = useState<Box[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [spaces, setSpaces] = useState<Space[] | null>(null);
  const [boxesCollection, setBoxesCollection] = useState<any>(null);
  const [spacesCollection, setSpacesCollection] = useState<any>(null);

  const {
    register: iRegister,
    handleSubmit: iHandleSubmit,
    control: iControl,
    watch: iWatch,
    formState: { errors: iErrors },
  } = useForm<itemInputs>();
  const {
    register: bRegister,
    handleSubmit: bHandleSubmit,
    watch: bWatch,
    control: bControl,
    formState: { errors: bErrors },
  } = useForm<boxInputs>();
  const {
    register: sRegister,
    handleSubmit: sHandleSubmit,
    watch: sWatch,
    formState: { errors: sErrors },
  } = useForm<spaceInputs>();

  const itemOnSubmit: SubmitHandler<itemInputs> = (data) => console.log(data);
  const boxOnSubmit: SubmitHandler<boxInputs> = (data) => console.log(data);
  const spaceOnSubmit: SubmitHandler<spaceInputs> = (data) => console.log(data);

  async function load() {
    const { data, error } = await supabase.from("boxes").select("*");
    const { data: sData, error: sError } = await supabase
      .from("spaces")
      .select("*");

    if (error || sError) {
      setLoading(false);
    } else {
      setBoxes(data);
      setSpaces(sData);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (boxes?.length != 0) {
      let boxItemList: StupidThingThatTheStupidChakraCollectionWants[] = [];
      for (let i = 0; i < (boxes?.length ?? 0); i++) {
        boxItemList.push({
          label: boxes?.[i].boxName ?? "",
          value: boxes?.[i].id ?? "",
        });
      }
      setBoxesCollection(
        createListCollection({
          items: boxItemList,
        })
      );
    }
    if (spaces?.length != 0) {
      let spaceItemList: StupidThingThatTheStupidChakraCollectionWants[] = [];
      for (let i = 0; i < (spaces?.length ?? 0); i++) {
        spaceItemList.push({
          label: spaces?.[i].spaceName ?? "",
          value: spaces?.[i].id ?? "",
        });
      }
      setSpacesCollection(
        createListCollection({
          items: spaceItemList,
        })
      );
    }
  }, [boxes, spaces]);

  useEffect(() => {
    load();
  }, []);

  const createItem = async () => {};
  const createBox = async () => {};
  const createSpace = async () => {};

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
              <form onSubmit={iHandleSubmit(itemOnSubmit)}>
                <Field
                  label="Item Name"
                  invalid={iErrors.itemName ? true : false}
                  errorText={iErrors.itemName && "This field is required."}
                >
                  <Input {...iRegister("itemName", { required: true })} />
                </Field>
                <Field
                  invalid={iErrors.location ? true : false}
                  errorText={iErrors.location && "This field is required"}
                >
                  <Controller
                    name="location"
                    rules={{ required: "This field is required" }}
                    control={iControl}
                    render={({ field }) => (
                      <SelectRoot
                        collection={boxesCollection}
                        size="sm"
                        marginTop={"8px"}
                        name={field.name}
                        // value={[field.value]}
                        onValueChange={({ value }) => field.onChange(value)}
                        onInteractOutside={() => field.onBlur()}
                      >
                        <SelectLabel>Location</SelectLabel>
                        <SelectTrigger>
                          <SelectValueText placeholder="Select Box" />
                        </SelectTrigger>
                        <SelectContent>
                          {boxesCollection?.items?.map(
                            (
                              box: StupidThingThatTheStupidChakraCollectionWants
                            ) => (
                              <SelectItem item={box} key={box.value}>
                                {box.label}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </SelectRoot>
                    )}
                  ></Controller>
                </Field>
                <Button
                  width={"100%"}
                  colorPalette={"green"}
                  marginTop={"10px"}
                  marginBottom={"0px"}
                  type="submit"
                >
                  Create
                </Button>
              </form>
            </Tabs.Content>
            <Tabs.Content value="box">
              <form onSubmit={bHandleSubmit(boxOnSubmit)}>
                <Field
                  label="Box Name"
                  invalid={bErrors.boxName ? true : false}
                  errorText={bErrors.boxName && "This field is required."}
                >
                  <Input {...bRegister("boxName", { required: true })} />
                </Field>
                <Field
                  invalid={bErrors.space ? true : false}
                  errorText={bErrors.space && "This field is required"}
                >
                  <Controller
                    name="space"
                    rules={{ required: "This field is required" }}
                    control={bControl}
                    render={({ field }) => (
                      <SelectRoot
                        collection={spacesCollection}
                        size="sm"
                        marginTop={"8px"}
                        name={field.name}
                        onValueChange={({ value }) => field.onChange(value)}
                        onInteractOutside={() => field.onBlur()}
                      >
                        <SelectLabel>Space</SelectLabel>
                        <SelectTrigger>
                          <SelectValueText placeholder="Select Space" />
                        </SelectTrigger>
                        <SelectContent>
                          {spacesCollection?.items?.map(
                            (
                              space: StupidThingThatTheStupidChakraCollectionWants
                            ) => (
                              <SelectItem item={space} key={space.value}>
                                {space.label}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </SelectRoot>
                    )}
                  ></Controller>
                </Field>
                <Button
                  width={"100%"}
                  colorPalette={"green"}
                  marginTop={"10px"}
                  marginBottom={"0px"}
                  type="submit"
                >
                  Create
                </Button>
              </form>
            </Tabs.Content>
            <Tabs.Content value="space">
              <form onSubmit={sHandleSubmit(spaceOnSubmit)}>
                <Field
                  label="Space Name"
                  invalid={sErrors.spaceName ? true : false}
                  errorText={sErrors.spaceName && "This field is required."}
                >
                  <Input {...sRegister("spaceName", { required: true })} />
                </Field>
                <Button
                  width={"100%"}
                  colorPalette={"green"}
                  marginTop={"10px"}
                  marginBottom={"0px"}
                  type="submit"
                >
                  Create
                </Button>
              </form>
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
