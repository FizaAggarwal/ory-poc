import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { getCookie } from "cookies-next";

import {
  Configuration,
  FrontendApi,
  UpdateRegistrationFlowBody,
  UpdateRegistrationFlowWithPasswordMethod,
  RegistrationFlow
} from "@ory/client";
import { useRouter } from "next/router";
import axios from "axios";

export default function Registration({ csrfToken }: { csrfToken: string }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  const frontend = new FrontendApi(
    new Configuration({
      basePath: "http://localhost:4433",
    })
  );

  const handleSignup = () => {
    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        csrfToken:
          "Z/KWls2z91ren773bJ2hmS5TQH6YlVh8TOITZHULN6h+JthGNqd81ARIiQ7QYmplVyW3qBhm8EeHIB49hFGE6g==",
        flowId: "2ce3e63d-16d0-49d9-a162-b1b17df970ba",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("data", data))
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div className="flex h-screen flex-col justify-center items-center gap-10">
      <div className="text-bold text-3xl">Signup</div>
      <form onSubmit={handleSignup}>
        {/* <label className="flex flex-col gap-4 w-80">
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
        <br /> */}
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
  const csrfToken =
    context.req.cookies[
      "csrf_token_82b119fa58a0a1cb6faa9738c1d0dbbf04fcc89a657b7beb31fcde400ced48ab"
    ];
  if (!context.query.flow) {
    return {
      redirect: {
        destination: "http://localhost:4433/self-service/registration/browser",
        permanent: false,
      },
    };
  }
  return {
    props: { csrfToken },
  };
};
