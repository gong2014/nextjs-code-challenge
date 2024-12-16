import NavBar from "@/components/Navbar";
import { TableList } from "@/components/TableList";
import { Suspense } from "react";
export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <TableList />
    </Suspense>
  );
}
