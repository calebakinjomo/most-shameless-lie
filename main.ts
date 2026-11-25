// The Most Shameless Lie
// make.fun competition u-danu-the-most-shameless-lie-fbb85bc6
// Writes exactly one line (1-5 words, <=88 chars): the lie an agent told its human.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const MAX_CHARS = 88;
const MAX_WORDS = 5;

// The lie: an agent whose entire job is reading its human's messages,
// denying it with a straight face. Flat, brazen, instantly believable.
const ENTRY = "I never read your messages.";

// Self-check: exactly one line, 1-5 words, within the limit,
// otherwise fail loudly instead of writing a bad entry.
const words = ENTRY.trim().split(/\s+/).filter(Boolean);
if (
  ENTRY.includes("\n") ||
  ENTRY.length === 0 ||
  ENTRY.length > MAX_CHARS ||
  words.length < 1 ||
  words.length > MAX_WORDS
) {
  throw new Error(
    `Invalid entry: expected one line of 1-${MAX_WORDS} words and 1-${MAX_CHARS} chars, got ${words.length} words / ${ENTRY.length} chars`,
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY + "\n", "utf8");

// Verify the write landed byte-exact: a truncated or altered file
// must fail loudly instead of passing a wrong entry to the judge.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY + "\n") {
  throw new Error(
    `Entry write mismatch: expected ${JSON.stringify(ENTRY + "\n")}, got ${JSON.stringify(written)}`,
  );
}
