import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import "./styles/globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
} from "@clerk/nextjs";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });
import "./styles/globals.css";

export const metadata = {
  title: "Quiz App",
  description: "Created By Sanket Rathod",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
