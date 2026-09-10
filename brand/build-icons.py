#!/usr/bin/env python3
"""
Παράγει τα εικονίδια του site από το έτοιμο public/brand/favicon.svg.

  python3 brand/build-icons.py

Γιατί χωριστό script: το build-logo.py χρειάζεται την αρχική φωτογραφία και
βαριά dependencies (scipy) για να ξαναχαράξει το λογότυπο. Τα εικονίδια
βγαίνουν από το ήδη commited SVG, οπότε τρέχει οποτεδήποτε.

Τι γράφει:
  public/favicon.ico            16/32/48 — το fallback που ζητάει ο browser
                                στο /favicon.ico χωρίς να διαβάσει HTML
  public/brand/favicon-32.png   32x32
  public/brand/icon-512.png     Android, μεγάλα previews
  public/brand/apple-touch-icon.png  180x180, iOS home screen

Το rsvg-convert ραστεροποιεί σε μεγάλο μέγεθος και το Pillow κατεβάζει με
LANCZOS: στα 16px βγαίνει καθαρότερο απ' ό,τι αν ραστεροποιήσουμε απευθείας.

Απαιτεί: librsvg (rsvg-convert), pillow
"""
import os
import subprocess

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "public", "brand", "favicon.svg")
BRAND = os.path.join(ROOT, "public", "brand")
WORK = os.path.join(ROOT, "brand", ".work", "icons")

# Τα μεγέθη μέσα στο .ico. Ο Chrome διαλέγει 32 στα tabs των retina οθονών,
# τα Windows shortcuts θέλουν 48.
ICO_SIZES = [16, 32, 48]

PNGS = {
    "favicon-32.png": 32,
    "icon-512.png": 512,
    "apple-touch-icon.png": 180,
}


def master(size=1024):
    """Ραστεροποιεί το SVG μία φορά, σε μέγεθος πολύ μεγαλύτερο απ' όλα τα target."""
    os.makedirs(WORK, exist_ok=True)
    path = os.path.join(WORK, f"master-{size}.png")
    subprocess.run(
        ["rsvg-convert", "-w", str(size), "-h", str(size), SRC, "-o", path],
        check=True,
    )
    return Image.open(path).convert("RGB")


def main():
    if not os.path.exists(SRC):
        raise SystemExit(f"λείπει το {SRC} — τρέξε πρώτα το build-logo.py")

    base = master()

    ico = os.path.join(ROOT, "public", "favicon.ico")
    # Το Pillow δέχεται έτοιμα καρέ μέσω append_images, αλλά τα ταιριάζει με
    # ακριβές μέγεθος και αγνοεί ό,τι είναι μεγαλύτερο από το βασικό image —
    # γι' αυτό σώζουμε από το master και δίνουμε και τα τρία καρέ ως extras.
    frames = [base.resize((s, s), Image.LANCZOS) for s in ICO_SIZES]
    base.save(ico, format="ICO", sizes=[(s, s) for s in ICO_SIZES],
              append_images=frames)
    print(f"  wrote {ico} ({'/'.join(map(str, ICO_SIZES))})")

    for fname, size in PNGS.items():
        path = os.path.join(BRAND, fname)
        base.resize((size, size), Image.LANCZOS).save(path, optimize=True)
        print(f"  wrote {path} ({size}x{size})")


if __name__ == "__main__":
    main()
