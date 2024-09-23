import React from "react";
import { SignIn } from "@clerk/nextjs";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn path="/login" routing="path" />
    </div>
  );
};

export default Login;
