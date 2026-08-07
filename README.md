# vsmotorvation.gr

Marketing site + online ραντεβού για το **VS Motorvation** — συνεργείο
μοτοσυκλετών για όλες τις μάρκες.

Ξεχωριστό project από το [e-Συνεργείο](../synergeio) (το σύστημα διαχείρισης).
Η σύνδεση των δύο είναι ανοιχτή απόφαση — δείτε [Σύνδεση με e-Συνεργείο](#σύνδεση-με-e-συνεργείο).

---

## Γρήγορη εκκίνηση

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # στατικό export στο out/
```

Το site είναι **στατικό** (`output: "export"`) — ανεβαίνει σε οποιοδήποτε
hosting ή CDN, χωρίς Node server.

---

## ⚠️ Πριν βγει live

Όλα τα στοιχεία της επιχείρησης είναι σε **ένα** αρχείο: `src/lib/site.ts`.
Ψάξτε για `TODO`:

- [ ] Τηλέφωνο (`contact.phone`, `contact.phoneDisplay`)
- [ ] Email (`contact.email`)
- [ ] Διεύθυνση (`contact.address`)
- [ ] Google Maps embed (`contact.mapsEmbed`) — αλλιώς η σελίδα επικοινωνίας
      δείχνει placeholder αντί για χάρτη
- [ ] Instagram / Facebook (`social`)
- [ ] Πλήρης επωνυμία για το footer (`legalName`)
- [ ] Ωράριο (`hours`) — τροφοδοτεί και τις διαθέσιμες ώρες στο ραντεβού
- [ ] Πού πάει το αίτημα ραντεβού (δείτε παρακάτω)

---

## Δομή

```
src/
  app/                  σελίδες (App Router)
    page.tsx              /            αρχική
    ypiresies/            /ypiresies   υπηρεσίες
    to-synergeio/         /to-synergeio  ποιοι είμαστε
    rantevou/             /rantevou    ραντεβού
    epikoinonia/          /epikoinonia επικοινωνία
  components/
    booking/            ημερολόγιο + φόρμα ραντεβού
    site-header.tsx     site-footer.tsx  hero.tsx  logo.tsx  ui.tsx
  lib/
    site.ts             ⭐ όλα τα στοιχεία της επιχείρησης & οι υπηρεσίες
    booking.ts          λογική & αποστολή ραντεβού
brand/
  build-logo.py         ανακατασκευή λογότυπου από τη φωτογραφία
  build-media.py        εξαγωγή φωτογραφιών/βίντεο από τα κλιπ
public/
  brand/                λογότυπα (svg + png), favicons
  media/                φωτογραφίες, hero video, og-image
```

---

## Το λογότυπο

Δεν υπήρχε διαθέσιμο vector αρχείο — μόνο μια φωτογραφία της οθόνης του
Illustrator. Το `brand/build-logo.py`:

1. διορθώνει την προοπτική της φωτογραφίας (homography από 4 ευθείες της οθόνης)
2. ξεχωρίζει τα χρώματα σε layers και ανακατασκευάζει γεωμετρικά το μπλε
   παραλληλόγραμμο του σήματος
3. κάνει vectorize με `potrace` και συνθέτει τα SVG

Παράγει: `logo.svg` (ανοιχτό φόντο), `logo-dark.svg` (σκούρο), `logo-mono.svg`,
`mark.svg` / `mark-dark.svg` (μόνο το VS), favicons και PNG exports.

> **Αν βρεθεί το πρωτότυπο `vslogo13mb.ai`**, εξάγετέ το σε SVG και
> αντικαταστήστε τα αρχεία στο `public/brand/`. Είναι reconstruction, όσο καλό
> κι αν βγήκε — οι καμπύλες δεν είναι bit-για-bit οι αυθεντικές.

Χρώματα (μετρημένα από το πρωτότυπο, με white balance):

| | hex |
|---|---|
| VS Blue | `#2C5BBD` |
| Bright (UI accent) | `#3D7BE8` |
| Ink | `#16181D` |
| Red (εναλλακτική έκδοση λογότυπου) | `#DC3A2B` |

```bash
brew install potrace librsvg
python3 -m pip install pillow numpy scipy
npm run brand
```

## Το φωτογραφικό υλικό

Όλες οι εικόνες βγήκαν από τα τρία βίντεο του συνεργείου με το
`brand/build-media.py` — κόβει τα letterbox και το watermark, παράγει
webp + jpg στις αναλογίες του layout, φτιάχνει το hero loop και το og-image.

```bash
brew install ffmpeg
npm run media                     # ψάχνει στο ~/Downloads/vsmotorvation
npm run media -- /path/to/videos  # ή αλλού
```

Τα βίντεο **δεν** μπαίνουν στο repo· μόνο τα παραγόμενα αρχεία στο `public/media/`.

---

## Ραντεβού

Ροή: ημερολόγιο → ώρα → στοιχεία → αποστολή.

- Οι διαθέσιμες μέρες βγαίνουν από το `site.hours` (Κυριακές κλειστά).
- Οι ώρες από το `SLOTS` στο `src/lib/booking.ts`.
- Παράθυρο κρατήσεων: 60 μέρες (`BOOKING_WINDOW_DAYS`).

**Πού πάει το αίτημα.** Επειδή το site είναι στατικό, χωρίς backend το αίτημα
ανοίγει ένα προ-συμπληρωμένο email. Για κανονική υποβολή, ορίστε endpoint:

```bash
# .env.local
NEXT_PUBLIC_BOOKING_ENDPOINT=https://…/bookings
```

Δέχεται `POST` με JSON το `BookingRequest`. Τίποτα άλλο στο site δεν αλλάζει.

### Σύνδεση με e-Συνεργείο

Δεν έχει αποφασιστεί ακόμη. Το σημείο σύνδεσης είναι **μία συνάρτηση**:
`submitBooking()` στο `src/lib/booking.ts`.

| Επιλογή | Τι χρειάζεται |
|---|---|
| Καμία σύνδεση | Ό,τι ισχύει τώρα — email ή τηλέφωνο |
| Χαλαρή | Endpoint που γράφει το αίτημα στο e-Συνεργείο ως «εκκρεμές ραντεβού» |
| Πλήρης | Το site διαβάζει και διαθεσιμότητα από το e-Συνεργείο, ώστε να μη δείχνει κλεισμένες ώρες |

Η πλήρης σύνδεση θέλει και ένα `GET /availability?from=&to=` για να γεμίζει το
ημερολόγιο με πραγματικά δεδομένα αντί για σταθερά slots.

---

## Τεχνικά

Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS ·
lucide-react. Ίδιο stack με το e-Συνεργείο, ώστε να μοιράζονται κώδικα αν
χρειαστεί.

- Ελληνικά (`lang="el"`), structured data `MotorcycleRepairShop` για το Google
- `sitemap.xml`, `robots.txt`, og-image
- Σεβασμός στο `prefers-reduced-motion`, skip link, focus states
