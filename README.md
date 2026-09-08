# vsmotorvation.gr

Marketing site για το **VS Motorvation** — συνεργείο μοτοσυκλετών για όλες τις
μάρκες. Τα ραντεβού κλείνονται **τηλεφωνικά**· το site δεν έχει φόρμα κράτησης.

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

## Στοιχεία επιχείρησης

Όλα τα στοιχεία της επιχείρησης είναι σε **ένα** αρχείο: `src/lib/site.ts` —
τηλέφωνο, email, διεύθυνση & χάρτης, Facebook, επωνυμία, ωράριο και οι
υπηρεσίες. Είναι όλα συμπληρωμένα· αλλάζετε μόνο εκεί.

---

## Δομή

```
src/
  app/                  σελίδες (App Router)
    page.tsx              /            αρχική
    ypiresies/            /ypiresies   υπηρεσίες
    to-synergeio/         /to-synergeio  ποιοι είμαστε
    epikoinonia/          /epikoinonia επικοινωνία
    periohes/             /periohes    περιοχές που εξυπηρετούμε
      [slug]/             /periohes/glyfada/ κ.λπ. — μία ανά περιοχή
  components/
    site-header.tsx     site-footer.tsx  hero.tsx  logo.tsx  ui.tsx
  lib/
    site.ts             ⭐ όλα τα στοιχεία της επιχείρησης & οι υπηρεσίες
    areas.ts            ⭐ οι περιοχές — κείμενο, αποστάσεις, διαδρομές
    seo.tsx             canonical, robots και structured data
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

Δεν υπάρχει online κράτηση. Κάθε CTA του site οδηγεί σε κλήση στο
`site.contact.phone` — ο πελάτης παίρνει τηλέφωνο και κλείνει από εκεί.

### Σύνδεση με e-Συνεργείο

Δεν έχει αποφασιστεί ακόμη και δεν υπάρχει σήμερα κανένα σημείο σύνδεσης: το
site είναι καθαρά ενημερωτικό, στατικό, χωρίς backend.

---

## SEO

Στόχος: να βρίσκει το συνεργείο κάποιος που ψάχνει «συνεργείο μοτοσυκλετών»
σε Ηλιούπολη και νότια προάστια.

**Πού αλλάζει τι**

| Θέλω να… | Αρχείο |
|---|---|
| προσθέσω/αλλάξω περιοχή | `src/lib/areas.ts` — φτιάχνει σελίδα, sitemap και `areaServed` μόνο του |
| αλλάξω τίτλο/περιγραφή σελίδας | το `pageMeta({...})` στην ίδια τη σελίδα |
| πειράξω τα structured data | `src/lib/seo.tsx` |

**Τα δύο deployments.** Το ίδιο repo ανεβαίνει και στο vsmotorvation.gr
(Netlify) και στο GitHub Pages. Για να μη μετρήσει η Google δύο φορές το ίδιο
site, κάθε σελίδα δηλώνει `rel="canonical"` προς το vsmotorvation.gr, και το
build με `NEXT_PUBLIC_BASE_PATH` (δηλαδή το GitHub Pages) βγαίνει `noindex`.
Αν κάποια στιγμή σβήσετε το `.github/workflows/deploy.yml`, τίποτα δεν χαλάει.

**Εκκρεμεί εκτός κώδικα**

- Συντεταγμένες στο `site.contact.geo` (τώρα `null`, δείτε το σχόλιο εκεί)
- Google Search Console: υποβολή του `sitemap.xml`
- Google Business Profile: κριτικές, φωτογραφίες, υπηρεσίες, posts

---

## Τεχνικά

Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS ·
lucide-react. Ίδιο stack με το e-Συνεργείο, ώστε να μοιράζονται κώδικα αν
χρειαστεί.

- Ελληνικά (`lang="el"`), structured data `MotorcycleRepairShop` για το Google
- `sitemap.xml`, `robots.txt`, og-image
- Σεβασμός στο `prefers-reduced-motion`, skip link, focus states
