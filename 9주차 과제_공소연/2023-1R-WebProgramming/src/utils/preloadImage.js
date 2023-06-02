export function preloadImage(obj) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      resolve({ ...obj, img });
    };
    img.onerror = img.onabort = function () {
      reject(obj.src);
    };
    img.src = obj.src;
  });
}

export async function loadImage(
  isCancelled,
  candidate,
  setGame,
  setAssetsLoaded
) {
  if (isCancelled) {
    return;
  }

  const imagesPromiseList = candidate.map((obj) => preloadImage(obj));

  console.log(imagesPromiseList);
  try {
    const loadedImages = await Promise.all(imagesPromiseList);
    if (isCancelled) {
      return;
    }
    console.log(loadedImages);

    const shuffledGame = loadedImages
      .sort(() => Math.random() - 0.5)
      .map((c) => ({ name: c.name, src: c.img.src }));

    setGame(shuffledGame);
    setAssetsLoaded(true);
  } catch (error) {
    console.error("Failed to load images:", error);
  }
}
