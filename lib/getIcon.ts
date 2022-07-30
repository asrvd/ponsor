import {
  SiPatreon,
  SiGithubsponsors,
  SiKofi,
  SiBuymeacoffee,
  SiOpencollective,
  SiLiberapay,
  SiPaypal,
  SiGumroad
} from "react-icons/si";
import type { Slug } from "./types";

const slugToIcon = {
  patreon: SiPatreon,
  githubsponsor: SiGithubsponsors,
  kofi: SiKofi,
  buymeacoffee: SiBuymeacoffee,
  opencollective: SiOpencollective,
  liberapay: SiLiberapay,
  paypal: SiPaypal,
  gumroad: SiGumroad
};

export function getIcon(slug: Slug) {
  return slugToIcon[slug];
}
