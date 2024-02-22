const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test/index.js");
beforeEach(async () => {
  await seed(testData);
});
afterAll(async () => {
  await mongoose.connection.close();
});

describe("app", () => {
  describe("GET /api/users", () => {
    test("Status Code: 200 and should return all users data", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ _body }) => {
          console.log(_body);
          expect(_body[0]).toHaveProperty("username");
          expect(_body[0]).toHaveProperty("email");
        });
    });
    test("Status Code: 400 and error message", () => {
      return request(app).get("/api/us3r5").expect(404);
    });
  });
  describe("GET /api/users/:username", () => {
    test("Status Code: 200 and should return with a specific user", () => {
      return request(app)
        .get("/api/users/kong123")
        .expect(200)
        .then(({ _body }) => {
          expect(_body).toHaveProperty("email");
          expect(_body).toHaveProperty("plants");
        });
    });
    test("Status Code: 404 for an invalid user", () => {
      return request(app)
        .get("/api/users/not-a-user")
        .expect(404)
        .then(({ text }) => {
          expect(text).toBe("User does not exist");
        });
    });
  });
  describe("POST /api/users", () => {
    test("Status Code: 201 and should create a new user", () => {
      return request(app)
        .post("/api/users")
        .send({ username: "test", email: "<EMAIL>" })
        .expect(201)
        .then(({ _body }) => {
          expect(_body).toHaveProperty("username");
          expect(_body).toHaveProperty("email");
          expect(_body).toHaveProperty("plants");
          expect(_body).toHaveProperty("_id");
        });
    });
  });
  test("Status Code: 400 and respond with appropriate error message", () => {
    const newUser = {
      username: "WorldHello",
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .then(({ text }) => {
        expect(text).toBe("Missing Username or Email");
      });
  });
});
describe("GET /api/plants", () => {
  test("Status Code: 200 and should return all plants data", () => {
    return request(app)
      .get("/api/plants")
      .expect(200)
      .then(({ _body }) => {
        expect(_body[0]).toHaveProperty("name");
        expect(_body[0]).toHaveProperty("description");
        expect(_body[0]).toHaveProperty("user_id");
      });
  });
  test("Status Code: 404 for invalid endpoint", () => {
    return request(app).get("/api/plantttttz").expect(404);
  });
});
describe("GET Plants by username /api/plants/:username", () => {
  test("Status Code: 200 - and return specific plants for user", () => {
    return request(app)
      .get("/api/plants/kong123")
      .expect(200)
      .then(({ body }) => {
        expect(body[0]).toHaveProperty("name");
        expect(body[0]).toHaveProperty("description");
        expect(body[0]).toHaveProperty("createdAtDate");
        expect(body[0]).toHaveProperty("waterDate");
      });
  });
  test("Status Code: 404 for invalid username", () => {
    return request(app).get("/api/plants/invalidUserName").expect(404);
  });
});
describe("POST /api/plants", () => {
  test("Status Code: 201 and should create a new plant", () => {
    return request(app)
      .post("/api/plants")
      .send({
        name: "test",
        description: "test",
        username: "strawberry123",
        food_inc: 11,
        water_inc: 10,
      })
      .expect(201)
      .then(({ body }) => {
        console.log(body);
        expect(body).toHaveProperty("name");
        expect(body).toHaveProperty("description");
        expect(body).toHaveProperty("createdAtDate");
        expect(body).toHaveProperty("waterDate");
        expect(body).toHaveProperty("foodDate");
      });
  });
  test("Status Code: 400 and respond with appropriate error message", () => {
    const newPlant = {
      name: "WorldHello",
    };
    return request(app)
      .post("/api/plants")
      .send(newPlant)
      .expect(400)
      .then(({ text }) => {
        expect(text).toBe("Missing Name, User or Description");
      });
  });
});
describe("DELETE /api/plants/:plant_id", () => {
  test("Status Code: 200 and delete plant successfully ", () => {
    return request(app)
      .delete("/api/plants/65d740552a89d73462187a7c")
      .expect(204);
  });
  test("Status Code: 400", () => {
    return request(app).delete("/api/plants/invalidPlantId").expect(400);
  });
});
