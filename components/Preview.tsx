/* eslint-disable @next/next/no-img-element */
import {
  SiGithub,
  SiBuymeacoffee,
  SiKofi,
  SiPatreon,
  SiOpencollective,
  SiGithubsponsors,
} from "react-icons/si";
import { memo } from "react";

export default memo(function Preview(props: any) {
  return (
    <div className="flex flex-col justfy-center items-center w-full max-h-max p-3 bg-gray-800 rounded shaodw-xl">
      <div className="w-[65%] bg-gray-700 rounded divide-y divide-gray-500 h-full grid grid-cols-1 p-3 gap-6">
        <div className="flex flex-col justify-center items-center w-full">
          <img
            alt="avatar"
            src={props.uploadedAv ? props.uploadedAv : props.av}
            className="rounded-full w-20 h-20"
          ></img>
          <h2 className="text-lg text-gray-200 font-bold">
            sponsor {props.name}
          </h2>
          <h2 className="text-xs text-center text-gray-200">
            {props.heading}
          </h2>
        </div>
        <div className="grid grid-cols-1 w-full pt-6 gap-2">
          {props?.links?.map((link: any) => (
            <div
              key={link?.title}
              className="flex justify-center items-center p-2 rounded shadow-md hover:shadow-xl hover:-translate-y-[0.15rem] text-gray-300 cursor-pointer duration-300 bg-gray-800"
            >
              <a className="w-full h-full text-center flex justify-start items-center gap-4" href={link?.url}>
                {link?.icon()}
                {link?.title}
              </a>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 w-full pt-6 gap-2 text-center">
          <h2 className="text-xs text-gray-200">
            made with {`<3`} using ponsor
          </h2>
        </div>
      </div>
    </div>
  );
})
