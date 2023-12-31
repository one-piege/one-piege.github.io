import fs from "fs";
import { appendFile } from "node:fs/promises";

const BASE_URL = "https://www.scan-vf.net/uploads/manga/one_piece/chapters";

async function main() {
  let totalSize = 0;

  for (let chapter_number = 1; chapter_number <= 1000; chapter_number++) {
    let screen_number = 1;
    while (true) {
      const parsedScreenNumber = screen_number.toString().padStart(2, "0");
      console.log(`Chapitre ${chapter_number} - ${parsedScreenNumber}`);
      const URL = `${BASE_URL}/chapitre-${chapter_number}/${parsedScreenNumber}.webp`;
      const response = await fetch(URL);

      if (response.status === 404) {
        totalSize += (screen_number - 1) * 1200;
        if (chapter_number === 1) {
          Bun.write("./chapters.txt", totalSize.toString() + "\n");
        } else {
          await appendFile("./chapters.txt", totalSize.toString() + "\n");
        }
        console.log(`Chapter ${chapter_number}: ${totalSize}px`);
        break;
      }

      const image = await response.arrayBuffer();
      const dir = `./images/chapitre-${chapter_number}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      Bun.write(
        `./images/chapitre-${chapter_number}/${parsedScreenNumber}.webp`,
        image
      );
      screen_number++;
    }
  }
}

main();
