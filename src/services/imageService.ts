import Image from "../models/image";

export const allImages = async () => {
    console.log("main used");
    const all = await Image.find();

    return all;
}



  