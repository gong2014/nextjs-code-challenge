"use client";
import { Heading, Stack, Table } from "@chakra-ui/react";
import { Alert } from "@/components/ui/alert";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "@/graphql/queries/queries";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Character, PageInfo } from "@/type/models";
import { UserDetail } from "@/components/CharacterDetail";
import { PaginationBlock } from "@/components/Pagination";
import { TableBody } from "@/components/TableList/TableBody";
import { CustomSpinner } from "../CustomSpinner";

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
  if (error) return <Alert status="error" title={error.message} />;

  const characters: Character[] = data?.characters?.results ?? [];
  const pageInfo: PageInfo = data?.characters?.info;

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
      {loading ? (
        <CustomSpinner />
      ) : (
        <Stack>
          <Table.ScrollArea
            borderWidth="1px"
            rounded="md"
            className="h-[calc(100vh-230px)]"
          >
            <Table.Root size="sm" variant="outline" striped>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Image</Table.ColumnHeader>
                  <Table.ColumnHeader>Name</Table.ColumnHeader>
                  <Table.ColumnHeader>Gender</Table.ColumnHeader>
                  <Table.ColumnHeader>Status</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <TableBody
                characters={characters}
                handleRowClick={handleRowClick}
              />
            </Table.Root>
          </Table.ScrollArea>
          <PaginationBlock
            pageInfo={pageInfo}
            page={page}
            handlePageChange={handlePageChange}
          />
          <UserDetail
            character={character}
            open={openDrawer}
            setOpen={setOpenDrawer}
          />
        </Stack>
      )}
    </Stack>
  );
};
