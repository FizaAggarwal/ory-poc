import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { getCookie } from "cookies-next";

import {
  Configuration,
  FrontendApi,
  UpdateRegistrationFlowBody,
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

  // async function handleSignup() {
  //   console.log("hello");
  //   return await frontend.updateRegistrationFlow({
  //     flow: router.query.flow as string,
  //     updateRegistrationFlowBody: {
  //       method: "password",
  //       password: password,
  //       traits: {
  //         email: email,
  //         name: {
  //           first: firstName,
  //           last: lastName,
  //         },
  //       },
  //     },
  //   });
  // }

  // const cookie = getCookie(
  //   "csrf_token_82b119fa58a0a1cb6faa9738c1d0dbbf04fcc89a657b7beb31fcde400ced48ab"
  // );

  // const handleSignup = () => {
  //   console.log("hello in api");
  //   console.log(csrfToken, "###cookie");
  //   console.log(router.query.flow, "###flowId");
  //   let body = {
  //     method: "password",
  //     csrf_token: encodeURIComponent(csrfToken),
  //     "traits.email": email,
  //     password: password,
  //     "traits.tos": "true",
  //     "transient_payload.consents": "newsletter,usage_stats",
  //   };

  //   axios
  //     .post(
  //       `http://localhost:4433/self-service/registration?flow=${router.query.flow}`,
  //       JSON.stringify(body)
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  //   console.log("api finish");
  // };

  const handleSignup = () => {
    let data = JSON.stringify({
      method: "password",
      csrf_token: csrfToken,
      "traits.email": email,
      password: password,
      "traits.tos": "true",
      "transient_payload.consents": "newsletter,usage_stats",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://localhost:4433/self-service/registration?flow=${router.query.flow}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: data,
    };
    console.log("hi before api");
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("hi after api");
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
