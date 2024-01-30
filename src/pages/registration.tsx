import { GetServerSideProps } from "next";
import React, { useState } from "react";

import {
  Configuration,
  FrontendApi,
  UpdateRegistrationFlowBody,
} from "@ory/client";
import { useRouter } from "next/router";

export default function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  // const handleSignup = () => {
  //   // Handle signup logic here
  // };

  const frontend = new FrontendApi(
    new Configuration({
      basePath: "http://localhost:4433",
    })
  );

  async function handleSignup() {
    console.log("hello");
    return await frontend.updateRegistrationFlow({
      flow: router.query.flow as string,
      updateRegistrationFlowBody: {
        method: "password",
        password: password,
        traits: {
          email: email,
          name: {
            first: firstName,
            last: lastName,
          },
        },
      },
    });
  }

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
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.query.flow) {
    return {
      redirect: {
        destination: "http://localhost:4433/self-service/registration/browser",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
