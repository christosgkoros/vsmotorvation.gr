#!/usr/bin/env python3
"""
Περνάει τις φωτογραφίες του Google Business Profile στο /public/media.

  python3 brand/build-photos.py

Γιατί χωριστό από το build-media.py: εκείνο βγάζει καρέ από τα βίντεο του
συνεργείου (θέλει ffmpeg και τα mp4). Εδώ η πηγή είναι οι φωτογραφίες του
listing, που κατεβαίνουν από τα lh3 URLs του SOURCES στο brand/.work/maps/.

Τα URLs είναι εδώ επίτηδες: το brand/.work/ είναι gitignored, οπότε χωρίς
αυτά το script δεν θα έτρεχε σε καθαρό clone. Το `=w<W>-h<H>-k-no` στο τέλος
ζητάει το native μέγεθος — χωρίς αυτό το lh3 δίνει thumbnail 203x270.

Ίδια σύμβαση εξόδου με το build-media.py: webp + jpg fallback, max 1400px
πλάτος, ονόματα χωρίς κατάληξη για το <Media name="...">.

Απαιτεί: pillow
"""
import os
import urllib.request

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "media")
SRC = os.path.join(ROOT, "brand", ".work", "maps")

LH3 = "https://lh3.googleusercontent.com/gps-cs-s"

# αρχείο -> (photo id, native πλάτος, native ύψος)
SOURCES = {
    "raw-p1.jpg": (
        "AHRPTWlyc8KPgdziA9lhGjL94ytrqwpP8aDVIPeGPAoUTTKmLZloFePKbT9mv77ulMOx"
        "6jaZAkMo6yOGnIzRJNKhvDhwrHHO5YNVCRHCqBDiReroGHIQaBmciME24iSM0sKBX9Aw"
        "2ZeGlNWa5opo", 1080, 1440),
    "raw-p2.jpg": (
        "AHRPTWlGkHZzhmrZYZsmp1G6pGvWi2EfODALXYDYvX3gqbgtsCtusGFv9gW5k0y5Y29Q"
        "MlMpddbGxz42wPgLxDr8jJdx96zVckGRf0WqvDwfgu9_gSpKKWTUYRRLcQPpZDubLdiY"
        "5CUrKyriw-8", 4284, 5712),
    "raw-p3.jpg": (
        "AHRPTWnGo1Mm-x8PY3GfKBlc-cx_VE1uZabSBm40_XQAJ6eEuPtCt5BmkPj3gjmq4OW0"
        "1lGXX15-vcP5bAaErdK6GoZliI_QdsSwcGAA8esEGCkfMJKWQHpI0NDZfeAm15ZeSsNR"
        "feJm2k1rqsM-", 1536, 2048),
    "raw-p4.jpg": (
        "AHRPTWnuUwQflGYp3462JgUQLkckHZDCNb93HWgjJXhb1TdAglkj_iZ_X02YRU7l7ptc"
        "C2ERtSt1NFPdjUmSwiUxDd4KfljFY1F51GTz2SZqnK6Q2_0CfRh8Axx4X3Q02Q634BQ4"
        "NYREiMoS5XE7", 4284, 5712),
}


def fetch(fname):
    """Κατεβάζει τη φωτογραφία στο native μέγεθος, αν δεν την έχουμε ήδη."""
    dest = os.path.join(SRC, fname)
    if os.path.exists(dest):
        return dest
    pid, w, h = SOURCES[fname]
    os.makedirs(SRC, exist_ok=True)
    urllib.request.urlretrieve(f"{LH3}/{pid}=w{w}-h{h}-k-no", dest)
    print(f"  κατέβηκε {fname} ({w}x{h})")
    return dest

# όνομα -> (αρχείο πηγής, aspect w:h, κάθετο anchor 0=πάνω 1=κάτω)
#
# Το aspect διαλέγεται από το πού μπαίνει η φωτογραφία: τα service slots και
# το "Γιατί εδώ" είναι aspect-[4/3], η gallery είναι τετράγωνη. Το object-cover
# κόβει ό,τι περισσεύει, οπότε κρατάμε το aspect κοντά στο τελικό container.
#
# Όλες οι πηγές είναι κατακόρυφες (κινητό), άρα το 4:3 κρατά μια οριζόντια
# ζώνη: το anchor είναι που πέφτει το θέμα μέσα στο καρέ.
SHOTS = [
    ("workshop-interior", "raw-p1.jpg", (4, 3), 0.46),
    ("scooter-service",   "raw-p2.jpg", (4, 3), 0.30),
    ("engine-detail",     "raw-p3.jpg", (1, 1), 0.45),
    ("vespa-lift",        "raw-p4.jpg", (4, 3), 0.16),
]


def crop_to(img, aspect, anchor):
    """Ίδια λογική με το build-media.py — κρατάμε τα δύο scripts συμβατά."""
    aw, ah = aspect
    w, h = img.size
    target = aw / ah
    if w / h > target:                      # πολύ φαρδύ -> κόβουμε στα πλάγια
        nw = int(round(h * target))
        x = (w - nw) // 2
        return img.crop((x, 0, x + nw, h))
    nh = int(round(w / target))             # πολύ ψηλό -> κόβουμε ύψος
    y = int(round((h - nh) * anchor))
    return img.crop((0, y, w, y + nh))


def export(img, name, max_w=1400):
    if img.width > max_w:
        img = img.resize((max_w, round(img.height * max_w / img.width)), Image.LANCZOS)
    img.save(os.path.join(OUT, f"{name}.webp"), quality=82, method=6)
    img.save(os.path.join(OUT, f"{name}.jpg"), quality=84, progressive=True, optimize=True)
    return img


def main():
    os.makedirs(OUT, exist_ok=True)
    for name, fname, aspect, anchor in SHOTS:
        img = Image.open(fetch(fname)).convert("RGB")
        out = export(crop_to(img, aspect, anchor), name)
        kb = os.path.getsize(os.path.join(OUT, f"{name}.webp")) / 1024
        print(f"  {name:20s} {out.size[0]}x{out.size[1]}  {kb:.0f} KB webp")


if __name__ == "__main__":
    main()
