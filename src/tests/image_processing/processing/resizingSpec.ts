import path from "path";
import { promises as fsPromises } from "fs";
import constants from "../../../image_processing/constants";
import resize_image from "../../../image_processing/processing/resizing";

describe("Image Resizing Test", () => {
    
    // Delete fjord_200_200.jpg file from thumb folder
    beforeAll(async () => {
        const outFileExpect = path.join(constants.thumb_image_path, "fjord_200_200.jpg");
        try{
            const stats = await fsPromises.stat(outFileExpect);
            if (stats){
                await fsPromises.unlink(outFileExpect);
            }
        }
        catch {
            null;
        }
    });

    it("Should create a 200x200 image file in the thumb folder", async () => {
        const outFile = await resize_image('fjord.jpg', 200, 200);
        const outFileExpect = path.join(constants.thumb_image_path, "fjord_200_200.jpg");
        expect(outFile).toEqual(outFileExpect);
    });

    it("Should return error message if unable to create resized file", async () => {
        let outError: string = "";
        try{
            await resize_image('sample.jpg', 200, 200);
        }
        catch (error) {
            outError = error as string;
        }
        expect(outError).toEqual("Error while resizing image");
    });
});