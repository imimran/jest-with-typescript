import { Request, Response } from "express";

let images = [
  {
    "_id": "61364c4552781af510baf4bf",
    "title": "9-06_09_2021_11_13_41",
    "imageURL": "upload/9-06_09_2021_11_13_41.jpeg",
    "imageFullURL": "http://localhost:4000/9-06_09_2021_11_13_41.jpeg",
    "createdAt": "2021-09-06T17:13:41.390Z"
  }

];


export const getImages = (req: any, res: any) => {
  return images;
};



