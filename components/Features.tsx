import { FiArrowRight } from "react-icons/fi";
import { useRouter } from "next/router";
import { features } from "../lib/constants";

type FeatureProps = {
  showButton?: boolean;
};

type Feature = {
  title: string;
  description: string;
  icon: any;
};

export default function Features(props: FeatureProps) {
  const router = useRouter();

  return (
    <div className="w-full lg:w-2/3 py-[8rem] flex flex-col text-center justify-center items-center">
      <h2 className="font-extrabold text-[3rem] text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-cyan-400 shaodw-2xl">
        Features
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 py-6">
        {features.map((feature) => (
          <>
            {feature.map((f: Feature) => (
              <div
                className="text-left gap-3 flex flex-col bg-gray-800 rounded shadow-2xl p-4"
                key={f.title}
              >
                <h2 className="text-gray-200 font-semibold text-lg lg:text-2xl md:text-xl flex gap-2 items-center">
                  {f.icon()} {f.title}
                </h2>
                <p className="text-gray-300 text-sm lg:text-base md:text-base">
                  {f.description}
                </p>
              </div>
            ))}
          </>
        ))}
      </div>
      {props.showButton && (
        <button
          className="mt-12 px-6 py-2 text-rose-200 font-semibold text-xl focus:ring-2 ring-rose-400 bg-rose-500 rounded shaodw-2xl hover:-translate-y-1 duration-500 flex justiy-center items-center gap-4"
          onClick={() => router.push("/dashboard")}
        >
          Create Widget <FiArrowRight />
        </button>
      )}
    </div>
  );
}
