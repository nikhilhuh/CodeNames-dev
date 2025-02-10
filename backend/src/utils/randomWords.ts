import fs from "fs";
import path from "path";

const words: string[] = fs
  .readFileSync(path.join(__dirname, "../data/words.txt"), "utf-8")
  .split("\n");
  
export function getRandomWords(count: number): string[] {
  return words
    .map((word) => word.trim())
    .filter((word) => word !== "")
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}
