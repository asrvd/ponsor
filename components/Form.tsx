import {
  FiPlus,
  FiX,
  FiSave,
  FiChevronDown,
  FiCopy,
  FiCheck,
} from "react-icons/fi";
import { useState } from "react";
import { isURL } from "../lib/isURL";
import toast from "react-hot-toast";
import { getIcon } from "../lib/getIcon";
import { memo } from "react";
import type { FormProps, DerivedLink, Slug } from "../lib/types";
import { sponsorLinks } from "../lib/constants";

export default memo(function PonsorForm({ ...props }: FormProps) {
  const [hasMadeChanges, setHasMadeChanges] = useState(false);
  const [copied, setCopied] = useState(false);
  const [addedLinkTypes, setAddedLinkTypes] = useState<string[]>(
    props?.links?.map((link) => link.title) || []
  );
  const [addedLinks, setAddedLinks] = useState<DerivedLink[]>(
    props?.links?.map((link) => {
      return {
        url: link.url,
        title: link.title,
        icon: getIcon(link.type as Slug),
        type: link.type,
      };
    }) || []
  );
  const [currentLinkType, setCurrentLinkType] = useState<string>("");
  const [currentLink, setCurrentLink] = useState<string>("");

  return (
    <div className="relative flex flex-col justify-center items-center w-full lg:w-[60%] max-h-max p-3">
      <div className="w-[90%] lg:w-full md:w-[75%] bg-gray-800 rounded divide-y divide-gray-500 h-full grid grid-cols-1 p-3 gap-6">
        <form className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="file" className="text-gray-200 text-xs">
              upload avatar
            </label>
            <input
              type="file"
              className="file:rounded file:outline-none file:border-none file:cursor-pointer file:shadow-md file:hover:shadow-xl file:bg-gray-700 duration-500 text-gray-300 file:text-gray-300 file:p-2"
              onChange={(e: any) => {
                e.preventDefault();
                setHasMadeChanges(true);
                props.uploadImage(e);
              }}
            ></input>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="image" className="text-gray-200 text-xs">
              add name
            </label>
            <input
              type="text"
              className="outline-none focus:outline-none rounded bg-transparent text-gray-300 text-md border-2 border-gray-500 p-1"
              placeholder={props?.widget?.name}
              onChange={(e) => {
                e.preventDefault();
                if (e.target.value !== props?.widget?.heading) {
                  setHasMadeChanges(true);
                }
                props.setName(e.target.value);
              }}
            ></input>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="image" className="text-gray-200 text-xs">
              add heading
            </label>
            <input
              type="text"
              className="outline-none focus:outline-none rounded bg-transparent text-gray-300 text-md border-2 border-gray-500 p-1"
              placeholder={props?.widget?.heading}
              onChange={(e) => {
                e.preventDefault();
                if (e.target.value !== props?.widget?.heading) {
                  setHasMadeChanges(true);
                }
                props.setHeading(e.target.value);
              }}
            ></input>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="image" className="text-gray-200 text-xs">
              add links
            </label>
            <div className="flex gap-1">
              <select
                className="outline-none w-[60%] lg:w-[90%] text-sm lg:text-base md:text-base focus:outline-none rounded bg-gray-700 text-gray-300 text-md border-2 border-gray-500 p-1"
                onChange={(e) => {
                  e.preventDefault();
                  setCurrentLinkType(e.target.value);
                }}
                defaultValue=""
              >
                <option hidden value="">
                  Select a link type..
                </option>
                {sponsorLinks.map((link) => (
                  <option
                    key={link.name}
                    value={link.name}
                    disabled={
                      addedLinkTypes.includes(link.name) && link.name !== "Link"
                    }
                  >
                    {link.name}
                  </option>
                ))}
              </select>
              <button
                className="flex justify-left text-xs lg:text-base md:text-base w-[40%] gap-2 items-center text-center text-gray-300 hover:bg-gray-500 rounded border-2 border-gray-500 duration-300 p-1"
                onClick={(e: any) => {
                  if (addedLinkTypes.length > 0 && addedLinks.length > 0) {
                    e.preventDefault();
                    props.handleSave();
                  } else {
                    e.preventDefault();
                    toast.error("Please add atleast one link");
                  }
                }}
                disabled={!hasMadeChanges}
              >
                <FiSave />
                Save Widget
              </button>
            </div>
            <div className="w-full flex justify-between items-center gap-1">
              <input
                type="text"
                className="outline-none focus:outline-none rounded bg-transparent text-gray-300 text-md border-2 w-full border-gray-500 p-1"
                placeholder="enter link"
                onChange={(e) => {
                  e.preventDefault();
                  setCurrentLink(e.target.value);
                }}
              ></input>
              <button
                className="text-center text-gray-300 hover:bg-gray-500 p-1 rounded border-2 border-gray-500 duration-300 h-full px-2"
                onClick={(e: any) => {
                  e.preventDefault();
                  if (!currentLink) {
                    toast.error("Please enter a link!");
                    return;
                  }
                  if (!isURL(currentLink)) {
                    toast.error("Invalid url!");
                    return;
                  }
                  if (!addedLinkTypes.includes(currentLinkType)) {
                    setAddedLinks([
                      ...addedLinks,
                      {
                        title: currentLinkType,
                        url: currentLink,
                        icon: sponsorLinks.find(
                          (link) => link.name === currentLinkType
                        )?.icon,
                        type: currentLinkType.split(" ").join("").toLowerCase(),
                      },
                    ]);
                    setAddedLinkTypes([...addedLinkTypes, currentLinkType]);
                    props.addLink({
                      title: currentLinkType,
                      url: currentLink,
                      icon: sponsorLinks.find(
                        (link) => link.name === currentLinkType
                      )?.icon,
                      type: currentLinkType.split(" ").join("").toLowerCase(),
                    });
                    setHasMadeChanges(true);
                  } else {
                    toast.error("Link already added!");
                  }
                }}
              >
                <FiPlus />
              </button>
            </div>
          </div>
          <details className="group w-full">
            <summary className="flex items-center justify-between p-2 rounded cursor-pointer bg-gray-700">
              <h5 className="text-gray-300 text-sm md:text-base lg:text-base">
                Show Embed Code{" "}
                <span className="text-[0.4rem] lg:text-[0.5rem] md:text-[0.5rem">
                  {" "}
                  make sure you have saved your widget!
                </span>
              </h5>
              <FiChevronDown className="flex-shrink-0 ml-1.5 w-5 h-5 transition duration-300 group-open:-rotate-180 text-gray-300" />
            </summary>
            <pre className="relative px-2 text-[0.55rem] lg:text-sm md:text-xs w-full mt-4 leading-relaxed text-gray-200">
              {`<script 
 src="https://ponsor.vercel.app/scripts/embed.min.js" 
 async 
 defer 
 data-widget-id=${props?.widget?.userId} 
></script>`}
              <button
                className="absolute top-0 right-2 p-2 bg-gray-700 rounded-lg hover:bg-gray-600 duration-300 shadow-xl"
                onClick={(e: any) => {
                  e.preventDefault();
                  navigator.clipboard.writeText(`<script 
  src="https://ponsor.vercel.app/scripts/embed.min.js" 
  async 
  defer 
  data-widget-id=${props?.widget?.userId} 
></script>`);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 1000);
                }}
              >
                {copied === false ? <FiCopy /> : <FiCheck />}
              </button>
            </pre>
          </details>
        </form>
        <div className="grid grid-cols-1 w-full pt-6 gap-2">
          {addedLinks.map((link) => (
            <div
              className="w-full flex justify-between items-center gap-1"
              key={link?.url + link?.title}
            >
              <a
                className="flex justify-left items-center p-2 rounded shadow-md hover:shadow-xl hover:-translate-y-[0.15rem] text-gray-300 cursor-pointer duration-300 bg-gray-700 w-full gap-4"
                href={link?.url}
                target={"_blank"}
                rel="noreferrer"
              >
                {link?.icon()}
                {link?.title}
              </a>
              <button
                className="p-1 rounded shadow-md hover:shadow-xl hover:-translate-y-[0.15rem] text-gray-300 cursor-pointer duration-300 bg-gray-700 h-full px-[0.65rem]"
                onClick={(e: any) => {
                  e.preventDefault();
                  setAddedLinks(
                    addedLinks.filter((l) => l.title !== link.title)
                  );
                  setAddedLinkTypes(
                    addedLinkTypes.filter((l) => l !== link.title)
                  );
                  props.removeLink(link.title);
                  setHasMadeChanges(true);
                }}
              >
                <FiX />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
