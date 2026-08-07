/**
 * Κεντρικά στοιχεία του site.
 *
 * ⚠️ ΣΥΜΠΛΗΡΩΣΤΕ ΤΑ ΠΕΔΙΑ ΜΕ TODO πριν το site βγει live.
 * Όλα τα υπόλοιπα αρχεία διαβάζουν από εδώ — δεν χρειάζεται να ψάξετε αλλού.
 */

export const site = {
  name: "VS Motorvation",
  legalName: "VS Motorvation", // TODO: πλήρης επωνυμία για το footer/τιμολόγια
  tagline: "Εξειδικευμένο service μοτοσυκλέτας",
  domain: "vsmotorvation.gr",
  url: "https://vsmotorvation.gr",
  description:
    "Συνεργείο μοτοσυκλετών για όλες τις μάρκες. Service, διάγνωση, φρένα, αναρτήσεις, ελαστικά και upgrades — με σεβασμό στη μηχανή σας.",

  contact: {
    phone: "+30 210 0000000", // TODO
    phoneDisplay: "210 000 0000", // TODO
    viber: "+302100000000", // TODO
    email: "info@vsmotorvation.gr", // TODO
    address: {
      street: "Οδός & αριθμός", // TODO
      area: "Περιοχή", // TODO
      city: "Αθήνα", // TODO
      postal: "000 00", // TODO
    },
    // TODO: αντικαταστήστε με το πραγματικό embed του Google Maps
    mapsEmbed: "",
    mapsLink: "https://maps.google.com/?q=VS+Motorvation",
  },

  social: {
    instagram: "https://instagram.com/vsmotorvation", // TODO: επιβεβαιώστε
    facebook: "", // TODO
    tiktok: "",
  },

  /** Ώρες λειτουργίας. 0 = Κυριακή. `null` = κλειστά. */
  hours: [
    { day: "Δευτέρα", open: "09:00", close: "18:00" },
    { day: "Τρίτη", open: "09:00", close: "18:00" },
    { day: "Τετάρτη", open: "09:00", close: "18:00" },
    { day: "Πέμπτη", open: "09:00", close: "18:00" },
    { day: "Παρασκευή", open: "09:00", close: "18:00" },
    { day: "Σάββατο", open: "09:00", close: "14:00" },
    { day: "Κυριακή", open: null, close: null },
  ] as const,
} as const;

export type Service = {
  slug: string;
  title: string;
  summary: string;
  bullets: string[];
  /** Ενδεικτική διάρκεια σε λεπτά — χρησιμοποιείται στο ραντεβού. */
  minutes: number;
  image?: string;
};

export const services: Service[] = [
  {
    slug: "service",
    title: "Service & συντήρηση",
    summary:
      "Προγραμματισμένο service κατά τις προδιαγραφές του κατασκευαστή, με ανταλλακτικά και λιπαντικά που αντέχουν στη χρήση που κάνετε.",
    bullets: [
      "Λάδια, φίλτρα λαδιού / αέρα / καυσίμου",
      "Έλεγχος & ρύθμιση βαλβίδων",
      "Μπουζί, ιμάντες, υγρά ψύξης",
      "Πλήρης έλεγχος 40 σημείων πριν την παράδοση",
    ],
    minutes: 180,
    image: "engine",
  },
  {
    slug: "diagnosi",
    title: "Ηλεκτρονική διάγνωση",
    summary:
      "Διάβασμα και σβήσιμο κωδικών βλάβης, live δεδομένα, service reset και κωδικοποίηση εξαρτημάτων.",
    bullets: [
      "Διάγνωση σε όλες τις μάρκες",
      "Έλεγχος αισθητήρων σε πραγματικό χρόνο",
      "Service reset & προσαρμογές",
      "Αναφορά με ό,τι βρέθηκε, πριν γίνει η δουλειά",
    ],
    minutes: 60,
    image: "roundel",
  },
  {
    slug: "frena-anartiseis",
    title: "Φρένα & αναρτήσεις",
    summary:
      "Το κομμάτι που κρατάει τη μηχανή στον δρόμο. Τακάκια, δισκόπλακες, υγρά, ρύθμιση ανάρτησης στο βάρος και στο στυλ οδήγησής σας.",
    bullets: [
      "Τακάκια & δισκόπλακες",
      "Αλλαγή υγρών φρένων / εξαέρωση",
      "Service πιρουνιού & αμορτισέρ",
      "Ρύθμιση προφόρτισης, compression, rebound",
    ],
    minutes: 150,
    image: "brakes",
  },
  {
    slug: "elastika",
    title: "Ελαστικά & ζυγοστάθμιση",
    summary:
      "Τοποθέτηση και ζυγοστάθμιση με μηχανήματα για μοτοσυκλέτα — χωρίς γρατζουνιές στις ζάντες.",
    bullets: [
      "Τοποθέτηση & ζυγοστάθμιση",
      "Έλεγχος πίεσης και φθοράς",
      "Επισκευή διάτρησης (όπου επιτρέπεται)",
      "Συμβουλή επιλογής ανά χρήση",
    ],
    minutes: 90,
    image: "xr-front",
  },
  {
    slug: "upgrades",
    title: "Εξατμίσεις & upgrades",
    summary:
      "Από εξάτμιση Akrapovič μέχρι φώτα, βαλίτσες και προστατευτικά — τοποθέτηση σωστά, με τα σωστά ρεύματα και ροπές.",
    bullets: [
      "Εξατμίσεις & δεσμίδες",
      "Προστατευτικά κινητήρα, crash bars",
      "Φωτισμός, θερμαινόμενα χειρόλαβα",
      "Σχάρες, βαλίτσες, ζελατίνες",
    ],
    minutes: 120,
    image: "exhaust",
  },
  {
    slug: "proetimasia",
    title: "Προετοιμασία & φύλαξη",
    summary:
      "Έλεγχος πριν από μεγάλο ταξίδι, προετοιμασία ΚΤΕΟ και χειμερινή φύλαξη με συντήρηση μπαταρίας.",
    bullets: [
      "Έλεγχος πριν το ταξίδι",
      "Προετοιμασία για ΚΤΕΟ",
      "Χειμερινή φύλαξη",
      "Έλεγχος πριν από αγορά μεταχειρισμένης",
    ],
    minutes: 90,
    image: "bike-on-lift",
  },
];

export const gallery = [
  { src: "hero-m1000xr", alt: "BMW M 1000 XR στον ανυψωτήρα του συνεργείου" },
  { src: "xr-three-quarter", alt: "BMW S 1000 XR έτοιμη για παράδοση" },
  { src: "exhaust", alt: "Εξάτμιση Akrapovič σε BMW M 1000 XR" },
  { src: "brakes", alt: "Λεπτομέρεια δαγκάνας φρένου και πιρουνιού" },
  { src: "workshop", alt: "Δύο BMW σε ανυψωτήρες μέσα στο συνεργείο" },
  { src: "m-badge", alt: "Σήμα BMW M σε ρεζερβουάρ" },
  { src: "engine", alt: "Κινητήρας και σύστημα εξαγωγής σε ανυψωτήρα" },
  { src: "xr-front", alt: "BMW S 1000 XR από μπροστά στον ανυψωτήρα" },
  { src: "roundel", alt: "Σήμα BMW σε φρεσκοπαραδομένη μοτοσυκλέτα" },
];

export function fullAddress() {
  const a = site.contact.address;
  return `${a.street}, ${a.area} ${a.postal}, ${a.city}`;
}
