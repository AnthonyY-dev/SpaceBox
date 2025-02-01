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
// import { useNavigate } from "react-router-dom";
import { toaster } from "@/components/ui/toaster";

const DeleteBoxModal = () => {
  // const navigate = useNavigate();

  const handleDeleteSpace = async () => {
    toaster.create({
      title: "Error",
      description: "feature not done - will come in future",
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
