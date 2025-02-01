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
import supabase from "@/hooks/supabase";
import { useNavigate } from "react-router-dom";
import Space from "@/types/Space";
import { toaster } from "@/components/ui/toaster";
interface Props {
  spaceData: Space | null;
  accessCode: string | null;
}

const DeleteItemModal = (props: Props) => {
  const navigate = useNavigate();

  const handleDeleteSpace = async () => {
    if (props.spaceData?.boxes.length != 0) {
      toaster.create({
        title: "Error while deleting space",
        description: "This space still has boxes inside of it.",
        type: "error",
        duration: 2000,
      });
      return;
    }
    await supabase.from("spaces").delete().eq("id", props.spaceData.id);
    navigate("/catalog?code=" + props.accessCode);
  };

  return (
    <DialogRoot role="alertdialog" size="full">
      <DialogTrigger asChild>
        <Button variant={"outline"} colorPalette={"red"}>
          Delete Space
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>
            This action cannot be undone. This will permanently delete the space
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

export default DeleteItemModal;
