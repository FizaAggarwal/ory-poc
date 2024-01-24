import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Login() {
  console.log("hello");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform login logic here
  };

  const router = useRouter();

  useEffect(() => {
    console.log(router, "###router");
    console.log(router.query.flow, "###hello");
    // if (!router.query.flow) {
    //   router.push("http://localhost:4433/self-service/login/browser");
    // }
  }, []);

  return (
    <div className="flex h-screen flex-col justify-center items-center gap-10">
      <div className="text-bold text-3xl">Login</div>
      <form onSubmit={handleSubmit}>
        <label className="flex flex-col gap-4 w-80">
          Phone Number
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="border-b border-black outline-none w-full"
          />
        </label>
        <br />
        <label className="flex flex-col gap-4 w-80">
          Password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="border-b border-black outline-none w-full"
          />
        </label>
        <br />
        <button
          type="submit"
          className="border-b p-2 rounded-xl bg-black text-white w-full mt-6"
        >
          Login
        </button>
      </form>
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   console.log("hello");
//   console.log(context);
//   return {
//     redirect: {
//       destination: "http://localhost:4433/self-service/login/browser",
//       permanent: false,
//     },
//   };
// };
