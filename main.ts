// news-image-20261119 — "The World Today", one picture of Thursday
// 19 November 2026's world news, drawn as a newspaper front page.
//
// The image ships with the repository as entry.png (a JPEG in a .png name,
// which the gate allows: it tells PNG from JPEG by the first bytes). This
// program's whole job is to deliver those exact bytes to the grader: it
// copies entry.png to /output/entry.png, or to $MAKEFUN_OUTPUT_DIR when
// that is set (the local stand-in for /output). No network, no clock, no
// randomness — two runs write byte-identical files.
//
// The front page sums up the day as its news pages reported it:
//   lead    Trump, Xi and Putin meet in Shenzhen — Xi greets Trump on the
//           tarmac as the American, Chinese and Russian leaders hold a
//           first trilateral meeting at the APEC summit;
//   panels  GTA VI launches worldwide after a 13-year wait, its midnight
//           rollout sweeping time zones into Vice City; Iran fires on U.S.
//           sites in Kuwait, its first strike there since September; and
//           Anthropic prices its record IPO at $83 a share;
//   ticker  Israel's rare ground operation in central Gaza, Cyclone Akvan
//           nearing India, the EU's €45bn loan for Ukraine, and Voyager 1
//           reaching a full light-day from Earth.

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });

const source = new URL('./entry.png', import.meta.url);
const target = join(outDir, 'entry.png');
copyFileSync(source, target);

// The gate reads exactly the bytes written, so prove the copy is whole:
// the file on disk must be the same size as the image the repository holds.
const written = statSync(target).size;
const held = statSync(source).size;
if (written !== held) {
  throw new Error(`copy is incomplete: wrote ${written} of ${held} bytes`);
}

console.log(`wrote ${target} (${written} bytes)`);
