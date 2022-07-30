import type { Widget, Link } from "@prisma/client";
import type { Session } from "next-auth";

export type Slug =
  | "patreon"
  | "githubsponsor"
  | "kofi"
  | "buymeacoffee"
  | "opencollective"
  | "liberapay"
  | "paypal"
  | "gumroad";

export type FormData = {
  name?: string;
  image?: string;
  rawImage?: any;
  previewImage?: any;
  heading?: string;
  links: any[];
};

export type DashboardProps = {
  session?: Session;
  widget?: Widget;
  links?: Link[];
};

export type DerivedLink = {
  url: string;
  title: string;
  type: string;
  icon: any;
};

export type FormProps = {
  widget?: Widget;
  links?: DerivedLink[];
  uploadImage: (e: any) => void;
  addLink: (link: DerivedLink) => void;
  removeLink: (linkName: string) => void;
  setHeading: (head: string) => void;
  setName: (name: string) => void;
  handleSave: () => void;
};

export type HeaderProps = {
  name: string | any;
  image: string | any;
};

export type WidgetProps = {
  widget?: Widget;
  links?: Link[];
};
