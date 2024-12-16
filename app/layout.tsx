import type { Metadata } from "next";
import "./globals.css";
import ApolloClientProvider from "@/components/ApolloClientProvider";
import { Provider } from "@/components/ui/provider";

export const metadata: Metadata = {
  title: "Create Code Challenge App",
  description: "Modified by David",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className="max-w-[1280px] mx-auto p-4">
        <ApolloClientProvider>
          <Provider>{children}</Provider>
        </ApolloClientProvider>
      </body>
    </html>
  );
}
