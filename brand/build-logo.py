#!/usr/bin/env python3
"""
Ανακατασκευή του λογότυπου VS Motorvation από τη φωτογραφία οθόνης.

Τι κάνει:
  1. Διορθώνει την προοπτική της φωτογραφίας (homography από 4 ευθείες της οθόνης)
  2. Ξεχωρίζει τα χρώματα σε layers (μπλε / μαύρο / λευκό V)
  3. Ανακατασκευάζει γεωμετρικά το μπλε παραλληλόγραμμο του σήματος
  4. Κάνει vectorize κάθε layer με potrace και συνθέτει τα SVG

Απαιτεί: pillow, numpy, scipy, potrace (brew install potrace)

  python3 brand/build-logo.py <path/to/photo.jpg>

ΣΗΜΕΙΩΣΗ: Αυτό είναι reconstruction από φωτογραφία. Όταν βρεθεί το πρωτότυπο
vslogo13mb.ai, αντικαταστήστε τα SVG στο public/brand/.
"""
import math
import os
import re
import subprocess
import sys

import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi

# --- Χρώματα brand (μετρημένα από τη φωτογραφία, με white balance) ---
BLUE = "#2C5BBD"
INK = "#16181D"
WHITE = "#FFFFFF"

# --- Ευθείες της οθόνης στη φωτογραφία (y = m·x + c  /  x = m·y + c) ---
EDGE_TOP = (0.03901, 411.83)      # πάνω ακμή του λευκού artboard
EDGE_BOTTOM = (0.10926, 823.02)   # κάτω ακμή του λευκού artboard
EDGE_RIGHT = (-0.11223, 1201.92)  # δεξιά ακμή του artboard
EDGE_DIVIDER = (-0.12765, 379.71) # όριο κόκκινου/μαύρου μπλοκ από κάτω

ASPECT = 1.7973   # λόγος πλευρών του ορθογωνίου, ώστε η κλίμακα να είναι ισότροπη
DESIGN_H = 1000.0
RENDER = dict(x0=-600, y0=-60, x1=1400, y1=760, scale=3)

# --- Γεωμετρία του μπλε παραλληλογράμμου στο rectified raster ---
PAR_SLOPE = -0.18803
PAR_LEFT_C = 799.00
PAR_RIGHT_C = 1729.80
PAR_TOP = 485.7
PAR_BOTTOM = 1924.2
PAR_RADIUS = 230.0

SPLIT_X = 2601   # όριο σήματος / λεκτικού στο rectified raster
UI_STRIP = 220   # γραμμές UI του Illustrator στην κορυφή
PAD = 40         # περιθώριο γύρω από το λογότυπο

CROP = {}        # υπολογίζεται από τα masks

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "public", "brand")
WORK_DIR = os.path.join(ROOT, "brand", ".work")


def intersect(horiz, vert):
    m1, c1 = horiz
    m2, c2 = vert
    y = (m1 * c2 + c1) / (1 - m1 * m2)
    return (m2 * y + c2, y)


def homography(src, dst):
    rows, rhs = [], []
    for (x, y), (u, v) in zip(src, dst):
        rows.append([x, y, 1, 0, 0, 0, -u * x, -u * y])
        rhs.append(u)
        rows.append([0, 0, 0, x, y, 1, -v * x, -v * y])
        rhs.append(v)
    h = np.linalg.solve(np.array(rows, float), np.array(rhs, float))
    return np.append(h, 1).reshape(3, 3)


def rectify(photo_path):
    """Επιστρέφει τη φωτογραφία με διορθωμένη προοπτική."""
    im = Image.open(photo_path).convert("RGB")
    quad = [
        intersect(EDGE_TOP, EDGE_DIVIDER),
        intersect(EDGE_TOP, EDGE_RIGHT),
        intersect(EDGE_BOTTOM, EDGE_RIGHT),
        intersect(EDGE_BOTTOM, EDGE_DIVIDER),
    ]
    w = ASPECT * DESIGN_H
    m = homography([(0, 0), (w, 0), (w, DESIGN_H), (0, DESIGN_H)], quad)

    r = RENDER
    ow = int((r["x1"] - r["x0"]) * r["scale"])
    oh = int((r["y1"] - r["y0"]) * r["scale"])
    t = np.array([[1 / r["scale"], 0, r["x0"]], [0, 1 / r["scale"], r["y0"]], [0, 0, 1]])
    ms = m @ t
    coeffs = tuple((ms / ms[2, 2]).flatten()[:8])
    return im.transform((ow, oh), Image.PERSPECTIVE, coeffs, Image.BICUBIC)


