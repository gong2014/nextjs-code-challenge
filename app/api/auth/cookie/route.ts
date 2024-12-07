import { UserInfo } from "@/type/models";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const userInfo = cookieStore.get("userInfo")?.value;
  return new Response(JSON.stringify(userInfo), {
    status: 200,
  });
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const userInfo: UserInfo = await req.json();
  cookieStore.set("userInfo", JSON.stringify(userInfo));
  return new Response(JSON.stringify({ userInfo }), {
    status: 200,
  });
}
