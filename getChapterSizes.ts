const BASE_URL = "https://www.scan-vf.net/uploads/manga/one_piece/chapters";

async function main() {
  for (let chapter_number = 1; chapter_number <= 100; chapter_number++) {
    let screen_number = 1;
    while (true) {
      const parsedScreenNumber = screen_number.toString().padStart(2, "0");
      const URL = `${BASE_URL}/chapitre-${chapter_number}/${parsedScreenNumber}.webp`;
      const response = await fetch(URL);

      if (response.status === 404) {
        console.log(
          `Chapter ${chapter_number}: ${(screen_number - 1) * 1200}px`
        );
        break;
      }

      screen_number++;
    }
  }
}

main();
