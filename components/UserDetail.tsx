"use client";
import { DataListItem, HStack } from "@chakra-ui/react";

import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
} from "@/components/ui/drawer";

import { DataListRoot } from "./ui/data-list";
import { Character } from "@/type/models";
import Image from "next/image";

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
            <DrawerTitle>User Details</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <DataListRoot orientation="horizontal" divideY="1px" maxW="md">
              {userDetails?.map((detail) => (
                <DataListItem pt="4" key={detail.key}>
                  {detail.key === "image" ? (
                    <Image
                      src={detail.value}
                      alt={detail.key}
                      width={100}
                      height={100}
                      className="w-1/2 mx-auto"
                    />
                  ) : (
                    <div>
                      <strong>{detail.key}:</strong> {detail.value}
                    </div>
                  )}
                </DataListItem>
              ))}
            </DataListRoot>
          </DrawerBody>

          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
    </HStack>
  );
};
