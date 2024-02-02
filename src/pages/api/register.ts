// pages/api/register.js
import { Configuration, FrontendApi } from "@ory/client";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("hell0 in api/register");
  if (req.method === "POST") {
    console.log("hello");
    const { email, password, csrfToken, flowId, firstName, lastName } =
      req.body;
    console.log(req.query, "###query");
    console.log(req.cookies, "###cookies");

    // const ory = new FrontendApi(
    //   new Configuration({
    //     basePath: "http://localhost:4433",
    //     baseOptions: {
    //       withCredentials: true,
    //     },
    //   })
    // );

    // ory
    //   .updateRegistrationFlow({
    //     flow: String(flowId),
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

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append(
      "Cookie",
      `csrf_token_82b119fa58a0a1cb6faa9738c1d0dbbf04fcc89a657b7beb31fcde400ced48ab=${req.cookies.csrf_token_82b119fa58a0a1cb6faa9738c1d0dbbf04fcc89a657b7beb31fcde400ced48ab}`
    );

    var raw = JSON.stringify({
      method: "password",
      csrf_token: csrfToken,
      "traits.email": email,
      password: password,
      "traits.tos": "true",
      "transient_payload.consents": "newsletter,usage_stats",
    });

    fetch(`http://localhost:4433/self-service/registration?flow=${flowId}`, {
      credentials: "include",
      headers: myHeaders,
      method: "POST",
      body: raw,
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
