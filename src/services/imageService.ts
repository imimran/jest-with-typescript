import Image from "../models/image";

export const allImages = async () => {
    const all = await Image.find();

    return all;
}