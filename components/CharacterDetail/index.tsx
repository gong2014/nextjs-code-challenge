"use client";
import { HStack } from "@chakra-ui/react";

import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
} from "@/components/ui/drawer";

import { Character } from "@/type/models";
import { CharacterDetail } from "./Detail";

export const UserDetail = ({
  character,
  open,
  setOpen,
}: {
  character: Character | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const userDetails =
    character &&
    Object.entries(character)
      .map(([key, value]) => ({ key, value }))
      .filter((item) => item.key !== "__typename");

  return (
    <HStack wrap="wrap">
      <DrawerRoot size={"xs"} open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Character Details</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <CharacterDetail userDetails={userDetails} />
          </DrawerBody>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
    </HStack>
  );
};
