import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

import {
  Configuration,
  FrontendApi,
  FrontendApiCreateBrowserLoginFlowRequest,
  RegistrationFlow,
} from "@ory/client";
import { useRouter } from "next/router";
import axios from "axios";
import { error } from "console";

export default function Registration() {
  const [flow, setFlow] = useState<RegistrationFlow>();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [csrfToken, setCsrfToken] = useState("");

  const router = useRouter();

  const ory = new FrontendApi(
    new Configuration({
      basePath: "http://localhost:4433",
      baseOptions: {
        withCredentials: true,
      },
    })
  );

  useEffect(() => {
    // if (router.query.flow) {
    //   ory
    //     .getRegistrationFlow({ id: String(flowId) })
    //     .then(({ data }) => {
    //       // We received the flow - let's use its data and render the form!
    //       setFlow(data);
    //     })
    //     .catch(handleFlowError(router, "registration", setFlow));
    //   return;
    // }

    // Otherwise we initialize it
    if (!router.query.flow) {
      ory
        .createBrowserRegistrationFlow({
          returnTo: undefined,
        })
        .then(({ data }) => {
          console.log(data, "###Data");
          router.push("/registration?flow=" + data.id);
          setFlow(data);
          setCsrfToken(data.ui.nodes[0].attributes.value);
        })
        .catch((error) => {
          console.log(error, "###arror");
        });
    }
  }, [router.query.flow]);

  const handleSignup = async () => {
    // await router
    //   // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
    //   // his data when she/he reloads the page.
    //   .push(`/registration?flow=${flow?.id}`, undefined, { shallow: true });
    console.log("hello in submit");
    // ory
    //   .updateRegistrationFlow({
    //     flow: String(flow?.id),
    //     updateRegistrationFlowBody: {
    //       method: "password",
    //       csrf_token: csrfToken,
    //       password: password,
    //       traits: {
    //         email: email,
    //         name: { first: firstName, last: lastName },
    //         tos: true,
    //       },
    //       transient_payload: { consents: "newsletter,usage_stats" },
    //     },
    //   })
    //   .then(({ data }) => {
    //     console.log(data, "## submit data");
    //   })
    //   .catch((error) => {
    //     console.log(error, "###submit error");
    //   });
    // fetch("/api/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: email,
    //     password: password,
    //     csrfToken: csrfToken,
    //     flowId: flow?.id,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log("data", data))
    //   .catch((error) => {
    //     console.log("error", error);
    //   });

    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        csrfToken: csrfToken,
        flowId: flow?.id,
        firstName: firstName,
        lastName: lastName,
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

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const csrfToken =
//     context.req.cookies[
//       "csrf_token_82b119fa58a0a1cb6faa9738c1d0dbbf04fcc89a657b7beb31fcde400ced48ab"
//     ];
//   if (!context.query.flow) {
//     return {
//       redirect: {
//         destination: "http://localhost:4433/self-service/registration/browser",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: { csrfToken },
//   };
// };
