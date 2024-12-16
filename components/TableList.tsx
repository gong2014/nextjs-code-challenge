"use client";
import { HStack, Heading, Stack, Table } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "@/graphql/queries/queries";
import { useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Character } from "@/type/models";
import { UserDetail } from "./UserDetail";

export const TableList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultPage = Number(searchParams.get("page")) || 1;

  const [page, setPage] = useState(defaultPage);
  const [character, setCharacter] = useState<Character | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const { data, loading, error } = useQuery(GET_CHARACTERS, {
    variables: { page },
  });
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const characters: Character[] = data?.characters?.results ?? [];
  const pageInfo = data?.characters?.info;

  const handlePageChange = (page: number) => {
    setPage(page);
    router.push(`?page=${page}`, { scroll: false });
  };

  const handleRowClick = (item: Character) => {
    setCharacter(item);
    setOpenDrawer(true);
  };

  return (
    <Stack width="full" gap="5">
      <Heading size="xl">Information Page</Heading>
      <Table.Root size="sm" variant="outline" striped stickyHeader={true}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Image</Table.ColumnHeader>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Gender</Table.ColumnHeader>
            <Table.ColumnHeader>Species</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {characters.map((item) => (
            <Table.Row key={item.id} onClick={() => handleRowClick(item)}>
              <Table.Cell>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                />
              </Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.gender}</Table.Cell>
              <Table.Cell>{item.species}</Table.Cell>
              <Table.Cell>{item.status}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <PaginationRoot
        count={pageInfo?.count ?? 0}
        pageSize={20}
        page={page}
        className="mx-auto"
        variant="solid"
        siblingCount={1}
        size="xs"
        onPageChange={(e) => handlePageChange(e.page)}
      >
        <HStack wrap="wrap">
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>
      <UserDetail
        character={character}
        open={openDrawer}
        setOpen={setOpenDrawer}
      />
    </Stack>
  );
};