def smooth(mask, sigma=4.0):
    """Στρογγυλεύει τα σκαλοπάτια που αφήνει η φωτογραφία, κρατώντας τις γωνίες."""
    return ndi.gaussian_filter(mask.astype(float), sigma) > 0.5


def drop_specks(mask, min_area):
    lab, n = ndi.label(mask)
    if n == 0:
        return mask
    sizes = ndi.sum(mask, lab, range(1, n + 1))
    keep = [i for i, s in enumerate(sizes, 1) if s >= min_area]
    return np.isin(lab, keep)


def parallelogram(shape):
    """Ανακατασκευή του μπλε παραλληλογράμμου (στρογγυλεμένη πάνω-αριστερή γωνία)."""
    h, w = shape
    left = lambda y: PAR_SLOPE * y + PAR_LEFT_C
    right = lambda y: PAR_SLOPE * y + PAR_RIGHT_C
    nrm = math.hypot(1.0, -PAR_SLOPE)
    cy = PAR_TOP + PAR_RADIUS
    cx = left(cy) + PAR_RADIUS * nrm
    ux, uy = 1.0 / nrm, -PAR_SLOPE / nrm
    tan_top = (cx, PAR_TOP)
    tan_left = (cx - PAR_RADIUS * ux, cy - PAR_RADIUS * uy)
    a0 = math.atan2(tan_left[1] - cy, tan_left[0] - cx)
    a1 = math.atan2(tan_top[1] - cy, tan_top[0] - cx)

    pts = [
        tan_left,
        (left(PAR_BOTTOM), PAR_BOTTOM),
        (right(PAR_BOTTOM), PAR_BOTTOM),
        (right(PAR_TOP), PAR_TOP),
        tan_top,
    ]
    steps = 64
    for i in range(1, steps):
        t = a1 + (a0 - a1) * i / steps
        pts.append((cx + PAR_RADIUS * math.cos(t), cy + PAR_RADIUS * math.sin(t)))

    img = Image.new("1", (w, h), 0)
    ImageDraw.Draw(img).polygon(pts, fill=1)
    return np.asarray(img).astype(bool)


def build_masks(rect):
    a = np.asarray(rect).astype(float)
    a = np.clip(a * (255.0 / np.array([224.0, 227.0, 220.0])), 0, 255)  # white balance
    r, b = a[:, :, 0], a[:, :, 2]
    lum = a.mean(2)

    # Το μπλε έχει σκούρο "halo" στη φωτογραφία (subpixel/JPEG). Κρατάμε χαμηλό
    # κατώφλι στο μπλε ώστε το halo να μην περάσει για μαύρο περίγραμμα.
    blue = (b - r > 28) & (b > 70)
    ink = lum < 165
    dark = ink & ~blue
    blue[:UI_STRIP, :] = False
    dark[:UI_STRIP, :] = False

    k = np.ones((5, 5))
    blue = smooth(ndi.binary_opening(ndi.binary_closing(blue, k), k))
    dark = smooth(ndi.binary_opening(ndi.binary_closing(dark, k), k))

    mark_blue, word_blue = blue.copy(), blue.copy()
    mark_dark, word_dark = dark.copy(), dark.copy()
    mark_blue[:, SPLIT_X:] = False
    mark_dark[:, SPLIT_X:] = False
    word_blue[:, :SPLIT_X] = False
    word_dark[:, :SPLIT_X] = False

    word_dark = drop_specks(word_dark, 40_000)  # πετάει τον δείκτη του ποντικιού
    word_blue = drop_specks(word_blue, 40_000)

    plate = parallelogram(blue.shape) | ndi.binary_fill_holes(mark_dark)
    white_v = drop_specks(
        ndi.binary_opening(plate & ~mark_blue & ~mark_dark, np.ones((9, 9))), 50_000
    )

    return {
        "mark-plate": plate,
        "mark-blue": mark_blue,
        "mark-dark": mark_dark,
        "mark-white": white_v,
        "word-blue": word_blue,
        "word-dark": word_dark,
    }


def bbox(mask, pad=0, shape=None):
    ys, xs = np.where(mask)
    h, w = shape or mask.shape
    return dict(
        x0=max(0, xs.min() - pad), x1=min(w, xs.max() + 1 + pad),
        y0=max(0, ys.min() - pad), y1=min(h, ys.max() + 1 + pad),
    )


