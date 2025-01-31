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
import Space from "@/types/Space";
import { toaster } from "@/components/ui/toaster";
interface Props {
  boxData: Box | null;
  accessCode: string | null;
}

const DeleteBoxModal = (props: Props) => {
  const navigate = useNavigate();

  const handleDeleteSpace = async () => {
    toaster.create({
      title: "Error",
      description: "The box still has items in it!",
      duration: 2000,
      type: "error",
    });
  };

  return (
    <DialogRoot role="alertdialog" size="full">
      <DialogTrigger asChild>
        <Button variant={"outline"} colorPalette={"red"}>
          Delete Box
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>
            This action cannot be undone. This will permanently delete the box
            and remove it's data from our systems.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <DialogActionTrigger asChild>
            <Button colorPalette="red" onClick={handleDeleteSpace}>
              Delete
            </Button>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default DeleteBoxModal;
