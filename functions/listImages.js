const os = require('os');
const fs = require('fs');
const path = require('path');

exports.handler = async function (event, context) {
  const imagesDir = path.join(__dirname, '..', 'images');
  const isLocal = os.platform() !== 'linux';
	const imagePath = isLocal
	  ? path.join(__dirname, '..', 'images')
	  : path.join(process.env.LAMBDA_TASK_ROOT, '..', '..', 'images');

	const files = fs.readdirSync(imagePath);
  const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(images),
  };
};
