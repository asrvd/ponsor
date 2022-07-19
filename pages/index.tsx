import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth";
import { useRouter } from "next/router";
import GitHub from "next-auth/providers/github";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (session?.user) {
    console.log(session?.user);
    return (
      <>
        Signed in as {session?.user.email} {session?.user.name}{" "}
        {session?.user.id}
        <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        onClick={() => {
          signIn("github", { callbackUrl: "/dashboard" });
        }}
      >
        Sign in
      </button>
    </>
  );
};

export default Home;
