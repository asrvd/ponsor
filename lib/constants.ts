import {
  FiPenTool,
  FiSave,
  FiHeart,
  FiSliders,
  FiSmile,
  FiCopy,
} from "react-icons/fi";
import {
  SiPatreon,
  SiGithubsponsors,
  SiKofi,
  SiBuymeacoffee,
  SiOpencollective,
  SiLiberapay,
  SiPaypal,
  SiGumroad,
} from "react-icons/si";

export const features = [
  [
    {
      icon: FiPenTool,
      title: "Clean Widgets",
      description: "easy to make clean and beautiful widgets.",
    },
    {
      icon: FiSave,
      title: "Auth Support",
      description: "login with github or google to never lose your widget.",
    },
    {
      icon: FiSliders,
      title: "Customizable",
      description: "add upto 7 different sponsor methods to your widget.",
    },
  ],
  [
    {
      icon: FiCopy,
      title: "Embed Anywhere",
      description: "embed your widget on any site using script tags.",
    },
    {
      icon: FiSmile,
      title: "Easy to Use",
      description: "creating the widget is as easy as filling a form.",
    },
    {
      icon: FiHeart,
      title: "Free Forever",
      description: "ponsor is a completely free to use tool.",
    },
  ],
];

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
  {
    name: "Gumroad",
    icon: SiGumroad,
  },
];
