// pages/api/register.js
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("helli in api/register");
  if (req.method === "POST") {
    console.log("hello");
    const { email, password, csrfToken, flowId } = req.body;
    console.log(req.query, "###query");

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
      url: `http://localhost:4433/self-service/registration?flow=${flowId}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: `csrf_token_82b119fa58a0a1cb6faa9738c1d0dbbf04fcc89a657b7beb31fcde400ced48ab=${csrfToken}`,
      },
      withCredentials: true,
      data: data,
    };
    console.log("hello just before api");

    try {
      const response = await axios.request(config);
      console.log(response, "response after await");
      res.status(200).json(response.data);
    } catch (error) {
      console.log(error, "###error");
      res.status(500).json({ error: String(error) });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
