export const fetchImage = (url: string) => {
  return new Promise((resolve, reject) => {
    if (!url) {
      return;
    }

    const image = new Image();
    image.src = url;
    image.addEventListener('load', () => resolve(url));
    image.addEventListener('error', reject);
  });
};

export const lazyLoadImage = (img: HTMLImageElement) => {
  return fetchImage(img.dataset.src)
    .then((url: string) => img.src = url);
};
