/* CONSTANTS */

const chapters = [
  67200, 94800, 121200, 144000, 166800, 193200, 217200, 240000, 266400, 294000,
  316800, 340800, 363600, 385200, 408000, 428400, 452400, 474000, 496800,
  519600, 542400, 577200, 600000, 622800, 645600, 668400, 692400, 714000,
  739200, 762000, 784800, 807600, 830400, 853200, 876000, 902400, 925200,
  949200, 972000, 993600, 1015200, 1038000, 1060800, 1084800, 1107600, 1130400,
  1152000, 1174800, 1195200, 1218000, 1243200, 1266000, 1288800, 1312800,
  1335600, 1359600, 1382400, 1405200, 1428000, 1450800, 1473600, 1496400,
  1520400, 1542000, 1563600, 1585200, 1608000, 1630800, 1653600, 1676400,
  1699200, 1723200, 1746000, 1768800, 1791600, 1815600, 1839600, 1863600,
  1886400, 1910400, 1933200, 1957200, 1981200, 2005200, 2029200, 2055600,
  2079600, 2103600, 2127600, 2150400, 2173200, 2196000, 2218800, 2239200,
  2262000, 2284800, 2307600, 2330400, 2353200, 2382000,
];

/* UTILS */

let timerId;
function throttleFunction(func, delay) {
  if (timerId) return;

  timerId = setTimeout(function () {
    func();
    timerId = undefined;
  }, delay);
}

function getCurrentScrollInfos() {
  const currentScroll = document.body.scrollTop;
  const chapterIndex = chapters.findIndex((chapter) => currentScroll < chapter);
  const chapterSize =
    chapterIndex === 0
      ? chapters[0]
      : chapters[chapterIndex] - chapters[chapterIndex - 1];
  const previousChapterSize = chapters[chapterIndex - 1] || 0;
  const chapterPercentage =
    ((currentScroll - previousChapterSize) / chapterSize) * 100;

  return {
    chapterIndex,
    chapterPercentage,
  };
}

function unloadChapter(chapterIndex) {
  // console.log("Unload chapter ", chapterIndex + 1);
  document.getElementById("chapter-" + (chapterIndex + 1))?.remove();
}

function loadChapter(chapterIndex, isAtTheEnd = false) {
  // console.log("Load chapter ", chapterIndex + 1);
  const chapter = document.getElementById("chapter-" + (chapterIndex + 1));
  if (chapter) return;

  const newChapter = document.createElement("div");
  newChapter.id = "chapter-" + (chapterIndex + 1);

  const chapterImageCount =
    chapterIndex === 0
      ? chapters[0] / 1200
      : (chapters[chapterIndex] - chapters[chapterIndex - 1]) / 1200;

  for (let i = 1; i <= chapterImageCount; i++) {
    const image = document.createElement("img");
    image.src = `https://www.scan-vf.net/uploads/manga/one_piece/chapters/chapitre-${
      chapterIndex + 1
    }/${i.toString().padStart(2, "0")}.webp`;
    // image.src = `./images/chapitre-${chapterIndex + 1}/${i
    //   .toString()
    //   .padStart(2, "0")}.webp`;
    image.onerror = () => image.remove();
    newChapter.append(image);
  }
  if (isAtTheEnd) {
    document.getElementById("chapters-container").append(newChapter);
  } else {
    document.getElementById("chapters-container").prepend(newChapter);
  }
}

function updateDivPosition(previousChapterSizes) {
  // console.log("Set top to ", previousChapterSizes);
  document.getElementById("chapters-container").style.top =
    previousChapterSizes + "px";
}

/* MAIN */

function calculateWhereIAm() {
  const { chapterIndex, chapterPercentage } = getCurrentScrollInfos();

  if (chapterPercentage > 70) {
    loadChapter(chapterIndex + 1, true);
  } else if (chapterPercentage < 30 && chapterIndex > 0) {
    loadChapter(chapterIndex - 1, false);
    updateDivPosition(chapters[chapterIndex - 2] || 0);
  } else {
    unloadChapter(chapterIndex - 1);
    unloadChapter(chapterIndex + 1);
    updateDivPosition(chapters[chapterIndex - 1] || 0);
  }

  // console.log(
  //   "Chapter",
  //   chapterIndex + 1,
  //   `${Math.round(chapterPercentage)}%`,
  //   "\n-------"
  // );
}

function initialLoad() {
  const { chapterIndex } = getCurrentScrollInfos();

  loadChapter(chapterIndex);
  updateDivPosition(chapters[chapterIndex - 1] || 0);
}

document.addEventListener("scroll", () => {
  throttleFunction(calculateWhereIAm, 100);
});

initialLoad();
