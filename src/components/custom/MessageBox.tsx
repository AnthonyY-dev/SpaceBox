import React, { useEffect, useState } from "react";
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@chakra-ui/react/button";
import { Link } from "react-router-dom";

interface Props {
  msg: string;
  accessCode: string | null;
}

const MessageBox = (props: Props) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <DialogRoot
      size="full"
      motionPreset="slide-in-bottom"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <DialogTrigger asChild>
        <React.Fragment />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Message</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p className="text">{props.msg}</p>
        </DialogBody>
        <DialogFooter>
          <Link to={"/dashboard?code=" + props.accessCode}>
            <Button>Ok</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default MessageBox;
