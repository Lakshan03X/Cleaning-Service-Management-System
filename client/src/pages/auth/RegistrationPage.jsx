import React from "react";
import RegistrationForm from "../../components/auth/RegistrationForm";
import registerImage from "../../assets/registerImage.jpg";

function RegistrationPage() {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 hidden md:flex items-center justify-center bg-[#fad4dd]">
        <img
          src={registerImage}
          alt="Register Visual"
          className="object-cover h-full w-full max-w-xl"
        />
      </div>

      <div className="flex-1 flex items-center justify-center bg-white px-8">
        <RegistrationForm />
      </div>
    </div>
  );
}

export default RegistrationPage;
