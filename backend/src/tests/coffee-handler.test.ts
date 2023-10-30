import request from "supertest";
import { app } from "../app";

describe("Coffee API Tests", () => {
  it("should create a new coffee", async () => {
    const response = await request(app)
      .post("/api/v1/coffee/create")
      .send({
        name: "Jest Coffee",
        ingredients: ["Water", "Milk", "Caramel"],
        price: 120,
      });

    expect(response.status).toBe(201);
  });

  it("should update a coffee by ID", async () => {
    const coffeeId = "653f838a128029af1db7d557"; // Replace with a valid coffee ID
    const response = await request(app)
      .put(`/api/v1/coffee/update/${coffeeId}`)
      .send({ price: 75 });

    expect(response.status).toBe(200);
  });

  it("should remove a coffee by ID", async () => {
    const coffeeId = "653f832c128029af1db7d555"; // Replace with a valid coffee ID
    const response = await request(app).delete(
      `/api/v1/coffee/remove/${coffeeId}`
    );

    expect(response.status).toBe(204);
  });

  it("should get all coffees", async () => {
    const response = await request(app).get("/api/v1/coffee/getAll");

    expect(response.status).toBe(200);
  });

  it("should get a coffee by name", async () => {
    const coffeeName = "Espresso";
    const response = await request(app).get(`/api/v1/coffee/${coffeeName}`);

    expect(response.status).toBe(200);
  });
});
