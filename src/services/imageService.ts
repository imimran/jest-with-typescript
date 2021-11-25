import Image from "../models/image";

export const allImages = async () => {
    console.log("main used");
    const all = await Image.find();

    return all;
}

export const createImage = async (input: any) => {

      const image = await Image.create(input);
  
      return image;
   
  }



  