import { media } from "@/data/media";
import type { Apartment, Photo } from "@/types/apartment";
import type { LocalizedString, LocalizedStringList } from "@/types/locale";

const L = (sr: string, en: string): LocalizedString => ({ sr, en });
const LL = (sr: string[], en: string[]): LocalizedStringList => ({ sr, en });

function gallery(
  urls: readonly string[],
  nameSr: string,
  nameEn: string
): Photo[] {
  return urls.map((src, i) => ({
    src,
    alt: L(`${nameSr} — fotografija ${i + 1}`, `${nameEn} — photo ${i + 1}`),
  }));
}

export const apartments: Apartment[] = [
  {
    id: "orange",
    slug: "orange",
    number: "01",
    accent: "#C4783A",
    name: L("Apartman Orange", "Apartman Orange"),
    sizeSqm: 40,
    capacity: 4,
    beds: 2,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 135,
    calendarId: 7,
    sourceUrl: "https://apartmaninikic.me/apartman/apartman-orange/",
    hook: L(
      "Apartman se izdaje sa 1 spavaćom i 1 dnevnom sobom, balkonom i pogledom na more.",
      "The apartment is let with 1 bedroom and 1 living room, a balcony and a sea view."
    ),
    description: L(
      "Apartman se izdaje u cjelosti i sastoji se od prostranog dnevnog boravka, odvojene spavaće sobe i kupatila ss tušem i fenom. Ulaz je privatan, klima uređaj obezbeđuje prijatnu temperaturu tokom vrelih dana. Kuhinja je u potpunosti opremljena sa svim što vam treba: šporet, rerna, frižider i kuhinjski pribor, pa možete birati između kuvanja kod kuće ili večere u nekom od obližnjih restorana. Na terasi sa pogledom na more jutro počinje kako treba. Uz zonu za sedenje na terasi večeri u apartmanu su jednako prijatne. Apartman ima dva ležaja.",
      "The apartment is rented in full and consists of a spacious living room, a separate bedroom and a bathroom with a shower and a hairdryer. The entrance is private; air conditioning keeps the temperature comfortable on hot days. The kitchen is fully equipped with everything you need: a hob, oven, fridge and cookware, so you can cook at home or eat in nearby restaurants. On the sea-view terrace the morning starts as it should. With the seating on the terrace, evenings in the apartment are just as pleasant. The apartment has two beds."
    ),
    layout: L(
      "1 veliki bračni krevet · 1 kauč na razvlačenje · balkon / terasa",
      "1 large double bed · 1 sofa bed · balcony / terrace"
    ),
    tags: LL(
      ["Balkon", "Terasa", "Klima", "WiFi", "Parking"],
      ["Balcony", "Terrace", "A/C", "WiFi", "Parking"]
    ),
    amenityKeys: [
      "entire",
      "sea",
      "mountain",
      "terrace",
      "kitchen",
      "bathroom",
      "ac",
      "wifi",
      "tv",
      "parking",
      "entrance",
    ],
    photos: gallery(media.orange, "Apartman Orange", "Apartman Orange"),
  },
  {
    id: "beautiful-view",
    slug: "beautiful-view",
    number: "02",
    accent: "#B38F58",
    name: L("Beautiful View Apartment", "Beautiful View Apartment"),
    sizeSqm: 55,
    capacity: 5,
    beds: 3,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 170,
    calendarId: 6,
    sourceUrl: "https://apartmaninikic.me/apartman/apartman-beautiful-view/",
    hook: L(
      "Apartman za izdavanje sa 1 spavaćom i 1 dnevnom sobom - sa pogledom na more i planinu.",
      "Apartment to let with 1 bedroom and 1 living room — with a sea and mountain view."
    ),
    description: L(
      "Apartman ima privatni ulaz i klima uređaj. Sastoji se od dnevnog boravka, odvojene spavaće sobe i kupatila sa tušem i fenom za kosu. Kuhinja je potpuno opremljena - ima šporet, rernu, frižider i sav potreban pribor, tako da možete bez problema pripremati obroke ako ne želite svaki dan jesti vani. Na terasi sa pogledom na more možete popiti jutarnju kafu ili večerati dok sunce zalazi iza planina. Apartman ima veš mašinu i flat-screen televizor sa kablovskim programima i besplatnom WiFi vezom. Apartman raspolaže sa tri ležaja.",
      "The apartment has a private entrance and air conditioning. It consists of a living room, a separate bedroom and a bathroom with a shower and a hairdryer. The kitchen is fully equipped — hob, oven, fridge and all the cookware you need, so you can prepare meals if you do not want to eat out every day. On the sea-view terrace you can have morning coffee or dinner while the sun sets behind the mountains. The apartment has a washing machine and a flat-screen TV with cable channels and free WiFi. There are three beds."
    ),
    layout: L(
      "2 velika bračna kreveta · 1 kauč na razvlačenje · balkon / terasa",
      "2 large double beds · 1 sofa bed · balcony / terrace"
    ),
    tags: LL(
      ["Pogled na more", "Terasa", "Klima", "WiFi", "Veš mašina"],
      ["Sea view", "Terrace", "A/C", "WiFi", "Washing machine"]
    ),
    amenityKeys: [
      "entire",
      "sea",
      "mountain",
      "terrace",
      "kitchen",
      "bathroom",
      "ac",
      "wifi",
      "tv",
      "washer",
      "parking",
      "entrance",
    ],
    photos: gallery(
      media.beautifulView,
      "Beautiful View Apartment",
      "Beautiful View Apartment"
    ),
  },
  {
    id: "studio",
    slug: "studio",
    number: "03",
    accent: "#C5A880",
    name: L("Studio Apartman", "Studio Apartman"),
    sizeSqm: 30,
    capacity: 3,
    beds: 2,
    bedrooms: 0,
    bathrooms: 1,
    pricePerNight: 105,
    calendarId: 5,
    sourceUrl: "https://apartmaninikic.me/apartman/03-studio-apartman/",
    hook: L(
      "Studio se izdaje sa 1 bračnim krevetom i 1 normalnim krevetom. Apartman ima pogled na more i planinu.",
      "The studio is let with 1 double bed and 1 single bed. The apartment has a sea and mountain view."
    ),
    description: L(
      "Gosti mogu sami pripremati obroke u kuhinji opremljenoj šporetom, frižiderom, kuhinjskim priborom i električnim kuvalom za vodu. Studio raspolaže klima uređajem, flat-screen televizorom sa kablovskim programima i privatnim kupatilom. Terasa s pogledom na more savršeno je mesto za jutarnju kafu ili večernji odmor uz zvuk talasa. Studio ima dva ležaja i može primiti 3 osobe. Peščana plaža je pedesetak metara od ulaza. Trajekt Lepetane - Kamenari odmah pored. Tivat, Kotor, Porto Montenegro - sve na dohvat ruke.",
      "Guests can prepare meals in a kitchen with a hob, fridge, cookware and an electric kettle. The studio has air conditioning, a flat-screen TV with cable channels and a private bathroom. The sea-view terrace is the place for morning coffee or an evening rest with the sound of the waves. The studio has two beds and sleeps 3. The sandy beach is about fifty metres from the entrance. The Lepetane–Kamenari ferry is next door. Tivat, Kotor, Porto Montenegro — all within easy reach."
    ),
    layout: L(
      "Nema spavaće sobe · 1 bračni i 1 normalni krevet · balkon / terasa",
      "No separate bedroom · 1 double and 1 single bed · balcony / terrace"
    ),
    tags: LL(
      ["Studio", "Balkon", "Klima", "WiFi", "Parking"],
      ["Studio", "Balcony", "A/C", "WiFi", "Parking"]
    ),
    amenityKeys: [
      "entire",
      "sea",
      "mountain",
      "terrace",
      "kitchen",
      "bathroom",
      "ac",
      "wifi",
      "tv",
      "washer",
      "parking",
      "entrance",
    ],
    photos: gallery(media.studio, "Studio Apartman", "Studio Apartman"),
  },
  {
    id: "green",
    slug: "green",
    number: "04",
    accent: "#3F6B5A",
    name: L("Apartman Green", "Apartman Green"),
    sizeSqm: 40,
    capacity: 4,
    beds: 2,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 135,
    calendarId: 4,
    sourceUrl: "https://apartmaninikic.me/apartman/apartman-green/",
    hook: L(
      "Apartman se izdaje ceo, sa 1 spavaćom i 1 dnevnom sobom, sa terasom i pogledom na more.",
      "The apartment is let as a whole, with 1 bedroom and 1 living room, a terrace and a sea view."
    ),
    description: L(
      "Apartman se izdaje u celosti i ima privatni ulaz - tako da ste od trenutka dolaska potpuno samostalni. Sastoji se od prostranog dnevnog boravka, odvojene spavaće sobe i kupatila sa tušem i fenom za kosu. Klima uređaj brine o prijatnoj temperaturi. U kuhinji koja je dobro opremljena nalaze se šporet, rerna, frižider i sav potreban pribor. Terasa sa pogledom na more i planinu idealna je za jutarnju kafu ili opuštanje uz zalazak sunca. Apartman raspolaže sa veš mašinom, kao i sa Smart TV-om i WiFi vezom. Ima 2 ležaja. Primamo porodice, parove i manje grupe. Deca su dobrodošla u svakom uzrastu.",
      "The apartment is rented in full and has a private entrance — from the moment you arrive you are fully independent. It consists of a spacious living room, a separate bedroom and a bathroom with a shower and a hairdryer. Air conditioning keeps the temperature comfortable. The well-equipped kitchen has a hob, oven, fridge and all the cookware you need. The terrace with a sea and mountain view is for morning coffee or sunset. There is a washing machine, Smart TV and WiFi. Two beds. We welcome families, couples and smaller groups. Children of every age are welcome."
    ),
    layout: L(
      "1 veliki bračni krevet · 1 kauč na razvlačenje · balkon / terasa",
      "1 large double bed · 1 sofa bed · balcony / terrace"
    ),
    tags: LL(
      ["Terasa", "Kuhinja", "Klima", "WiFi", "Parking"],
      ["Terrace", "Kitchen", "A/C", "WiFi", "Parking"]
    ),
    amenityKeys: [
      "entire",
      "sea",
      "mountain",
      "terrace",
      "kitchen",
      "bathroom",
      "ac",
      "wifi",
      "tv",
      "washer",
      "parking",
      "entrance",
    ],
    photos: gallery(media.green, "Apartman Green", "Apartman Green"),
  },
  {
    id: "grey",
    slug: "grey",
    number: "05",
    accent: "#64748B",
    name: L("Apartman Grey", "Apartman Grey"),
    sizeSqm: 45,
    capacity: 4,
    beds: 2,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 155,
    calendarId: 3,
    sourceUrl: "https://apartmaninikic.me/apartman/apartman-grey/",
    hook: L(
      "Apartman za izdavanje sa 1 spavaćom sobom, privatnim ulazom i pogledom na more.",
      "Apartment to let with 1 bedroom, a private entrance and a sea view."
    ),
    description: L(
      "Ovaj apartman ima sopstveni privatni ulaz, tako da niste u dodiru ni sa kim osim sa svojom porodicom ili društvom. Prostor čine dnevni boravak, odvojena spavaća soba i kupatilo sa tušem i fenom za kosu. Klima uređaj obezbeđuje prijatnu temperaturu i tokom najtoplijih letnjih dana. Kuhinja je opremljena šporetom, rernom, frižiderom i svim potrebnim priborom, pa gosti mogu sami pripremati obroke. Poseban doživljaj pruža terasa sa pogledom na more. Apartman takođe ima veš mašinu i flat-screen televizor sa kablovskim programima.",
      "This apartment has its own private entrance, so you are not in contact with anyone except your family or friends. The space is a living room, a separate bedroom and a bathroom with a shower and a hairdryer. Air conditioning keeps it comfortable even on the hottest summer days. The kitchen has a hob, oven, fridge and all the cookware, so guests can cook. The sea-view terrace is a particular pleasure. The apartment also has a washing machine and a flat-screen TV with cable channels."
    ),
    layout: L(
      "1 veliki bračni krevet · 1 kauč na razvlačenje · balkon / terasa",
      "1 large double bed · 1 sofa bed · balcony / terrace"
    ),
    tags: LL(
      ["Privatni ulaz", "Kuhinja", "Klima", "WiFi", "Parking"],
      ["Private entrance", "Kitchen", "A/C", "WiFi", "Parking"]
    ),
    amenityKeys: [
      "entire",
      "sea",
      "mountain",
      "terrace",
      "kitchen",
      "bathroom",
      "ac",
      "wifi",
      "tv",
      "washer",
      "parking",
      "entrance",
    ],
    photos: gallery(media.grey, "Apartman Grey", "Apartman Grey"),
  },
  {
    id: "blue",
    slug: "blue",
    number: "06",
    accent: "#1D4E89",
    name: L("Apartman Blue", "Apartman Blue"),
    sizeSqm: 60,
    capacity: 5,
    beds: 3,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: null,
    calendarId: null,
    sourceUrl: "https://apartmaninikic.me/apartman/06-apartman-blue/",
    fullyBooked: true,
    hook: L(
      "Apartman se izdaje sa 1 odvojenom spavaćom sobom, dnevnim boravkom, terasom i pogledom na more.",
      "The apartment is let with 1 separate bedroom, a living room, a terrace and a sea view."
    ),
    description: L(
      "Apartman Blue je deo Apartmana Nikić u Lepetanima, Tivat, i pravi je izbor za ljetovanje uz more. Ima privatni ulaz i klima uređaj, dnevni boravak, odvojenu spavaću sobu i kupatilo sa tušem i fenom. Kuhinja je potpuno opremljena - šporet, rerna, frižider i sav pribor za pripremu obroka. Na terasi s pogledom na more sačekajte jutarnju kafu ili zalazak sunca iza planina. Tu su i mašina za veš, mašina za sušenje veša, flat-screen TV i besplatan WiFi. Smještaj za tri osobe, direktno uz Boku Kotorsku. Kapacitet apartmana je 5 osoba.",
      "Apartman Blue is part of Apartmani Nikić in Lepetane, Tivat, and a fit for a seaside holiday. It has a private entrance and air conditioning, a living room, a separate bedroom and a bathroom with a shower and a hairdryer. The kitchen is fully equipped — hob, oven, fridge and all the cookware. On the sea-view terrace wait for morning coffee or sunset behind the mountains. There is also a washing machine, a tumble dryer, a flat-screen TV and free WiFi. Accommodation for three people, right on the Bay of Kotor. The apartment sleeps 5."
    ),
    layout: L(
      "1 veliki bračni krevet · 2 kauča na razvlačenje · balkon / terasa",
      "1 large double bed · 2 sofa beds · balcony / terrace"
    ),
    tags: LL(
      ["60 m²", "Pogled na more", "Klima", "WiFi", "Zauzet"],
      ["60 m²", "Sea view", "A/C", "WiFi", "Occupied"]
    ),
    amenityKeys: [
      "entire",
      "sea",
      "mountain",
      "terrace",
      "kitchen",
      "bathroom",
      "ac",
      "wifi",
      "tv",
      "washer",
      "parking",
      "entrance",
    ],
    photos: gallery(media.blue, "Apartman Blue", "Apartman Blue"),
  },
];

export function getApartment(id: string): Apartment | undefined {
  return apartments.find((unit) => unit.id === id || unit.slug === id);
}

export function getApartmentBySlug(slug: string): Apartment | undefined {
  return apartments.find((unit) => unit.slug === slug);
}
