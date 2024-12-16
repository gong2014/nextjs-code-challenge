import { DataListItem, DataListRoot } from "@chakra-ui/react";
import Image from "next/image";

export const CharacterDetail = ({
  userDetails,
}: {
  userDetails: { key: string; value: string }[] | null;
}) => {
  return (
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
  );
};
