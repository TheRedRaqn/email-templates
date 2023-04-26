const fs = require('fs');
const path = require('path');

exports.handler = async function (event, context) {
  const imagesDir = path.join(__dirname, '..', 'images');
  const files = fs.readdirSync(path.join(__dirname, '..', 'images'));
  const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(images),
  };
};
