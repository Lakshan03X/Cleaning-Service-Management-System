import React from "react";
import LoginForm from "../../components/auth/LoginForm";
import loginImage from "../../assets/loginImage.png";

function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side: Login Form */}
      <div className="flex-1 flex items-center justify-center">
        <LoginForm />
      </div>

      {/* Right side: Image */}
      <div className="flex-1 hidden md:flex items-center justify-center bg-indigo-100">
        <img
          src={loginImage}
          alt="Login Visual"
          className="object-cover h-full w-full max-w-xl"
        />
      </div>
    </div>
  );
}

export default LoginPage;
