import { VStack, Spinner, Text } from "@chakra-ui/react";

export const CustomSpinner = () => {
  return (
    <VStack colorPalette="teal">
      <Spinner />
      <Text>Loading...</Text>
    </VStack>
  );
};
