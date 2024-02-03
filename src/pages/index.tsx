import { getUserName, ory } from "@/services/ory";
import { Session } from "@ory/client";
import { GetServerSideProps } from "next";
import Link from "next/link";

interface HomeProps {
  session: Session;
}

export default function Home({ session }: HomeProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">
        {session?.identity ? (
          <p>Hello, {getUserName(session.identity)}</p>
        ) : null}
      </h1>
      <Link
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        href="/api/logout"
      >
        Logout
      </Link>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({
  req,
}) => {
  try {
    const sessionResponse = await ory.toSession({
      cookie: req.headers.cookie,
    });

    console.log("#### sessionResponse", sessionResponse);

    return {
      props: {
        session: sessionResponse.data,
      },
    };
  } catch (error) {
    console.log("#### error", error);

    return {
      redirect: {
        destination: "/registration",
        permanent: false,
      },
    };
  }
};
