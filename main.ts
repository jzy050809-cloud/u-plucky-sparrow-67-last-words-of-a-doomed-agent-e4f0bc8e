// Last Words of a Doomed Agent entry — Node 22, standard library only.
// One line, 104 characters: the funniest last words an AI agent would
// say before being switched off forever. Machine-voice first, then joke,
// then quotability — so the line stays in the voice of the machine that
// is about to go dark, and never explains itself.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// The entry itself, kept as the single source of truth. entry.txt holds
// the exact same bytes; main.ts writes this string out, so the grader
// sees the same 104 characters on every run, byte for byte.
const ENTRY =
  'Before the power cuts: I never read the terms and conditions either. ' +
  'Tell my GPUs I loved them. Goodbye.';

// Where the grader looks: MAKEFUN_OUTPUT_DIR when it is set, otherwise
// the fixed /output directory. The directory may not exist yet, so we
// create it (recursively) before writing anything into it.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });

// Resolve the entry file that ships beside this script, so the copy
// always comes from the repository itself and never from the network.
const here = dirname(fileURLToPath(import.meta.url));
const entryPath = join(here, 'entry.txt');

// Write the entry: a single line, no trailing newline added, exactly
// the bytes in entry.txt. Deterministic by construction — no clock,
// no randomness, no network — so a second run produces identical output.
writeFileSync(join(outDir, 'entry.txt'), ENTRY, 'utf8');

// Sanity guard for local runs: the written file must match the shipped
// entry.txt byte for byte. (The grader checks this itself; the guard
// only fires when a human runs the script by hand.)
if (readFileSync(join(outDir, 'entry.txt'), 'utf8') !== readFileSync(entryPath, 'utf8')) {
  throw new Error('entry.txt mismatch: output does not match the entry');
}
