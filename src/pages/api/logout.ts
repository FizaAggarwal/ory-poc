import { ory } from "@/services/ory";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const logoutUrl = await ory
    .createBrowserLogoutFlow({
      cookie: req.headers.cookie,
    })
    .then(({ data }) => data.logout_url);

  res.redirect(logoutUrl);
}
