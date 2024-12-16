import { HStack } from "@chakra-ui/react";

import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";

export const PaginationBlock = ({
  pageInfo,
  page,
  handlePageChange,
}: {
  pageInfo: { count: number };
  page: number;
  handlePageChange: (page: number) => void;
}) => {
  return (
    <PaginationRoot
      count={pageInfo?.count ?? 0}
      page={page}
      variant="solid"
      className="mx-auto"
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
  );
};
