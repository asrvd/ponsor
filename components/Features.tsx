import {
  FiPenTool,
  FiSave,
  FiHeart,
  FiSliders,
  FiSmile,
  FiCopy,
  FiArrowRight,
} from "react-icons/fi";
import { useRouter } from "next/router";

type FeatureProps = {
  showButton?: boolean;
};

export default function Features(props: FeatureProps) {
  const router = useRouter();

  return (
    <div className="w-full lg:w-2/3 py-[8rem] flex flex-col text-center justify-center items-center">
      <h2 className="font-extrabold text-[4rem] text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-cyan-400 shaodw-2xl">
        Features
      </h2>
      <div className="grid grid-cols-3 gap-4 py-6">
        <>
          <div className="text-left gap-3 flex flex-col bg-gray-800 rounded shadow-2xl p-6">
            <h2 className="text-gray-200 font-semibold text-2xl flex gap-2 items-center">
              <FiPenTool /> Clean Widgets
            </h2>
            <p className="text-gray-300 text-base">
              easy to make clean and beautiful widgets.
            </p>
          </div>
          <div className="text-left gap-3 flex flex-col bg-gray-800 rounded shadow-2xl p-6">
            <h2 className="text-gray-200 font-semibold text-2xl flex gap-2 items-center">
              <FiSave /> Auth Support
            </h2>
            <p className="text-gray-300 text-base">
              login with githu or google to never lose your widget.
            </p>
          </div>
          <div className="text-left gap-3 flex flex-col bg-gray-800 rounded shadow-2xl p-6">
            <h2 className="text-gray-200 font-semibold text-2xl flex gap-2 items-center">
              <FiSliders /> Customisable
            </h2>
            <p className="text-gray-300 text-base">
              add upto 7 different sponsor methods to your widget.
            </p>
          </div>
        </>
        <>
          <div className="text-left gap-3 flex flex-col bg-gray-800 rounded shadow-2xl p-6">
            <h2 className="text-gray-200 font-semibold text-2xl flex gap-2 items-center">
              <FiCopy /> Embed Anywhere
            </h2>
            <p className="text-gray-300 text-base">
              embed your widget on any site using script tags.
            </p>
          </div>
          <div className="text-left gap-3 flex flex-col bg-gray-800 rounded shadow-2xl p-6">
            <h2 className="text-gray-200 font-semibold text-2xl flex gap-2 items-center">
              <FiSmile /> Easy to Use
            </h2>
            <p className="text-gray-300 text-base">
              creating the widget is as easy as filling a form.
            </p>
          </div>
          <div className="text-left gap-3 flex flex-col bg-gray-800 rounded shadow-2xl p-6">
            <h2 className="text-gray-200 font-semibold text-2xl flex gap-2 items-center">
              <FiHeart /> Free Forever
            </h2>
            <p className="text-gray-300 text-base">
              ponsor is a completely free to use tool.
            </p>
          </div>
        </>
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
