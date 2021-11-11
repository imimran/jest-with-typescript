import request from "supertest";
import app from "../app";
// import mock from "../services/__mocks__/image"

// import {} from '../controllers/image';

jest.mock("../services/__mocks__/imageService");


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

// Async, await way
describe("It shuld be get methoad", () => {
  test("get all image url", async () => {
    const res = await request(app).get("/api/v1/all");
    expect(res.statusCode).toBe(200);
    // console.log(res.body);
    let images = res.body
    // expect(images.length).toBeGreaterThan(0);
    expect(images.length).toBe(10);
  });
});



