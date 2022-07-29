import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth";
import { useRouter } from "next/router";
import GitHub from "next-auth/providers/github";
import Header from "../components/Header";
import Script from "next/script";
import { FiArrowRight, FiArrowDown } from "react-icons/fi";
import { SiGoogle, SiGithub } from "react-icons/si";
import Features from "../components/Features";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (session?.user) {
    return (
      <div className="relative min-h-screen overflow-x-hidden items-center flex flex-col bg-gray-900 p-4">
        <div className="w-full lg:w-2/3">
          <Header name={session?.user?.name} image={session?.user?.image} />
        </div>
        <div className="w-[95%] lg:w-1/3 py-[8rem] pt-[11rem] flex flex-col text-center justify-center items-center">
          <h2 className="font-extrabold text-[4rem] lg:text-[6rem] md:text-[6rem] text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-cyan-400 shaodw-2xl">
            ponsor
          </h2>
          <p className="text-transparent bg-clip-text font-semibold bg-gradient-to-r from-rose-500 to-cyan-400 text-sm lg:text-lg md:text-lg">
            use widgets in your websites to let people find a way to support
            your work!
          </p>
          <button
            className="mt-12 px-6 py-2 text-rose-200 font-semibold text-xl focus:ring-2 ring-rose-400 bg-rose-500 rounded shaodw-2xl hover:-translate-y-1 duration-500 flex justiy-center items-center gap-4"
            onClick={() => router.push("/dashboard")}
          >
            Get Started <FiArrowRight />
          </button>
          <p className="animate-bounce text-lg text-gray-300 mt-20 rounded-full p-3 bg-gray-800">
            <FiArrowDown />
          </p>
        </div>
        <div className="h-[500px] bg-gray-800 rounded-lg px-10 py-10 w-full lg:w-2/3 flex flex-col justify-center items-center">
          <iframe
            className="self-center"
            height="100%"
            src="https://ponsor.vercel.app/widget/panel/cl5s4kjb30010zwufuqoskws9"
          ></iframe>
        </div>
        <Features showButton={true} />
        <Footer />
        <Script
          strategy="afterInteractive"
          src="https://ponsor.vercel.app/scripts/embed.min.js"
          data-widget-id="cl5s4kjb30010zwufuqoskws9"
        />
      </div>
    );
  }
  return (
    <div className="relative overflow-x-hidden min-h-screen items-center flex flex-col bg-gray-900 p-4">
      <div className="w-[95%] lg:w-1/3 py-[8rem] pt-[11rem] flex flex-col text-center justify-center items-center">
        <h2 className="font-extrabold text-[4rem] lg:text-[6rem] md:text-[6rem] text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-cyan-400 shaodw-2xl">
          ponsor
        </h2>
        <p className="text-transparent bg-clip-text font-semibold bg-gradient-to-r from-rose-500 to-cyan-400 text-sm lg:text-lg md:text-lg">
          use widgets in your websites to let people find a way to support your
          work!
        </p>
        <div className="flex gap-4">
          <button
            className="mt-12 px-6 py-2 text-rose-200 font-semibold text-xl focus:ring-2 ring-rose-400 bg-rose-500 rounded shaodw-2xl hover:-translate-y-1 duration-500 flex justiy-center items-center gap-4"
            onClick={() => signIn("github", { callbackUrl: "/" })}
          >
            <SiGithub /> Sign In
          </button>
          <button
            className="mt-12 px-6 py-2 text-rose-200 font-semibold text-xl focus:ring-2 ring-rose-400 bg-rose-500 rounded shaodw-2xl hover:-translate-y-1 duration-500 flex justiy-center items-center gap-4"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <SiGoogle /> Sign In
          </button>
        </div>
        <p className="animate-bounce text-lg text-gray-300 mt-20 rounded-full p-3 bg-gray-800">
          <FiArrowDown />
        </p>
      </div>
      <div className="h-[500px] bg-gray-800 rounded-lg px-10 py-10 w-full lg:w-2/3 flex flex-col justify-center items-center">
        <iframe
          className="self-center"
          height="100%"
          src="https://ponsor.vercel.app/widget/panel/cl5s4kjb30010zwufuqoskws9"
        ></iframe>
      </div>
      <Features showButton={false} />
      <Footer />
      <Script
        strategy="afterInteractive"
        src="https://ponsor.vercel.app/scripts/embed.min.js"
        data-widget-id="cl5s4kjb30010zwufuqoskws9"
      />
    </div>
  );
};

export default Home;
