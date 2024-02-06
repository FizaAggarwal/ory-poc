import { GetServerSideProps } from "next";
import { useCallback, useEffect, useState } from "react";
import { RegistrationFlow, UiNode, UiNodeInputAttributes } from "@ory/client";
import {
  filterNodesByGroups,
  isUiNodeInputAttributes,
} from "@ory/integrations/ui";

import {
  basePathBrowser,
  getUrlForFlow,
  isQuerySet,
  ory,
} from "@/services/ory";
import { handleGetFlowError } from "@/services/error";

interface RegistrationProps {
  flow: RegistrationFlow;
}

export default function Registration({ flow }: RegistrationProps) {
  const [message, setMessage] = useState("");
  console.log(flow, "###flow");

  useEffect(() => {
    if (flow.ui.messages) {
      setMessage(flow.ui.messages[0].text);
    }
  }, [flow]);

  const mapUINode = useCallback((node: UiNode, key: number) => {
    if (isUiNodeInputAttributes(node.attributes)) {
      const attrs = node.attributes as UiNodeInputAttributes;
      const nodeType = attrs.type;

      switch (nodeType) {
        case "button":
        case "submit":
          return (
            <button
              className="border-b p-2 rounded-xl bg-indigo-500 text-white w-full mt-6 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
              title="Submit"
              type={attrs.type as "submit" | "reset" | "button" | undefined}
              name={attrs.name}
              value={attrs.value}
            >
              Submit
            </button>
          );
        default:
          return (
            <div>
              <input
                className="w-full p-3 rounded border border-gray-700 bg-gray-700 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                title="Input field"
                placeholder={"Enter value for " + node.meta.label?.text}
                name={attrs.name}
                type={attrs.type}
                autoComplete={
                  attrs.autocomplete || attrs.name === "identifier"
                    ? "username"
                    : ""
                }
                defaultValue={attrs.value}
                required={attrs.required}
                disabled={attrs.disabled}
              />
              {node.messages ? (
                <div className="text-red-400 text-sm mt-2">
                  {node.messages[0]?.text}
                </div>
              ) : null}
            </div>
          );
      }
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 flex-col gap-8">
      {message ? (
        <div className="bg-red-500 text-white text-sm px-4 py-2 rounded mx-4">
          {message}
        </div>
      ) : null}
      <div className="w-full max-w-md bg-gray-800 text-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form action={flow.ui.action} method={flow.ui.method}>
          {filterNodesByGroups({
            nodes: flow.ui.nodes,
            groups: ["default", "password"],
          }).map((node, idx) => (
            <div key={idx} className="mb-4">
              {" "}
              {mapUINode(node, idx)}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<RegistrationProps> =
  async ({ req, query }) => {
    const flow = query?.flow as string | undefined;

    console.log(!isQuerySet(flow), "###log");

    if (!isQuerySet(flow)) {
      const initFlowUrl = getUrlForFlow(basePathBrowser, "registration");

      return {
        redirect: {
          destination: initFlowUrl,
          permanent: false,
        },
      };
    }

    try {
      const regFlow = await ory.getRegistrationFlow({
        id: flow,
        cookie: req.headers.cookie,
      });

      return {
        props: {
          flow: regFlow.data,
        },
      };
    } catch (error) {
      const errorData = handleGetFlowError("registration")(error);

      return {
        redirect: {
          destination: errorData?.redirectTo || "/error",
          permanent: false,
        },
      };
    }
  };
