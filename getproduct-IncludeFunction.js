const request = require("supertest")("https://dummyjson.com");
const expect = require("chai").expect;

function generateRandomName() {
  const randomString = Math.random().toString(36).substring(2, 10); //3,4,5
  const randomName = "Iphone_" + randomString; //Iphone_asdasdf
  return randomName;
}

describe("Scenario Get Product", function () {
  it("Success Get All Product", async function () {
    const response = await request.get("/products").send();
    expect(response.status).to.equal(200);
    console.log(response.status);
  });

  it("Success Get a Single Product", async function () {
    const response = await request.get("/products/1").send();
    expect(response.status).to.equal(200);
    console.log(response.status);
  });

  it("Get a Single Product with Invalid ID", async function () {
    const response = await request.get("/products/9999").send();
    expect(response.status).to.equal(404);
    console.log(response.status);
  });

  it("Success Get All Products Categories", async function () {
    const response = await request.get("/products/category-list").send();
    expect(response.status).to.equal(200);
    console.log(response.status);
  });
});

describe("Scenario Add Product", function () {
  it("Success Add Product - Manual", async function () {
    const response = await request
      .post("/products/add")
      .set("Content-Type", "application/json")
      .send({
        title: "Laptop Baru",
      });
    expect(response.status).to.equal(201);
    console.log(response.status);
    console.log(response.body.id);
  });

  it("Success Add Product - Random Function", async function () {
    this.timeout(5000);
    const response = await request
      .post("/products/add")
      .set("Content-Type", "application/json")
      .send({
        title: generateRandomName(),
      });
    expect(response.status).to.equal(201);
    console.log(response.status);
    console.log(response.body.id);
    console.log(response.body.title);
  });
});

describe("Scenario Update Product", function () {
  it("Success Update Product", async function(){
    const response = await request
    .put("/products/1")
    .set("Content-Type","application/json")
    .send({
        title: "iPhone Galaxy +1",
    });
    expect(response.status).to.equal(200);
    console.log(response.status);
    console.log(response.body.id);
    console.log(response.body.title);
  });

  it("Update Product with Invalid ID", async function(){
    const response = await request
    .put("/products/9999")
    .set("Content-Type","application/json")
    .send({
        title: "iPhone Galaxy +1",
    });
    expect(response.status).to.equal(404);
    console.log(response.status);
  });
});