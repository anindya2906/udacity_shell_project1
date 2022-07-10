import path from 'path';
import sharp from 'sharp';

import constants from '../constants';

// Function to resize image, save in file and return the output file path
const resize_image = async (image_file_name: string, width: number, height: number) => {
    const f = path.parse(image_file_name);
    const output_file_name = `${f.name}_${width}_${height}${f.ext}`;
    const input_image_file = path.join(constants.full_image_path, image_file_name);
    const output_image_file = path.join(constants.thumb_image_path, output_file_name);
    try {
        await sharp(input_image_file).resize(width, height).toFile(output_image_file);
        return Promise.resolve(output_image_file);
    }
    catch (error){
        return await Promise.reject("Error while resizing image");
    }
}


export default resize_image;