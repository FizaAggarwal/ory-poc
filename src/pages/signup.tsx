import React, { useState } from "react";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    // Handle signup logic here
  };

  return (
    <div className="flex h-screen flex-col justify-center items-center gap-10">
      <div className="text-bold text-3xl">Signup</div>
      <form onSubmit={handleSignup}>
        <label className="flex flex-col gap-4 w-80">
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border-b border-black outline-none w-full"
          />
        </label>
        <br />
        <label className="flex flex-col gap-4 w-80">
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border-b border-black outline-none w-full"
          />
        </label>
        <br />
        <label className="flex flex-col gap-4 w-80">
          Phone Number
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border-b border-black outline-none w-full"
          />
        </label>
        <br />
        <label className="flex flex-col gap-4 w-80">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-b border-black outline-none w-full"
          />
        </label>
        <br />
        <button
          type="submit"
          className="border-b p-2 rounded-xl bg-black text-white w-full mt-6"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
