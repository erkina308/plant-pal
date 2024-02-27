const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test/index.js");
const endpoints = require("../endpoints.json");

let testPlantId;
beforeEach(async () => {
  testPlantId = await seed(testData);
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
          expect(_body.users[0]).toHaveProperty("username");
          expect(_body.users[0]).toHaveProperty("email");
        });
    });
    test("Status Code: 400 and error message", () => {
      return request(app).get("/api/us3r5").expect(404);
    });
  });

  describe("/api", () => {
    test("GET: 200 responds with an object describing all available endpoints on API", () => {
      return request(app)
        .get("/api")
        .then((result) => {
          expect(result.body.endpoints).toEqual(endpoints);
        });
    });
  });

  describe("GET /api/users/:username", () => {
    test("Status Code: 200 and should return with a specific user", () => {
      return request(app)
        .get("/api/users/kong123")
        .expect(200)
        .then(({ _body }) => {
          expect(_body.user).toHaveProperty("email");
          expect(_body.user).toHaveProperty("plants");
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
          expect(_body.user).toHaveProperty("username");
          expect(_body.user).toHaveProperty("email");
          expect(_body.user).toHaveProperty("plants");
          expect(_body.user).toHaveProperty("_id");
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
        expect(text).toBe("Missing Email");
      });
  });
  test("Status Code: 400 and respond with appropriate error message", () => {
    const newUser = {
      email: "augs@augs",
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .then(({ text }) => {
        expect(text).toBe("Missing Username");
      });
  });
});
describe("GET /api/plants", () => {
  test("Status Code: 200 and should return all plants data", () => {
    return request(app)
      .get("/api/plants")
      .expect(200)
      .then(({ _body }) => {
        expect(_body.plants[0]).toHaveProperty("name");
        expect(_body.plants[0]).toHaveProperty("description");
        expect(_body.plants[0]).toHaveProperty("user_id");
      });
  });
  test("Status Code: 404 for invalid endpoint", () => {
    return request(app).get("/api/plantttttz").expect(404);
  });
});

describe("GET /api/plant/:plant_id", () => {
  test("Status Code: 200 and should return plant", () => {
    return request(app)
      .get(`/api/plants/${testPlantId.toString()}`)
      .expect(200)
      .then(({ _body }) => {
        expect(_body.plant).toHaveProperty("name");
        expect(_body.plant).toHaveProperty("description");
        expect(_body.plant).toHaveProperty("user_id");
      });
  });
  test("Status Code: 404 for invalid endpoint", () => {
    return request(app).get("/api/plantttttz").expect(404);
  });
});

describe("GET Plants by username /api/users/:username/plants", () => {
  test("Status Code: 200 - and return specific plants for user", () => {
    return request(app)
      .get("/api/users/kong123/plants")
      .expect(200)
      .then(({ body }) => {
        expect(body.plants[0]).toHaveProperty("name");
        expect(body.plants[0]).toHaveProperty("description");
        expect(body.plants[0]).toHaveProperty("createdAtDate");
        expect(body.plants[0]).toHaveProperty("waterDate");
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
        species: "test",
        description: "test",
        username: "strawberry123",
        food_inc: 11,
        water_inc: 10,
        image_url: "https://i.ibb.co/xXMbNb3/defaultplant-480.png",
      })
      .expect(201)
      .then(({ body }) => {
        console.log(body.plant.species);
        expect(body.plant).toHaveProperty("name");
        expect(body.plant).toHaveProperty("description");
        expect(body.plant).toHaveProperty("createdAtDate");
        expect(body.plant).toHaveProperty("waterDate");
        expect(body.plant).toHaveProperty("foodDate");
        expect(body.plant).toHaveProperty("image_url");
        expect(body.plant).toHaveProperty("species");
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
        expect(text).toBe("Missing Input Value");
      });
  });
});
// describe("DELETE /api/users/username/plants/:plant_id", () => {
//   test("Status Code: 200 and delete plant successfully ", () => {
//     const id = testPlantId.toString();
//     return request(app)
//       .delete(`/api/users/strawberry123/plants/${id}`)
//       .expect(204);
//   });

//   test("Status Code: 404", () => {
//     return request(app)
//       .delete("/api/users/rt54h45h/plants/rty45h45h")
//       .expect(404)
//       .then((response) => {
//         expect(response.text).toBe("Plant doesn't exist");
//       });
//   });

//   test("non existent plant id ", () => {
//     return request(app)
//       .delete("/api/users/strawberry123/plants/rty45h45h")
//       .expect(404)
//       .then((response) => {
//         expect(response.text).toBe("Plant doesn't exist");
//       });
//   });
// });

describe("PATCH /api/users/username/plants/:plant_id", () => {
  test("Status Code: 200 and update", () => {
    const id = testPlantId.toString();
    console.log(id, "<id");
    return request(app)
      .patch(`/api/users/strawberry123/plants/${id}`)
      .send({
        water_plant: true,
        feed_plant: true,
      })
      .expect(204)
      .then((response) => {
        console.log(response.body, "patch response");
      });
  });
});
