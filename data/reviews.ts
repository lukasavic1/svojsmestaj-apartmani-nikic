import type { Distance, Highlight, Review } from "@/types/apartment";
import type { LocalizedString } from "@/types/locale";

const L = (sr: string, en: string): LocalizedString => ({ sr, en });

export const highlights: Highlight[] = [
  {
    id: "entire",
    icon: "entire",
    title: L("Apartmani", "Apartments"),
    body: L("Izdaju se celosti", "Rented in full"),
  },
  {
    id: "beach",
    icon: "beach",
    title: L("Peščana plaža", "Sandy beach"),
    body: L("Na 50m od apartmana", "50m from the apartments"),
  },
  {
    id: "kitchen",
    icon: "kitchen",
    title: L("Sopstvena kuhinja", "Own kitchen"),
    body: L("Opremljena kuhinja", "Equipped kitchen"),
  },
  {
    id: "bathroom",
    icon: "bathroom",
    title: L("Sopstveno kupatilo", "Own bathroom"),
    body: L("Opremljeno kupatilo", "Equipped bathroom"),
  },
  {
    id: "sea",
    icon: "sea",
    title: L("Pogled na more", "Sea view"),
    body: L("Imaju pogled na more", "They have a sea view"),
  },
  {
    id: "mountain",
    icon: "mountain",
    title: L("Pogled na planinu", "Mountain view"),
    body: L("Imaju pogled na planinu", "They have a mountain view"),
  },
  {
    id: "capacity",
    icon: "capacity",
    title: L("Kapacitet gostiju", "Guest capacity"),
    body: L("Od 3 do 5 osoba", "From 3 to 5 people"),
  },
  {
    id: "terrace",
    icon: "terrace",
    title: L("Terasa - balkon", "Terrace - balcony"),
    body: L("Imaju terasu i/ili balkon", "They have a terrace and/or balcony"),
  },
  {
    id: "ac",
    icon: "ac",
    title: L("Klima uređaj", "Air conditioning"),
    body: L("Apartmani imaju klimu", "The apartments have A/C"),
  },
  {
    id: "wifi",
    icon: "wifi",
    title: L("TV i internet", "TV and internet"),
    body: L("Smart TV i WiFi", "Smart TV and WiFi"),
  },
  {
    id: "parking",
    icon: "parking",
    title: L("Parking", "Parking"),
    body: L("Besplatan parking", "Free parking"),
  },
  {
    id: "transfer",
    icon: "transfer",
    title: L("Usluga prevoza", "Transfer service"),
    body: L("Od i do aerodroma", "To and from the airport"),
  },
];

export const valueBar = [
  {
    id: "beach",
    value: "50 m",
    label: L("do plaže", "to the beach"),
  },
  {
    id: "parking",
    value: L("Besplatan", "Free"),
    label: L("parking", "parking"),
  },
  {
    id: "view",
    value: L("Pogled", "Sea"),
    label: L("na more", "views"),
  },
  {
    id: "host",
    value: L("Domaćinski", "Personal"),
    label: L("doček", "welcome"),
  },
] as const;

export const distances: Distance[] = [
  {
    id: "beach",
    value: L("50 m", "50 m"),
    label: L("Peščana plaža", "Sandy beach"),
  },
  {
    id: "tivat",
    value: L("5 min", "5 min"),
    label: L("Centar Tivta & Porto Montenegro", "Tivat centre & Porto Montenegro"),
  },
  {
    id: "ferry",
    value: L("10 min", "10 min"),
    label: L("Trajekt Lepetane – Kamenari", "Lepetane – Kamenari ferry"),
  },
  {
    id: "kotor",
    value: L("15 min", "15 min"),
    label: L("Stari grad Kotor", "Old Town of Kotor"),
  },
];

