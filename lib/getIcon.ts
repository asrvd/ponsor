import {
  SiPatreon,
  SiGithubsponsors,
  SiKofi,
  SiBuymeacoffee,
  SiOpencollective,
  SiLiberapay,
  SiPaypal,
} from "react-icons/si";

type Slug = "patreon" | "githubsponsor" | "kofi" | "buymeacoffee" | "opencollective" | "liberapay" | "paypal";

const slugToIcon = {
  patreon: SiPatreon,
  githubsponsor: SiGithubsponsors,
  kofi: SiKofi,
  buymeacoffee: SiBuymeacoffee,
  opencollective: SiOpencollective,
  liberapay: SiLiberapay,
  paypal: SiPaypal,
};

export function getIcon(slug: Slug) {
  return slugToIcon[slug];
}
