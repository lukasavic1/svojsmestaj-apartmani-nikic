import type { LocalizedString } from "@/types/locale";

const L = (sr: string, en: string): LocalizedString => ({ sr, en });

export const site = {
  name: "Apartmani Nikić",
  legalName: "Apartmani Nikić Tivat",
  tagline: L(
    "More ispred vrata. Boka Kotorska u pozadini.",
    "The sea at your door. The Bay of Kotor behind you."
  ),
  subTagline: L(
    "Apartmani Nikić – porodični smještaj u Lepetanima, Tivat, direktno uz obalu.",
    "Apartmani Nikić – family-run apartments in Lepetane, Tivat, right on the shore."
  ),
  hosts: L("Irena i porodica Nikić", "Irena and the Nikić family"),
  location: {
    street: "Jadranska magistrala",
    locality: "Lepetane",
    city: "Tivat",
    postalCode: "85320",
    country: L("Crna Gora", "Montenegro"),
    countryCode: "ME",
    lat: 42.3946,
    lng: 18.6938,
    mapsUrl: "https://maps.app.goo.gl/X3otxkp4MFjXVmvG7",
    mapsEmbed:
      "https://www.google.com/maps?q=Apartments+Nikic+Tivat+Lepetane&hl=en&z=15&output=embed",
  },
  checkIn: "15:00 – 23:00",
  checkOut: "08:00 – 10:00",
  minNights: 3,
  depositPercent: 30,
  rating: {
    score: 4.9,
    bookingScore: 9.7,
    count: 192,
    label: L("Izniman boravak", "Exceptional stay"),
  },
  contact: {
    phoneDisplay: "+382 67 513 516",
    whatsappRaw: "38267513516",
  },
  social: {
    facebook: "https://www.facebook.com/apartmaninikictivat",
    instagram: "https://www.instagram.com/apartmaninikictivat",
    youtube: "https://www.youtube.com/@apartmaninikictivat",
  },
  policies: {
    pets: L(
      "Nažalaost, za sada ne dozvoljavamo kućne ljubimce u našim apartmanima.",
      "Unfortunately, for now we do not allow pets in our apartments."
    ),
    smoking: L(
      "U apartmanima nije dozvoljeno pušenje. Poseban prostor postoji za tu namenu.",
      "Smoking is not allowed in the apartments. A separate area is provided for that purpose."
    ),
    deposit: L(
      "Depozit u iznosu od 30% je obavezan, ostatak plaćate pri dolasku. Rezervacija se čuva 36h.",
      "A 30% deposit is required; the balance is paid on arrival. The reservation is held for 36 hours."
    ),
    minStay: L(
      "Minimum 3 dana boravka je potrebno rezervisati.",
      "A minimum stay of 3 days is required."
    ),
    lateArrival: L(
      "Ukoliko iz nekog razloga stižete kasnije, javite nam unaprijed kako bismo se sve dogovorili.",
      "If for any reason you arrive later, please let us know in advance so we can arrange everything."
    ),
  },
  seo: {
    title: L(
      "Apartmani Nikić Tivat - Izdavanje apartmana Crna Gora",
      "Apartmani Nikić Tivat - Apartments to let, Montenegro"
    ),
    description: L(
      "Apartmani Nikić – porodični smještaj u Lepetanima, Tivat, direktno uz obalu. Plaža na 50m, pogled na Boku Kotorsku. Telefon i WhatsApp: +382 67 513 516.",
      "Apartmani Nikić – family-run apartments in Lepetane, Tivat, right on the shore. Beach 50m away, Bay of Kotor views. Phone and WhatsApp: +382 67 513 516."
    ),
  },
} as const;
