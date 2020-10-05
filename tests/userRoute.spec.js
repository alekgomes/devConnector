const chai = require("chai");
const chaiHttp = require("chai-http");
const User = require("../models/User");
const connectDB = require("../config/db");
const { expect } = require("chai");
const app = require("../server");

chai.use(chaiHttp);
connectDB();

describe("Users", () => {
  before(async () => {
    await User.deleteMany({}); // clear database
  });

  describe("POST /api/users", () => {
    it("should add new user", async () => {
      let user = {
        name: "Lucas Alek",
        email: "lucas.maistro@gmail.com",
        password: "123123",
      };
      try {
        const res = await chai
          .request(app)
          .post("/api/users")
          .set("Content-Type", "application/json")
          .send(user);
        expect(res).to.have.status(200);
      } catch (error) {
        throw error;
      }
    });

    it("should fail with message 'User email already registered'", async () => {
      let user = {
        name: "Lucas Alek",
        email: "lucas.maistro@gmail.com",
        password: "123123",
      };

      try {
        const res = await chai
          .request(app)
          .post("/api/users")
          .set("Content-Type", "application/json")
          .send(user);
        expect(res).to.have.status(400);
        expect(res.body.errors.msg).to.be.a("string");
        expect(res.body.errors.msg).to.be.equal(
          "User email already registered"
        );
      } catch (error) {
        throw error;
      }
    });

    it("should fail with message 'Name is required'", async () => {
      let user = {
        email: "lucas.maistro@gmail.com",
        password: "123123",
      };

      try {
        const res = await chai
          .request(app)
          .post("/api/users")
          .set("Content-Type", "application/json")
          .send(user);
        expect(res).to.have.status(400);
        const { errors } = res.body;
        expect(errors).to.be.an("array");
        expect(errors[0].msg).to.be.equal("Name is required");
      } catch (error) {
        throw error;
      }
    });

    it("should fail with message 'Enter a valid email'", async () => {
      let user = {
        name: "Lucas Álek",
        email: "lucas.maistrogmail.com",
        password: "123123",
      };

      try {
        const res = await chai
          .request(app)
          .post("/api/users")
          .set("Content-Type", "application/json")
          .send(user);
        expect(res).to.have.status(400);
        const { errors } = res.body;
        expect(errors).to.be.an("array");
        expect(errors[0].msg).to.be.equal("Enter a valid email");
      } catch (error) {
        throw error;
      }
    });

    it("should fail with message 'Password must have as least 6 chacaracters'", async () => {
      let user = {
        name: "Lucas Álek",
        email: "lucas.maistro@gmail.com",
        password: "123",
      };

      try {
        const res = await chai
          .request(app)
          .post("/api/users")
          .set("Content-Type", "application/json")
          .send(user);
        expect(res).to.have.status(400);
        const { errors } = res.body;
        expect(errors).to.be.an("array");
        expect(errors[0].msg).to.be.equal(
          "Password must have as least 6 chacaracters"
        );
      } catch (error) {
        throw error;
      }
    });
  });
});
