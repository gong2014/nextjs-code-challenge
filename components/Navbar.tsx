import { UserInfo } from "@/type/models";
import { Container, Flex, Text, Button, HStack, Box } from "@chakra-ui/react";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function NavBar() {
  const cookieStore = await cookies();
  const userInfo: UserInfo = cookieStore.get("userInfo")?.value
    ? JSON.parse(cookieStore.get("userInfo")?.value ?? "{}")
    : null;

  return (
    <Box borderBottom="1px">
      <Container maxW="container.xl" py={4}>
        <Flex justify="space-between" align="center">
          <Link href="/dashboard" passHref>
            <Text fontSize="xl" fontWeight="bold" cursor="pointer"></Text>
          </Link>

          {userInfo ? (
            <HStack>
              <Text fontWeight="medium">{userInfo.userName}</Text>
              <Text color="gray.500">{userInfo.jobTitle}</Text>
              <Link href="/signup" passHref>
                <Button>Update Profile </Button>
              </Link>
            </HStack>
          ) : (
            <HStack>
              <Link href="/signup" passHref>
                <Button colorScheme="blue">Sign Up</Button>
              </Link>
            </HStack>
          )}
        </Flex>
      </Container>
    </Box>
  );
}
