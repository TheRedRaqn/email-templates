const imageContainer = document.getElementById('image-container');

async function fetchImages() {
  const response = await fetch('/.netlify/functions/listImages');
  const images = await response.json();
  return images;
}

function groupImagesByPrefix(images) {
  const groupedImages = {};

  images.forEach(image => {
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
    groupedImages[prefix].forEach(image => {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'image-wrapper';

      const imgElement = document.createElement('img');
      imgElement.src = `public/images/${image}`;

      const titleElement = document.createElement('p');
      titleElement.className = 'image-title';
      titleElement.textContent = image;

      imageWrapper.appendChild(imgElement);
      imageWrapper.appendChild(titleElement);
      imageContainer.appendChild(imageWrapper);
    });
  }
})();

document.getElementById('refresh-images').addEventListener('click', async () => {
  const images = await fetchImages();
  const groupedImages = groupImagesByPrefix(images);

  // Clear the image container
  imageContainer.innerHTML = '';

  // Re-render the images
  for (const prefix in groupedImages) {
    groupedImages[prefix].forEach(image => {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'image-wrapper';

      const imgElement = document.createElement('img');
      imgElement.src = `public/images/${image}`;

      const titleElement = document.createElement('p');
      titleElement.className = 'image-title';
      titleElement.textContent = image;

      imageWrapper.appendChild(imgElement);
      imageWrapper.appendChild(titleElement);
      imageContainer.appendChild(imageWrapper);
    });
  }
});
