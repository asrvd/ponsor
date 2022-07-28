/* eslint-disable @next/next/no-img-element */
import { getIcon } from "../lib/getIcon";

export default function WidgetComponent(props: any) {
  return (
    <div className="w-full xs:w-[22rem] rounded-2xl shadow-2xl p-6">
      <section className="flex w-full flex-col items-center divide-y divide-gray-500 gap-4">
        <div className="flex flex-col justify-center items-center w-full">
          <img
            src={props?.widget?.avatar}
            alt="avatar"
            className="rounded-full w-[6rem] h-[6rem] shadow-md border-2 border-gray-300"
          ></img>
          <h2 className="text-lg text-gray-800 font-bold">
            sponsor {props?.widget?.name}
          </h2>
          <h2 className="text-sm text-center text-gray-700">
            {props?.widget?.heading}
          </h2>
        </div>
        <div className="w-full pt-6 grid grid-cols-1 gap-2">
          {props?.links?.map((link: any) => (
            <div
              key={link?.title}
              className="flex justify-center items-center p-2 rounded-lg pl-6 shadow-md hover:shadow-xl hover:-translate-y-[0.15rem] text-gray-300 cursor-pointer duration-300 bg-gray-800"
            >
              <a
                className="w-full h-full text-center flex justify-center items-center gap-2"
                href={link?.url}
              >
                {/**@ts-ignore**/}
                {getIcon(link?.type)()}
                {link?.title}
              </a>
            </div>
          ))}
        </div>
        <div className="w-full pt-6 grid grid-cols-1 gap-2 text-center">
          <h2 className="text-xs text-gray-700">
            made with {`<3`} using ponsor
          </h2>
        </div>
      </section>
    </div>
  );
}
