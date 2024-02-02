import { Configuration, FrontendApi } from "@ory/client";

export const isQuerySet = (x: any): x is string =>
  typeof x === "string" && x.length > 0;

export const removeTrailingSlash = (s: string) => s.replace(/\/$/, "");

export const getUrlForFlow = (
  base: string,
  flow: string,
  query?: URLSearchParams
) =>
  `${removeTrailingSlash(base)}/self-service/${flow}/browser${
    query ? `?${query.toString()}` : ""
  }`;

export const basePathBrowser =
  process.env.NEXT_PUBLIC_KRATOS_BROWSER_URL || "http://localhost:4433/";
export const basePath =
  process.env.NEXT_PUBLIC_KRATOS_PUBLIC_URL || "http://kratos:4433/";

export const ory = new FrontendApi(
  new Configuration({
    basePath,
    baseOptions: {
      withCredentials: true,
    },
  })
);

export const oryBrowser = new FrontendApi(
  new Configuration({
    basePath: basePathBrowser,
    baseOptions: {
      withCredentials: true,
    },
  })
);
