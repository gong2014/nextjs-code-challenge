import { Character } from "@/type/models";
import { Table } from "@chakra-ui/react";
import Image from "next/image";

export const TableBody = ({
  characters,
  handleRowClick,
}: {
  characters: Character[];
  handleRowClick: (item: Character) => void;
}) => {
  return (
    <Table.Body>
      {characters.map((character) => (
        <Table.Row key={character.id} onClick={() => handleRowClick(character)}>
          <Table.Cell>
            <Image
              src={character.image}
              alt={character.name}
              width={50}
              height={50}
            />
          </Table.Cell>
          <Table.Cell>{character.name}</Table.Cell>
          <Table.Cell>{character.gender}</Table.Cell>
          <Table.Cell>{character.status}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  );
};
