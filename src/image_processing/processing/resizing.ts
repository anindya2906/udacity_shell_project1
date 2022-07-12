import path from 'path';
import sharp from 'sharp';

import constants from '../constants';

// Function to resize image, save in file and return the output file path
const resizeImage = async (
  imageFileName: string,
  width: number,
  height: number
): Promise<string> => {
  const f = path.parse(imageFileName);
  const outputFileName = `${f.name}_${width}_${height}${f.ext}`;
  const inputImageFile = path.join(constants.fullImagePath, imageFileName);
  const outputImageFile = path.join(constants.thumbImagePath, outputFileName);
  try {
    await sharp(inputImageFile).resize(width, height).toFile(outputImageFile);
    return Promise.resolve(outputImageFile);
  } catch (error) {
    return await Promise.reject(new Error('Error while resizing image'));
  }
};

export default resizeImage;
