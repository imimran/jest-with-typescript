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


  test.only("should return a 200 & get image by id", async () => {
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
