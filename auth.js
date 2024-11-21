const request = require("supertest")("https://dummyjson.com");
const expect = require("chai").expect;
var token = {};

describe("Scenario Get Authentication", function () {
  it("Verify Success Login", async function () {
    const response = await request
      .post("/auth/login")
      .set("Content-Type", "application/json")
      .send({
        username: "emilys",
        password: "emilyspass",
      });
    expect(response.status).to.equal(200);
    token = response.body.accessToken;
    console.log(token);
  });

  it("Verify Success to Get Current Auth User - Dinamis Token", async function () {
    const response = await request
      .get("/auth/me")
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).to.equal(200);
    expect(response.body.username).to.equal("emilys");
    console.log(response.body.username)
  });

  it("Verify Failed to Get Current Auth User", async function () {
    const response = await request.get("/auth/me").send();
    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal("Access Token is required");
    console.log(response.body.message)
  });
});
