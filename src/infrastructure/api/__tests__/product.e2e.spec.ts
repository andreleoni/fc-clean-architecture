import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product a", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: "my product name",
        price: 20000
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("my product name");
    expect(response.body.price).toBe(20000);
  });

  it("should create a product b", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        type: "b",
        name: "my product name",
        price: 20000
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("my product name");
    expect(response.body.price).toBe(40000);
  });

  it("should not create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "my first name"
      });

    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const response = await request(app)
    .post("/product")
    .send({
      type: "a",
      name: "my first name",
      price: 20000
    });

    expect(response.status).toBe(200);

    const response2 = await request(app)
      .post("/product")
      .send({
        type: "b",
        name: "my second name",
        price: 20000
      });

    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);

    const product1 = listResponse.body.products[0];
    expect(product1.name).toBe("my first name");
    expect(product1.price).toBe(20000);

    const customer2 = listResponse.body.products[1];
    expect(customer2.name).toBe("my second name");
    expect(customer2.price).toBe(40000);

    const listResponseXML = await request(app)
    .get("/product")
    .set("Accept", "application/xml")
    .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(listResponseXML.text).toContain(`<products>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>my first name</name>`);
    expect(listResponseXML.text).toContain(`<price>20000</price>`);
    expect(listResponseXML.text).toContain(`</product>`);
    expect(listResponseXML.text).toContain(`<name>my second name</name>`);
    expect(listResponseXML.text).toContain(`<price>40000</price>`);
    expect(listResponseXML.text).toContain(`</product>`);
    expect(listResponseXML.text).toContain(`</products>`);
  });
});
