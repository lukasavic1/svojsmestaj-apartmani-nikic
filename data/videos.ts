import { media } from "@/data/media";
import type { LocalizedString } from "@/types/locale";

const L = (sr: string, en: string): LocalizedString => ({ sr, en });

export type VideoItem = {
  id: string;
  youtubeId: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  duration: string;
  featured?: boolean;
  thumbnail: string;
};

/** Real videos embedded on apartmaninikic.me and published on @apartmaninikictivat. */
export const videos: VideoItem[] = [
  {
    id: "hero-tour",
    youtubeId: "Qf0riAAMU8I",
    title: L("Apartmani Nikić Tivat", "Apartmani Nikić Tivat"),
    subtitle: L(
      "Pogled sa terase i ambijent u Lepetanima.",
      "The terrace view and the setting in Lepetane."
    ),
    duration: "1:15",
    featured: true,
    thumbnail: media.about,
  },
  {
    id: "tivat",
    youtubeId: "k_E5wj2eREg",
    title: L("Izdavanje apartmana Tivat", "Apartments to let in Tivat"),
    subtitle: L("Apartmani Nikić, Tivat.", "Apartmani Nikić, Tivat."),
    duration: "0:36",
    thumbnail: media.orange[0],
  },
  {
    id: "lepetane",
    youtubeId: "jdt8LXomiW4",
    title: L("Izdavanje apartmana Lepetane", "Apartments to let in Lepetane"),
    subtitle: L("Plaža je pedeset metara od kapije.", "The beach is fifty metres from the gate."),
    duration: "0:53",
    thumbnail: media.home[2],
  },
  {
    id: "crna-gora",
    youtubeId: "1HSNutRG0Ug",
    title: L("Izdavanje apartmana Crna Gora", "Apartments to let in Montenegro"),
    subtitle: L("Smještaj uz samu obalu Boke.", "A stay right on the Bay of Kotor shore."),
    duration: "0:59",
    thumbnail: media.beautifulView[0],
  },
];

export const featuredVideo = videos.find((item) => item.featured) ?? videos[0];
export const reelVideos = videos.filter((item) => !item.featured);