def trace(mask, name):
    """potrace σε ένα layer -> το <g> element του SVG."""
    c = CROP
    sub = mask[c["y0"]:c["y1"], c["x0"]:c["x1"]]
    pbm = os.path.join(WORK_DIR, f"{name}.pbm")
    svg = os.path.join(WORK_DIR, f"{name}.svg")
    Image.fromarray(np.where(sub, 0, 255).astype(np.uint8)).save(pbm)
    subprocess.run(
        ["potrace", "-b", "svg", "-a", "0.6", "-O", "0.3", "-t", "24",
         "--flat", "-o", svg, pbm],
        check=True,
    )
    text = open(svg).read()
    view = re.search(r'viewBox="([^"]+)"', text).group(1)
    body = re.search(r"<g[^>]*>(.*?)</g>", text, re.S).group(1).strip()
    transform = re.search(r'<g\s+transform="([^"]+)"', text).group(1)
    return view, transform, body


def svg_doc(view, transform, layers, title):
    w, h = view.split()[2:]
    w, h = f"{float(w):.0f}", f"{float(h):.0f}"
    groups = "\n".join(
        f'  <g transform="{transform}" fill="{fill}" stroke="none">{body}</g>'
        for fill, body in layers
    )
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view}" '
        f'width="{w}" height="{h}" role="img" aria-label="{title}">\n'
        f"  <title>{title}</title>\n{groups}\n</svg>\n"
    )


def main():
    photo = sys.argv[1] if len(sys.argv) > 1 else os.path.join(
        ROOT, "brand", "source", "logo-photo.jpg"
    )
    os.makedirs(WORK_DIR, exist_ok=True)
    os.makedirs(OUT_DIR, exist_ok=True)

    rect = rectify(photo)
    rect.save(os.path.join(WORK_DIR, "rectified.png"))
    masks = build_masks(rect)

    everything = np.logical_or.reduce(list(masks.values()))
    CROP.update(bbox(everything, PAD))
    print(f"  crop {CROP}")

    traced = {}
    view = transform = None
    for name, mask in masks.items():
        view, transform, body = trace(mask, name)
        traced[name] = body
        print(f"  traced {name}")

    # Το σήμα μόνο του: ίδιο σύστημα συντεταγμένων, κομμένο στο πλάτος του
    mark = masks["mark-plate"] | masks["mark-blue"] | masks["mark-dark"]
    mb = bbox(mark, PAD)
    mark_only = (
        f'{mb["x0"] - CROP["x0"]} {mb["y0"] - CROP["y0"]} '
        f'{mb["x1"] - mb["x0"]} {mb["y1"] - mb["y0"]}'
    )

    files = {
        # Πλήρες λογότυπο για ανοιχτό φόντο
        "logo.svg": [
            (BLUE, traced["mark-blue"]),
            (WHITE, traced["mark-white"]),
            (INK, traced["mark-dark"]),
            (INK, traced["word-dark"]),
            (BLUE, traced["word-blue"]),
        ],
        # Πλήρες λογότυπο για σκούρο φόντο
        "logo-dark.svg": [
            (WHITE, traced["mark-plate"]),
            (BLUE, traced["mark-blue"]),
            (WHITE, traced["mark-dark"]),
            (WHITE, traced["word-dark"]),
            (BLUE, traced["word-blue"]),
        ],
        # Μονόχρωμο (για stamps, watermark, fax κλπ.)
        "logo-mono.svg": [
            ("currentColor", traced["mark-plate"]),
            ("currentColor", traced["word-dark"]),
            ("currentColor", traced["word-blue"]),
        ],
    }
    for fname, layers in files.items():
        path = os.path.join(OUT_DIR, fname)
        open(path, "w").write(svg_doc(view, transform, layers, "VS Motorvation"))
        print(f"  wrote {path}")

    # Σήμα μόνο (VS), κομμένο στο πλάτος του
    for fname, layers in {
        "mark.svg": [
            (BLUE, traced["mark-blue"]),
            (WHITE, traced["mark-white"]),
            (INK, traced["mark-dark"]),
        ],
        "mark-dark.svg": [
            (WHITE, traced["mark-plate"]),
            (BLUE, traced["mark-blue"]),
            (WHITE, traced["mark-dark"]),
        ],
    }.items():
        path = os.path.join(OUT_DIR, fname)
        open(path, "w").write(svg_doc(mark_only, transform, layers, "VS Motorvation"))
        print(f"  wrote {path}")


if __name__ == "__main__":
    main()
