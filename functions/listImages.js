const fs = require('fs');
const path = require('path');
const os = require('os');

exports.handler = async function (event, context) {
  const isLocal = os.platform() !== 'linux';
  const imagePath = isLocal
    ? path.join(__dirname, '..', 'public', 'images')
    : path.join(process.env.LAMBDA_TASK_ROOT, '..', '..', 'public', 'images');

  const files = fs.readdirSync(imagePath);
  const imageFiles = files.filter((file) => file.match(/\.(jpg|jpeg|png|gif)$/));

  return {
    statusCode: 200,
    body: JSON.stringify(imageFiles),
  };
};
