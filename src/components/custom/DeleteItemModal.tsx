import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@chakra-ui/react";
import { LuTrash } from "react-icons/lu";
import Item from "@/types/Item";
import Box from "@/types/Box";
import supabase from "@/hooks/supabase";
import { useNavigate } from "react-router-dom";

interface Props {
  itemData: Item | null;
  boxData: Box | null;
  accessCode: string | null;
}

const DeleteItemModal = (props: Props) => {
  const navigate = useNavigate();

  const handleDeleteItem = async () => {
    var newBoxItemsData = props.boxData?.items;
    newBoxItemsData = newBoxItemsData?.filter(
      (item) => item !== props.itemData?.id
    );

    await supabase
      .from("boxes")
      .update({ items: newBoxItemsData })
      .eq("id", props.boxData?.id);

    await supabase.from("items").delete().eq("id", props.itemData?.id);
    navigate("/catalog?code=" + props.accessCode);
  };

  return (
    <DialogRoot role="alertdialog" size="full">
      <DialogTrigger asChild>
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
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>
            This action cannot be undone. This will permanently delete the item
            and remove it's data from our systems.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button colorPalette="red" onClick={handleDeleteItem}>
            Delete
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default DeleteItemModal;
