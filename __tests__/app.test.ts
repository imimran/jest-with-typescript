import request from "supertest";
import app from "../src/app";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { fakeImage, fakeAddImage } from "../src/utils/data";
import Image from "../src/models/image";

describe("app test", () => {
  test("my first test", async () => {
    console.log("first test");
  });
});

// use done way
describe("Test the root path", () => {
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
describe("Test the root path", () => {
  test("It shuld be get methoad", () => {
    return request(app)
      .get("/")
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});

// // Async, await way
// describe("It shuld be get methoad", () => {
//   test("get all image url", async () => {
//     const res = await request(app).get("/api/v1/all");
//     expect(res.statusCode).toBe(200);
//     // console.log(res.body);
//     let images = res.body
//     // expect(images.length).toBeGreaterThan(0);
//     expect(images.length).toBe(10);
//   });
// });

describe("It shuld be get methoad", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  it("should return a 200 & get image by id", async () => {
    const image = await Image.create(fakeImage);
    console.log("image", image);

    const { body, statusCode } = await request(app).get(
      `/api/v1/image/${image._id}`
    );

    console.log("body", body);

    expect(statusCode).toBe(200);

    expect(body.data.title).toBe(image.title);
  });

  it("Should return a 201 & create a image", async () => {
    const { body, statusCode } = await request(app)
      .post(`/api/v1/add-image-url`)
      .send(fakeAddImage);

    expect(statusCode).toBe(201);
    expect(body.data.imageFullURL).toEqual( fakeAddImage.imageFullURL);
  });
});
