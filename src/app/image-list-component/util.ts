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

export const lazyLoadImage = (img: HTMLImageElement) => 
  fetchImage(img.dataset.src).then((url: string) => img.src = url);

export const option = {
  root: null,
  rootMargin: '0px',
  threshold: [0, 0.25]
};

export const MEMES = [
  { placeholder: 'https://via.placeholder.com/600x480',
    actual: 'https://winkgo.com/wp-content/uploads/2018/05/55-Funniest-Cat-Memes-Ever-01-720x539.jpg'
  },
  { placeholder: 'https://via.placeholder.com/600x480',
    actual: 'https://winkgo.com/wp-content/uploads/2018/05/55-Funniest-Cat-Memes-Ever-02-720x932.jpg'
  },
  { placeholder: 'https://via.placeholder.com/600x480',
    actual: 'https://winkgo.com/wp-content/uploads/2018/05/55-Funniest-Cat-Memes-Ever-03-720x697.jpg'
  },
  { placeholder: 'https://via.placeholder.com/600x480',
    actual: 'https://winkgo.com/wp-content/uploads/2018/05/55-Funniest-Cat-Memes-Ever-04-720x540.jpg'
  },
  { placeholder: 'https://via.placeholder.com/600x480',
    actual: 'https://winkgo.com/wp-content/uploads/2018/05/55-Funniest-Cat-Memes-Ever-05-720x530.jpg'
  },
  {
    placeholder: 'https://via.placeholder.com/600x480',
    actual: 'https://winkgo.com/wp-content/uploads/2018/05/55-Funniest-Cat-Memes-Ever-06-720x504.jpg'
  },
  {
    placeholder: 'https://via.placeholder.com/600x480',
    actual: 'https://winkgo.com/wp-content/uploads/2018/05/55-Funniest-Cat-Memes-Ever-07-720x950.jpg'
  },
  {
    placeholder: 'https://via.placeholder.com/600x480',
    actual: 'https://winkgo.com/wp-content/uploads/2018/05/55-Funniest-Cat-Memes-Ever-08-720x519.jpg'
  },
  {
    placeholder: 'https://via.placeholder.com/600x480',
    actual: 'https://winkgo.com/wp-content/uploads/2018/05/55-Funniest-Cat-Memes-Ever-09-720x662.jpg'
  },
  {
    placeholder: 'https://via.placeholder.com/600x480',
    actual: 'https://winkgo.com/wp-content/uploads/2018/05/55-Funniest-Cat-Memes-Ever-10-720x885.jpg'
  },
  {
    placeholder: 'https://via.placeholder.com/600x480',
    actual: 'https://winkgo.com/wp-content/uploads/2018/05/55-Funniest-Cat-Memes-Ever-11-720x540.jpg'
  },
  {
    placeholder: 'https://via.placeholder.com/600x480',
    actual: 'https://winkgo.com/wp-content/uploads/2018/05/55-Funniest-Cat-Memes-Ever-12-720x463.jpg'
  },
  {
    placeholder: 'https://via.placeholder.com/600x480',
    actual: 'https://winkgo.com/wp-content/uploads/2018/05/55-Funniest-Cat-Memes-Ever-17-720x520.jpg'
  }
];
