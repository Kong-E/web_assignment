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
