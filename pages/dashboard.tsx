import type { NextPage } from "next";
import {
  useSession,
  signIn,
  signOut,
  getSession,
  GetSessionParams,
} from "next-auth/react";
import type { Session } from "next-auth";
import { GetServerSideProps } from "next";
import Header from "../components/Header";

export default function Dashboard(props: any) {
  // console.log(props?.session?.user);
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-col justify-center items-center min-w-screen min-h-screen bg-gray-700">
      {session?.user ? (
        <div className="flex flex-col min-h-screen w-[70%] ">
          <div className="w-full max-h-[10%]">
            <Header image={session?.user.image} name={session?.user.name} />
          </div>
          <div className="h-[90%] w-full">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum obcaecati atque debitis eveniet odio, molestias numquam cum sed dolorem nisi, a minus corrupti repudiandae iure ut excepturi dicta sequi ex aperiam suscipit ipsa mollitia dolores eum! Error rerum sed eveniet libero non optio molestias veritatis alias voluptatum, asperiores nostrum at.</div>
        </div>
      ) : (
        <h2>not signed in</h2>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  session: Session | null;
}> = async (context) => {
  const sess = await getSession(context);

  if (!sess) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session: sess,
    },
  };
};
