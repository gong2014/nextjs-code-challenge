"use client";
import {
  Button,
  Card,
  Container,
  Input,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { Alert } from "@/components/ui/alert";
import { Field } from "@/components/ui/field";

import React, { useEffect, useState } from "react";
import { UserInfo } from "@/type/models";
import { useRouter } from "next/navigation";
import { submitUserInfo } from "@/service/userService";

export default function Home() {
  const route = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userName: "",
    jobTitle: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof UserInfo, value: string) => {
    setUserInfo((pre) => ({
      ...pre,
      [field]: value,
    }));
  };

  const handleClear = () => {
    setUserInfo({
      userName: "",
      jobTitle: "",
    });
    setError(null);
  };

  const validateString = (value: string) => {
    const stringRegex = /^[a-zA-Z\s]+$/;
    return stringRegex.test(value);
  };

  const handleSubmit = async () => {
    if (!validateString(userInfo.userName)) {
      setError("User name not empty and can only contain letters and spaces");
      return;
    }

    if (!validateString(userInfo.jobTitle)) {
      setError("Job title not empty and can only contain letters and spaces");
      return;
    }

    const response = await submitUserInfo(userInfo);
    if (response) {
      route.push("/");
    } else {
      setError("Sign up fail");
      console.log(`login fail ${response}`);
    }
  };

  useEffect(() => {
    const getCookie = (name: string) => {
      const cookies = document.cookie.split("; ");
      const cookie = cookies.find((row) => row.startsWith(`${name}=`));
      return cookie ? cookie.split("=")[1] : null;
    };

    const userInfo = JSON.parse(
      decodeURIComponent(getCookie("userInfo") || "{}")
    );
    if (userInfo?.userName) {
      setUserInfo(userInfo);
    }
  }, []);

  return (
    <Container className="w-full h-[calc(100vh-200px)] flex flex-col justify-center items-center">
      <Heading size="2xl" className="mb-6"></Heading>
      <Card.Root maxW="sm">
        <Card.Header>
          {error && <Alert status="error" title={error} />}
          <Card.Title>Sign up</Card.Title>
          <Card.Description>
            Fill in the form below to create an account
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <Stack gap="4" w="full">
            <Field label="User Name">
              <Input
                onChange={(e) => handleInputChange("userName", e.target.value)}
                value={userInfo.userName}
                required
              />
            </Field>
            <Field label="Job Title">
              <Input
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                value={userInfo.jobTitle}
                required
              />
            </Field>
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button variant="outline" onClick={() => handleClear()}>
            Clear
          </Button>
          <Button variant="solid" onClick={handleSubmit}>
            Sign in
          </Button>
        </Card.Footer>
      </Card.Root>
    </Container>
  );
}