export const reviews: Review[] = [
  {
    id: "gilbert",
    name: "Gilbert",
    date: L("20. jul 2026.", "20 July 2026"),
    source: "Booking.com",
    rating: 10,
    country: "US",
    quote: L(
      "I absolutely loved everything about my stay at Nikic Apartments! From the breathtaking water views and fantastic location to the exceptional cleanliness and comfort of the apartment, everything exceeded my expectations. The host was incredibly welcoming, kind, and attentive, making the entire experience feel even more special. Waking up to such an amazing view every day was truly unforgettable. Highly recommended!",
      "I absolutely loved everything about my stay at Nikic Apartments! From the breathtaking water views and fantastic location to the exceptional cleanliness and comfort of the apartment, everything exceeded my expectations. The host was incredibly welcoming, kind, and attentive, making the entire experience feel even more special. Waking up to such an amazing view every day was truly unforgettable. Highly recommended!"
    ),
  },
  {
    id: "danijela",
    name: "Danijela",
    date: L("10. avgust 2026.", "10 August 2026"),
    source: "Booking.com",
    rating: 10,
    country: "ME",
    quote: L(
      "Predivno i čista desetka,za svaku preporuku. Lokacija savršena,apartman predivan na sjajnom mestu ,pogled na more očarajavaju.",
      "Wonderful and a clean ten, highly recommended. Perfect location, beautiful apartment in a superb spot, enchanting sea view."
    ),
  },
  {
    id: "roni",
    name: "Roni",
    date: L("29. jul 2026.", "29 July 2026"),
    source: "Booking.com",
    rating: 10,
    country: "AL",
    quote: L(
      "Vrlo lijepo i nježno mjesto. Pogled na more. Divna ekipa.",
      "Very nice and pretty place. Sea view. Nice crew."
    ),
  },
  {
    id: "beqiri",
    name: "Beqiri",
    date: L("28. jul 2026.", "28 July 2026"),
    source: "Booking.com",
    rating: 10,
    country: "XK",
    quote: L(
      "Sve. Lokacija je bila predivna, sa nevjerovatnim pogledom. Osoblje izuzetno ljubazno i spremno da pomogne. Apartman je imao sve što treba. Veoma zadovoljni.",
      "Everything. The location was marvelous, with an amazing view. The staff was very nice and helpful. The apartment had everything one could need. Very satisfied."
    ),
  },
  {
    id: "nisa",
    name: "Nisa",
    date: L("26. jul 2026.", "26 July 2026"),
    source: "Booking.com",
    rating: 9,
    country: "TR",
    quote: L(
      "Domaćica je izuzetno ljubazna i pažljivo se brinula o nama. More je odmah ispod. Balkon ima predivan pogled.",
      "The host is a very kind lady who took wonderful care of us. You can swim in the sea just below. The balcony view is beautiful."
    ),
  },
  {
    id: "andrey",
    name: "Andrey",
    date: L("7. avgust 2026.", "7 August 2026"),
    source: "Booking.com",
    rating: 10,
    country: "RU",
    quote: L(
      "Boravak je bio udoban, domaćini odzivni i srdačni. Ostali smo samo sa pozitivnim utiscima. Toplo preporučujemo.",
      "The stay was comfortable, the hosts were responsive and welcoming. We were left with only positive impressions. Highly recommended!"
    ),
  },
  {
    id: "agnieszka",
    name: "Agnieszka",
    date: L("19. jul 2026.", "19 July 2026"),
    source: "Booking.com",
    rating: 10,
    country: "PL",
    quote: L(
      "Idealno mjesto za odmor. Odlična lokacija, terasa s pogledom na zaliv, klima u sobi. Sve tačno kao na fotografijama. Vlasnica je predobrih. Nadam se da ćemo se vratiti.",
      "An ideal place for a holiday. Excellent location, a terrace with a view of the bay, air conditioning in the room. Everything exactly as in the photos. The hostess is wonderful. I hope we come back."
    ),
  },
  {
    id: "andrei",
    name: "Andrei",
    date: L("4. avgust 2026.", "4 August 2026"),
    source: "Booking.com",
    rating: 10,
    country: "RO",
    quote: L(
      "Verry nice apartment, verry clean, but the view is superb.",
      "Verry nice apartment, verry clean, but the view is superb."
    ),
  },
];
