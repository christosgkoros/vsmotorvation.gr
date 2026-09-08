/**
 * Κεντρικά στοιχεία του site.
 *
 * Όλα τα υπόλοιπα αρχεία διαβάζουν από εδώ — δεν χρειάζεται να ψάξετε αλλού.
 */

/** Η διεύθυνση, όπως μπαίνει σε αναζήτηση/χάρτη του Google. */
const MAPS_QUERY =
  "%CE%9B%CE%B5%CF%89%CF%86%CF%8C%CF%81%CE%BF%CF%82%20%CE%9A%CF%85%CF%80%CF%81%CE%AF%CF%89%CE%BD%20%CE%97%CF%81%CF%8E%CF%89%CE%BD%2073%CE%92%2C%20%CE%97%CE%BB%CE%B9%CE%BF%CF%8D%CF%80%CE%BF%CE%BB%CE%B7%20163%2041";

export const site = {
  name: "VS Motorvation",
  legalName: "VSMOTORVATION ΟΕ",
  tagline: "Εξειδικευμένο service μοτοσυκλέτας",
  domain: "vsmotorvation.gr",
  url: "https://vsmotorvation.gr",
  description:
    "Συνεργείο μοτοσυκλετών για όλες τις μάρκες. Service, διάγνωση, φρένα, αναρτήσεις, ελαστικά και προέλεγχος ΚΤΕΟ — με σεβασμό στη μηχανή σας.",

  contact: {
    phone: "+302172180862",
    phoneDisplay: "217 218 0862",
    viber: "+302172180862",
    email: "info@vsmotorvation.gr",
    address: {
      street: "Λεωφόρος Κυπρίων Ηρώων 73Β",
      area: "Ηλιούπολη",
      city: "Αθήνα",
      postal: "163 41",
    },
    mapsEmbed: `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`,
    mapsLink: `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`,
    /** Ακριβείς συντεταγμένες — πάνε στα structured data ως GeoCoordinates. */
    geo: { lat: 37.92085093509815, lng: 23.751000262183094 },
  },

  social: {
    facebook: "https://www.facebook.com/profile.php?id=61592913626544",
  },

  /** Ώρες λειτουργίας. `null` = κλειστά. */
  hours: [
    { day: "Δευτέρα", open: "09:00", close: "18:00" },
    { day: "Τρίτη", open: "09:00", close: "18:00" },
    { day: "Τετάρτη", open: "09:00", close: "18:00" },
    { day: "Πέμπτη", open: "09:00", close: "18:00" },
    { day: "Παρασκευή", open: "09:00", close: "18:00" },
    { day: "Σάββατο", open: null, close: null },
    { day: "Κυριακή", open: null, close: null },
  ] as const,
} as const;

export type Service = {
  slug: string;
  title: string;
  summary: string;
  bullets: string[];
  /** Ενδεικτική διάρκεια σε λεπτά — δείχνεται στη σελίδα υπηρεσιών. */
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
    slug: "proelegchos-kteo",
    title: "Προέλεγχος ΚΤΕΟ",
    summary:
      "Πριν πάτε στο επίσημο ΚΤΕΟ, περνάμε τη μηχανή από τα σημεία που ελέγχονται και βεβαιωνόμαστε ότι είναι όλα εντάξει — για να μη γυρίσετε με σημειώσεις.",
    bullets: [
      "Έλεγχος στα σημεία που κοιτάει το ΚΤΕΟ",
      "Φώτα, φρένα, ελαστικά, διαρροές, εξάτμιση",
      "Αποκατάσταση ό,τι δεν θα περνούσε",
      "Έλεγχος πριν από μεγάλο ταξίδι ή αγορά μεταχειρισμένης",
    ],
    minutes: 90,
    image: "bike-on-lift",
  },
];

/** Τα alt περιγράφουν τι δείχνει η φωτογραφία **και** τι δουλειά γίνεται. */
export const gallery = [
  {
    src: "hero-m1000xr",
    alt: "Μοτοσυκλέτα BMW M 1000 XR σε ανυψωτήρα στο συνεργείο μας στην Ηλιούπολη",
  },
  {
    src: "xr-three-quarter",
    alt: "BMW S 1000 XR έτοιμη για παράδοση μετά από πλήρες service",
  },
  {
    src: "exhaust",
    alt: "Έλεγχος εξάτμισης μοτοσυκλέτας στο συνεργείο",
  },
  {
    src: "brakes",
    alt: "Δαγκάνα φρένου και πιρούνι μοτοσυκλέτας κατά τον έλεγχο φρένων",
  },
  {
    src: "workshop",
    alt: "Δύο μοτοσυκλέτες σε ανυψωτήρες μέσα στο συνεργείο μοτοσυκλετών",
  },
  { src: "m-badge", alt: "Ρεζερβουάρ μοτοσυκλέτας μετά τον καθαρισμό" },
  {
    src: "engine",
    alt: "Κινητήρας μοτοσυκλέτας σε ανυψωτήρα κατά το service",
  },
  {
    src: "xr-front",
    alt: "Μοτοσυκλέτα από μπροστά στον ανυψωτήρα, για αλλαγή ελαστικών",
  },
  {
    src: "roundel",
    alt: "Φρεσκοπαραδομένη μοτοσυκλέτα μετά από service στο VS Motorvation",
  },
];

export function fullAddress() {
  const a = site.contact.address;
  return `${a.street}, ${a.area} ${a.postal}, ${a.city}`;
}
