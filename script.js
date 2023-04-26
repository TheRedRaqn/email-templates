const imageContainer = document.getElementById("image-container");
const cloudinary = window.cloudinary;

async function fetchImages() {
  const response = await fetch("/.netlify/functions/listImages");
  const images = await response.json();
  return images;
}
const cl = new cloudinary.Cloudinary({ cloud_name: 'programNOW', secure: true, api_key: 'aap25f3WGsTQOShjJECZtoHlsMI' });

const imageContainer = document.getElementById('image-container');

async function fetchImages() {
  // Replace this with an actual API call to Cloudinary
  const images = [
    'header_image1.jpg',
    'header_image2.jpg',
    'footer_image1.jpg',
    'footer_image2.jpg',
  ];
  return images;
}

function groupImagesByPrefix(images) {
  const groupedImages = {};

  images.forEach((image) => {
    const prefix = image.split('_')[0];
    if (!groupedImages[prefix]) {
      groupedImages[prefix] = [];
    }
    groupedImages[prefix].push(image);
  });

  return groupedImages;
}

(async function () {
  const images = await fetchImages();
  const groupedImages = groupImagesByPrefix(images);

  for (const prefix in groupedImages) {
    groupedImages[prefix].forEach((image) => {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'image-wrapper';

      const imgElement = document.createElement('img');
      imgElement.src = cl.url(image, { cloud_name: 'programNOW', api_key: 'aap25f3WGsTQOShjJECZtoHlsMI' });

      const titleElement = document.createElement('p');
      titleElement.className = 'image-title';
      titleElement.textContent = image;

      imageWrapper.appendChild(imgElement);
      imageWrapper.appendChild(titleElement);
      imageContainer.appendChild(imageWrapper);
    });
  }
})();
