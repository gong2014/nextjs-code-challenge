import { UserInfo } from "@/type/models";

export const submitUserInfo = async (userInfo: UserInfo) => {
  try {
    const response = await fetch("/api/auth/cookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`login fail ${error.message}`);
    } else {
      throw new Error("login fail " + JSON.stringify(error));
    }
  }
};
