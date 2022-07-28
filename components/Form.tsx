import { useForm, SubmitHandler } from "react-hook-form";
import {
  SiPatreon,
  SiGithubsponsors,
  SiKofi,
  SiBuymeacoffee,
  SiOpencollective,
  SiLiberapay,
  SiPaypal,
} from "react-icons/si";
import { FiLink, FiPlus, FiDelete, FiX, FiSave } from "react-icons/fi";
import { useState, useEffect } from "react";
import { isURL } from "../lib/isURL";
import toast from "react-hot-toast";
import type { Widget } from "@prisma/client";
import { getIcon } from "../lib/getIcon";
import { memo } from "react";

export interface Inputs {
  heading: string;
  image: string;
}

export const sponsorLinks = [
  {
    name: "GitHub Sponsor",
    icon: SiGithubsponsors,
  },
  {
    name: "Buy me a coffee",
    icon: SiBuymeacoffee,
  },
  {
    name: "Kofi",
    icon: SiKofi,
  },
  {
    name: "Patreon",
    icon: SiPatreon,
  },
  {
    name: "Open Collective",
    icon: SiOpencollective,
  },
  {
    name: "Liberapay",
    icon: SiLiberapay,
  },
  {
    name: "PayPal",
    icon: SiPaypal,
  },
];

type Link = {
  url: string;
  title: string;
  type: string;
  icon: any;
};

type FormProps = {
  widget?: Widget;
  links?: Link[];
  uploadImage: (e: any) => void;
  addLink: (link: Link) => void;
  removeLink: (linkName: string) => void;
  setHeading: (head: string) => void;
  handleSave: () => void;
};

type Slug =
  | "patreon"
  | "githubsponsor"
  | "kofi"
  | "buymeacoffee"
  | "opencollective"
  | "liberapay"
  | "paypal";

export default memo(function PonsorForm({ ...props }: FormProps) {
  const [addedLinkTypes, setAddedLinkTypes] = useState<string[]>(
    props?.links?.map((link) => link.title) || []
  );
  const [addedLinks, setAddedLinks] = useState<Link[]>(
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
  const [links, setLinks] = useState([
    {
      name: "GitHub Sponsor",
      icon: <SiGithubsponsors />,
      selected: false,
    },
    {
      name: "Buy me a coffee",
      icon: <SiBuymeacoffee />,
      selected: false,
    },
    {
      name: "Kofi",
      icon: <SiKofi />,
      selected: false,
    },
    {
      name: "Patreon",
      icon: <SiPatreon />,
      selected: false,
    },
    {
      name: "Open Collective",
      icon: <SiOpencollective />,
      selected: false,
    },
    {
      name: "Liberapay",
      icon: <SiLiberapay />,
      selected: false,
    },
    {
      name: "PayPal",
      icon: <SiPaypal />,
      selected: false,
    },
  ]);

  return (
    <div className="relative flex flex-col justify-center items-center w-full max-h-max p-3 bg-gray-800 rounded shaodw-xl">
      <div className="w-[80%] bg-gray-700 rounded divide-y divide-gray-500 h-full grid grid-cols-1 p-3 gap-6">
        <form className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="file" className="text-gray-200 text-xs">
              upload avatar
            </label>
            <input
              type="file"
              className="file:rounded file:outline-none file:border-none file:cursor-pointer file:shadow-md file:hover:shadow-xl file:bg-gray-800 duration-500 text-gray-300 file:text-gray-300 file:p-2"
              onChange={props.uploadImage}
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
                className="outline-none w-[60%] text-sm lg:text-base md:text-base focus:outline-none rounded bg-gray-700 text-gray-300 text-md border-2 border-gray-500 p-1"
                onChange={(e) => {
                  e.preventDefault();
                  setCurrentLinkType(e.target.value);
                }}
                defaultValue=""
              >
                <option hidden value="">
                  select a link type..
                </option>
                {links.map((link) => (
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
                    toast.error("Please add atleast one link");
                  }
                }}
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
                  } else {
                    toast.error("Link already added!");
                  }
                }}
              >
                <FiPlus />
              </button>
            </div>
          </div>
        </form>
        <div className="grid grid-cols-1 w-full pt-6 gap-2">
          {addedLinks.map((link) => (
            <div
              className="w-full flex justify-between items-center gap-1"
              key={link?.url + link?.title}
            >
              <a
                className="flex justify-left items-center p-2 rounded shadow-md hover:shadow-xl hover:-translate-y-[0.15rem] text-gray-300 cursor-pointer duration-300 bg-gray-800 w-full gap-4"
                href={link?.url}
              >
                {link?.icon()}
                {link?.title}
              </a>
              <button
                className="p-1 rounded shadow-md hover:shadow-xl hover:-translate-y-[0.15rem] text-gray-300 cursor-pointer duration-300 bg-gray-800 h-full px-[0.65rem]"
                onClick={(e: any) => {
                  e.preventDefault();
                  setAddedLinks(
                    addedLinks.filter((l) => l.title !== link.title)
                  );
                  setAddedLinkTypes(
                    addedLinkTypes.filter((l) => l !== link.title)
                  );
                  props.removeLink(link.title);
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
