import type { LocalizedString } from "@/types/locale";

const L = (sr: string, en: string): LocalizedString => ({ sr, en });

export type FaqItem = {
  id: string;
  question: LocalizedString;
  answer: LocalizedString;
};

/** House rules and booking terms published on apartmaninikic.me apartment pages. */
export const faqs: FaqItem[] = [
  {
    id: "book",
    question: L("Kako mogu rezervisati apartman?", "How can I book an apartment?"),
    answer: L(
      "Rezervišite apartman putem našeg sajta, putem Booking.com platforme, ili nas pozovite i pošaljite poruku. Za posebne zahtjeve javite nam se kako bismo obezbijedili sve što ste tražili.",
      "Book an apartment on our website, via Booking.com, or call and message us. For special requests, write to us so we can arrange everything you asked for."
    ),
  },
  {
    id: "checkin",
    question: L("Kada je prijava i odjava?", "What are the check-in and check-out times?"),
    answer: L(
      "Check-In je od 15:00 do 23:00. Check-Out je od 08:00 do 10:00. Ukoliko iz nekog razloga stižete kasnije, javite nam unaprijed kako bismo se sve dogovorili.",
      "Check-in is from 15:00 to 23:00. Check-out is from 08:00 to 10:00. If you arrive later for any reason, please let us know in advance so we can arrange everything."
    ),
  },
  {
    id: "minstay",
    question: L("Koliki je minimum boravka?", "What is the minimum stay?"),
    answer: L(
      "Minimum 3 dana boravka je potrebno rezervisati.",
      "A minimum stay of 3 days is required."
    ),
  },
  {
    id: "deposit",
    question: L("Kako se plaća rezervacija?", "How is the reservation paid?"),
    answer: L(
      "Depozit u iznosu od 30% je obavezan, ostatak plaćate pri dolasku u apartman. Rezervacija se čuva 36h od trenutka rezervacije. Ukoliko u tom trenutku ne izvršite uplatu depozita rezervacija se poništava.",
      "A 30% deposit is required; the balance is paid on arrival. The reservation is held for 36 hours from the moment of booking. If the deposit is not paid in that time, the reservation is cancelled."
    ),
  },
  {
    id: "entire",
    question: L("Da li se apartmani izdaju u cjelosti?", "Are the apartments rented in full?"),
    answer: L(
      "Apartmani se izdaju u cjelosti. Svaki apartman je prostor samo za vas — sa privatnim ulazom, kuhinjom i kupatilom.",
      "The apartments are rented in full. Each apartment is a space only for you — with a private entrance, kitchen and bathroom."
    ),
  },
  {
    id: "beach",
    question: L("Koliko je plaža udaljena?", "How far is the beach?"),
    answer: L(
      "Plaža je bukvalno ispred apartmana — ne pet minuta hoda, nego pedeset metara od naše kapije. Izađete, pređete put i već ste u moru.",
      "The beach is literally in front of the apartments — not a five-minute walk, but fifty metres from our gate. You step out, cross the road, and you are already in the sea."
    ),
  },
  {
    id: "transfer",
    question: L("Da li postoji prevoz od aerodroma?", "Is there an airport transfer?"),
    answer: L(
      "Da. Usluga prevoza od i do aerodroma je dostupna. Javite nam se unaprijed kako bismo sve dogovorili.",
      "Yes. A transfer to and from the airport is available. Please let us know in advance so we can arrange it."
    ),
  },
  {
    id: "pets",
    question: L("Da li su kućni ljubimci dozvoljeni?", "Are pets allowed?"),
    answer: L(
      "Nažalaost, za sada ne dozvoljavamo kućne ljubimce u našim apartmanima.",
      "Unfortunately, for now we do not allow pets in our apartments."
    ),
  },
  {
    id: "smoking",
    question: L("Da li je pušenje dozvoljeno?", "Is smoking allowed?"),
    answer: L(
      "U apartmanima nije dozvoljeno pušenje. Poseban prostor postoji za tu namenu.",
      "Smoking is not allowed in the apartments. A separate area is provided for that purpose."
    ),
  },
];
