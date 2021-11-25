import request from "supertest";
import app from "../src/app";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { fakeImage, fakeAddImage } from "../src/utils/data";
import Image from "../src/models/image";

describe.skip("app test", () => {
  test("my first test", async () => {
    console.log("first test");
  });
});

// use done way
describe.skip("Test the root path", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

//Promise Way
describe.skip("Test the root path", () => {
  test("It shuld be get methoad", () => {
    return request(app)
      .get("/")
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});


describe("Image CRUD operation test", () => {
  //For mocking db
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  beforeEach( ()=> {
    console.log("Before each");
    
  })

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();

  });


  test("should return a 200 & get image by id", async () => {
    const image = await Image.create(fakeImage);
    // console.log("image", image);

    const { body, statusCode } = await request(app).get(
      `/api/v1/image/${image._id}`
    );
    // console.log("body", body);
    expect(statusCode).toBe(200);
    expect(body.data.title).toBe(image.title);
  });


  test("Should return a 201 & create a image", async () => {
    const { body, statusCode } = await request(app)
      .post(`/api/v1/add-image-url`)
      .send(fakeAddImage);
    expect(statusCode).toBe(201);
    expect(body.data.imageFullURL).toEqual( fakeAddImage.imageFullURL);
  });


  test("Should return a 200 & delete a image", async () => {
    const image = await Image.create(fakeAddImage);
    // console.log("image", image);
    const { body, statusCode } = await request(app).delete(
      `/api/v1/remove-image/${image._id}`
    );
    // console.log("body", body);
    expect(statusCode).toBe(200);
    expect(body.msg).toEqual('Delete Successfuly');
  });

  test.todo("test for update image")

  
});

describe.only("mock function", () =>{
  it("returns undefined and has been called correct number of times", () => {
      const mock = jest.fn();
    
      const result = mock();
    
      expect(result).toBeUndefined();
      expect(mock).toHaveBeenCalledTimes(1);
      expect(mock).toHaveBeenCalledWith();
    });
    
    it("has been called with correct arguments and returns a correct value", () => {
      const mock = jest
        .fn()
        .mockReturnValueOnce("first return")
        .mockReturnValueOnce("second return");
    
      const resultFirst = mock("first call");
      const resultSecond = mock("second call");
    
      expect(resultFirst).toBe("first return");
      expect(resultSecond).toBe("second return");
      expect(mock).toHaveBeenCalledTimes(2);
      expect(mock).toHaveBeenNthCalledWith(1, "first call");
      expect(mock).toHaveBeenNthCalledWith(2, "second call");
    });
})



// import request from "supertest";
// import app from "../src/app";
// import mongoose from "mongoose";
// import Image from "../src/models/image";
// import * as ImageService from "../src/services/imageService";

// const imageId = new mongoose.Types.ObjectId().toString();
// const imageInput = {
//   _id: imageId,
//   imageFullURL:
//     "http://localhost:4000/photo-1508919801845-fc2ae1bc2a28-04_09_2021_01_41_05.jpeg",
// };

// describe("Add image test case", () => {
//   test("return data", async () => {
//     jest.setTimeout(10000) 
//     const createImageServiceMock = jest.spyOn(ImageService, "createImage").mockReturnThis()

//     const { body, statusCode } = await request(app)
//       .post(`/api/v1/add-image-url`)
//       .send(imageInput);
//     expect(statusCode).toBe(201);
//     console.log("createImageServiceMock", createImageServiceMock.mockReturnThis);
    

//     expect(createImageServiceMock).toHaveBeenCalledWith(imageInput);
//   });
// });
