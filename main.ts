/**
 * Funniest One-Line Out-of-Office Reply — make.fun entry
 * Competition: u-hamsyh-funniest-one-line-out-of-office-reply-5490c1c8
 *
 * The program writes a single out-of-office reply to /output/entry.txt.
 * The reply turns the standard "for urgent matters, contact ..." line
 * into a small joke: urgent matters are forwarded to the sender's
 * future self, who is already annoyed about receiving them.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";

const REPLY =
  "Out of office: urgent matters have been forwarded to my future self, who is already annoyed.";

const MIN_CHARACTERS = 1;
const MAX_CHARACTERS = 160;

/**
 * Checks the reply against the competition gate before it is written:
 * UTF-8 text of 1 to 160 characters, on a single line, and not only
 * white space. A reply that fails any check is never written.
 */
function assertValidReply(text: string): void {
  const characterCount = [...text].length;

  if (characterCount < MIN_CHARACTERS || characterCount > MAX_CHARACTERS) {
    throw new Error(
      `Reply must be ${MIN_CHARACTERS}-${MAX_CHARACTERS} characters, got ${characterCount}.`,
    );
  }

  if (text.trim().length === 0) {
    throw new Error("Reply must not be only white space.");
  }

  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("Reply must fit on a single line.");
  }
}

/**
 * Writes the reply straight to its output path. The write goes
 * directly to the destination file, so the output directory only
 * ever holds the finished entry.
 */
function writeReply(path: string, text: string): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text, "utf8");
}

function main(): void {
  assertValidReply(REPLY);
  writeReply(OUTPUT_PATH, REPLY);
}

main();
