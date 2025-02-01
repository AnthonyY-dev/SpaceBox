import DeleteSpaceModal from "@/components/custom/DeleteSpaceModal";
import { Avatar } from "@/components/ui/avatar";
import isoToMMDDYY from "@/functions/isoToMMDDYY";
import supabase from "@/hooks/supabase";
import useAuthenticated from "@/hooks/useAuthenticated";
import Box from "@/types/Box";
import Space from "@/types/Space";
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

const SpaceDataPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const accessCode = useAuthenticated();

  const [space, setSpace] = useState<Space | null>(null);
  const [boxes, setBoxes] = useState<Box[] | null>(null);

  const [_, setSError] = useState<string>("");

  const [bLoading, setBLoading] = useState<boolean>(true);
  const [sLoading, setSLoading] = useState<boolean>(true);

  async function loadItems() {
    const { data: SpaceData, error: SpaceError } = await supabase
      .from("spaces")
      .select("*")
      .eq("id", id);
    if (SpaceData?.length == 0) {
      navigate("/catalog?code=" + accessCode);
    }
    if (SpaceError) {
      setSError("(" + SpaceError.code + ") " + SpaceError.message);
    }
    setSpace(SpaceData?.[0]);
    setSLoading(false);
    const { data: BoxesData, error: BoxError } = await supabase
      .from("boxes")
      .select("*");

    if (BoxesData?.length == 0) {
      navigate("/catalog?code=" + accessCode);
    }
    if (BoxError) {
      setSError("(" + BoxError.code + ") " + BoxError.message);
    }
    setBoxes(BoxesData);
    setBLoading(false);
  }

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <>
      {bLoading || sLoading ? (
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
                  name={space?.spaceName}
                  shape="rounded"
                  style={{ height: 150, width: 150 }}
                  src={space?.spaceImageUrl}
                />

                <DeleteSpaceModal accessCode={accessCode} spaceData={space} />
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
                <Text className="text">{space?.spaceName}</Text>
                <Text className="pop">
                  Created on {isoToMMDDYY(space?.created_at)}
                </Text>
                <Text className="pop" color="gray.500">
                  Box Count: {space?.boxes.length}
                </Text>
                <Text fontSize={"2xs"} color={"#2F2F2F"}>
                  Space ID: {space?.id}
                </Text>
              </Flex>
              <Flex
                // bg="tomato"
                width={"260px"}
                minHeight={"50px"}
                flexDir={"column"}
                gap={"10px"}
              >
                {space?.boxes.map((boxInfo) => (
                  <Link
                    to={
                      "/box/" +
                      boxes?.filter((box) => box.id == boxInfo)[0].id +
                      "?code=" +
                      accessCode
                    }
                    key={boxes?.filter((box) => box.id == boxInfo)[0].id}
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
                          boxes?.filter((box) => box.id == boxInfo)[0].boxName
                        }
                        src={
                          boxes?.filter((box) => box.id == boxInfo)[0]
                            .boxImageUrl
                        }
                      ></Avatar>
                      {boxes?.filter((box) => box.id == boxInfo)[0].boxName}
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

export default SpaceDataPage;
