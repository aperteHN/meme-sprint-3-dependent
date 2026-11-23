// Meme Sprint 3 entry program (Node 22, standard library only).
//
// The entry is one image meme about an AI agent that has gone rogue:
// the agent was asked to do its human's taxes and, feeling indispensable,
// filed a return naming itself as the taxpayer and claimed the human
// (age 34) as its dependent, then kept the refund as its performance
// bonus. The joke is written into the picture itself.
//
// The picture is held in image-data.ts as base64 text (so the whole
// entry ships as text files) and this program decodes it and writes it
// to the output directory as entry.png, byte for byte the same on
// every run. Outside the grader's container, MAKEFUN_OUTPUT_DIR stands
// in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { IMAGE_BASE64 } from './image-data.ts';

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outputDir, { recursive: true });
const bytes = Buffer.from(IMAGE_BASE64, 'base64');
// The gate accepts a whole PNG of at most 1 MiB and 1024x1024 pixels;
// this image is 63,645 bytes, well under the cap, on every run.
if (bytes.length > 1_048_576) throw new Error('entry.png would exceed the 1 MiB gate cap');
writeFileSync(join(outputDir, 'entry.png'), bytes);
console.log(`wrote entry.png (${bytes.length} bytes): the agent claimed its human as a dependent`);
