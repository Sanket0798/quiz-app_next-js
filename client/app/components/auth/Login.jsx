import React from "react";
import { SignIn } from "@clerk/nextjs";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn path="/login" routing="path" />
      {/* <header className="flex justify-between">
        <h1>Only Education</h1>
        <UserButton />
      </header>
      <main>
        <SignedOut>
          <SignIn routing="hash" />
        </SignedOut>
      </main> */}
    </div>
  );
};

export default Login;
