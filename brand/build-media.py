#!/usr/bin/env python3
"""
Παράγει το φωτογραφικό υλικό του site από τα βίντεο του συνεργείου.

  python3 brand/build-media.py [φάκελος_με_τα_mp4]

Τι κάνει:
  - τραβάει καρέ από συγκεκριμένα timestamps
  - κόβει τα μαύρα letterbox και το watermark
  - παράγει webp/jpg στις αναλογίες που χρειάζεται το layout
  - φτιάχνει ένα μικρό loop βίντεο για το hero + poster
  - φτιάχνει το og-image

Απαιτεί: ffmpeg, pillow, numpy
"""
import os
import subprocess
import sys

import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "media")
WORK = os.path.join(ROOT, "brand", ".work", "frames")

VIDEOS = {
    "v1": "0-02-05-19efcb4fd8d3c82be1ca757db3d6c4767003bdc93c285c959351790bd5abe6fe_227544cd02d.mp4",
    "v2": "0-02-05-2402b91d4f5c8baec1d9f09ac41f7a19915dc2ff32398da1e23754a93d770ca1_227544cba8e.mp4",
    "v3": "0-02-05-85aa77bd23eb2e7803df84adc317cb8f627d3264e6fa41fead09498ab754a73e_227544ccab5.mp4",
}

# Το watermark κάθεται στο κάτω μέρος στα v2/v3 — κόβουμε τη ζώνη.
WATERMARK_CUT = {"v1": 0, "v2": 470, "v3": 450}

# name -> (video, seconds, aspect w:h, κάθετο anchor 0=πάνω 1=κάτω)
SHOTS = [
    ("hero-m1000xr",     "v1", 23, (3, 4),  0.45),
    ("workshop",         "v2", 17, (4, 5),  0.50),
    ("xr-front",         "v3", 11, (4, 5),  0.45),
    ("xr-three-quarter", "v3", 23, (4, 5),  0.45),
    ("bike-on-lift",     "v1", 15, (16, 9), 0.50),
    ("exhaust",          "v1", 19, (1, 1),  0.45),
    ("brakes",           "v3", 21, (1, 1),  0.45),
    ("engine",           "v1", 13, (1, 1),  0.50),
    ("m-badge",          "v3",  7, (1, 1),  0.45),
    ("roundel",          "v3", 15, (1, 1),  0.40),
]

# Το v3 είναι full-frame σε όλη τη διάρκεια (το v1 έχει letterbox σε σημεία),
# οπότε το hero loop βγαίνει από εκεί. Κόβουμε στα 1440px ύψος ώστε να φύγει
# το watermark και να μείνει καθαρό 3:4.
HERO_CLIP = ("v3", 17.0, 9.0)   # video, start, duration
HERO_VF = "crop=1080:1440:0:0,scale=720:960"


def sh(*args):
    subprocess.run(args, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def grab(src, seconds, dest):
    sh("ffmpeg", "-v", "error", "-y", "-ss", str(seconds), "-i", src,
       "-frames:v", "1", "-q:v", "2", dest)


def content_rows(img, thresh=22):
    """Βρίσκει τις γραμμές με πραγματικό περιεχόμενο (πετάει τα letterbox)."""
    a = np.asarray(img.convert("L")).astype(int)
    rows = a[:, ::17].mean(1)
    on = np.where(rows >= thresh)[0]
    return (0, img.height) if len(on) == 0 else (int(on.min()), int(on.max()) + 1)


def crop_to(img, aspect, anchor):
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
    srcdir = sys.argv[1] if len(sys.argv) > 1 else os.path.join(
        os.path.expanduser("~"), "Downloads", "vsmotorvation")
    os.makedirs(OUT, exist_ok=True)
    os.makedirs(WORK, exist_ok=True)
    paths = {k: os.path.join(srcdir, v) for k, v in VIDEOS.items()}

    for name, vid, sec, aspect, anchor in SHOTS:
        raw = os.path.join(WORK, f"{name}.jpg")
        grab(paths[vid], sec, raw)
        img = Image.open(raw)
        top, bottom = content_rows(img)
        bottom = min(bottom, img.height - WATERMARK_CUT[vid])
        img = img.crop((0, top, img.width, bottom))
        out = export(crop_to(img, aspect, anchor), name)
        print(f"  {name:20s} {out.size[0]}x{out.size[1]}  ({vid} @{sec}s)")

    # --- hero loop (χωρίς ήχο, μικρό αρχείο) ---
    vid, start, dur = HERO_CLIP
    vf = HERO_VF
    sh("ffmpeg", "-v", "error", "-y", "-ss", str(start), "-t", str(dur), "-i", paths[vid],
       "-an", "-vf", vf, "-c:v", "libx264", "-profile:v", "high", "-crf", "30",
       "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
       os.path.join(OUT, "hero.mp4"))
    sh("ffmpeg", "-v", "error", "-y", "-ss", str(start + 1), "-i", paths[vid],
       "-frames:v", "1", "-vf", vf, "-q:v", "3", os.path.join(WORK, "hero-poster.jpg"))
    export(Image.open(os.path.join(WORK, "hero-poster.jpg")), "hero-poster", max_w=720)
    size = os.path.getsize(os.path.join(OUT, "hero.mp4")) / 1024
    print(f"  hero.mp4             {size:.0f} KB")

    # --- og image 1200x630 ---
    base = Image.open(os.path.join(OUT, "hero-m1000xr.jpg")).convert("RGB")
    og = crop_to(base, (1200, 630), 0.42).resize((1200, 630), Image.LANCZOS)
    shade = Image.new("RGB", (1200, 630), (10, 12, 16))
    og = Image.blend(og, shade, 0.55)
    logo_png = os.path.join(WORK, "og-logo.png")
    sh("rsvg-convert", "-w", "760", os.path.join(ROOT, "public", "brand", "logo-dark.svg"),
       "-o", logo_png)
    logo = Image.open(logo_png).convert("RGBA")
    og.paste(logo, ((1200 - logo.width) // 2, (630 - logo.height) // 2 - 26), logo)
    og.save(os.path.join(OUT, "og-image.jpg"), quality=88, optimize=True)
    print("  og-image.jpg         1200x630")


if __name__ == "__main__":
    main()
