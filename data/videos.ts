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
    title: L("Doživite Lepetane & Boku Kotorsku", "Experience Lepetane & the Bay of Kotor"),
    subtitle: L(
      "Pogled sa privatne terase i ambijent uz samu obalu",
      "The view from the private terrace and the setting right on the shore"
    ),
    duration: "1:15",
    featured: true,
    thumbnail: media.about,
  },
  {
    id: "tivat",
    youtubeId: "k_E5wj2eREg",
    title: L("Virtuelna tura: Apartman Orange", "Virtual tour: Apartman Orange"),
    subtitle: L("Prostor, terasa i pogled iz našeg najtraženijeg apartmana.", "The space, terrace and view from our most requested apartment."),
    duration: "0:36",
    thumbnail: media.orange[0],
  },
  {
    id: "lepetane",
    youtubeId: "jdt8LXomiW4",
    title: L("Peščana plaža na 50m od objekta", "Sandy beach 50m from the house"),
    subtitle: L("Mirna obala u Lepetanima, pred vratima apartmana.", "A quiet shore in Lepetane, just outside the gate."),
    duration: "0:53",
    thumbnail: media.home[2],
  },
  {
    id: "crna-gora",
    youtubeId: "1HSNutRG0Ug",
    title: L("Pogled na zalazak sunca iz apartmana", "Sunset view from the apartment"),
    subtitle: L("Veče na terasi, kada Boka postane zlatna.", "Evening on the terrace, when the bay turns gold."),
    duration: "0:59",
    thumbnail: media.beautifulView[0],
  },
];

export const featuredVideo = videos.find((item) => item.featured) ?? videos[0];
export const reelVideos = videos.filter((item) => !item.featured);
