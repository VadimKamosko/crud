import chai from "chai";
import chaiHttp from "chai-http";
const expect = chai.expect;
import { server } from "../server";
chai.use(chaiHttp);
let id: string;

describe("Users API", () => {
  it("should get all users", (done) => {
    chai
      .request(server)
      .get("/api/users")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.text).to.equals("[]");

        done();
      });
  });
  it("should create user", (done) => {
    chai
      .request(server)
      .post("/api/users")
      .send({
        username: "Dasha",
        age: 25,
        hobbies: ["English", "Book"],
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(JSON.parse(res.text).username).to.equal("Dasha");
        expect(JSON.parse(res.text).age).to.equal(25);
        expect(JSON.stringify(JSON.parse(res.text).hobbies)).to.equal(
          JSON.stringify(["English", "Book"])
        );
        id = JSON.parse(res.text).id;
        done();
      });
  });
  it("should get user by id", (done) => {
    chai
      .request(server)
      .get("/api/users/" + id)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text).id).to.equal(id);
        expect(JSON.parse(res.text).username).to.equal("Dasha");
        expect(JSON.parse(res.text).age).to.equal(25);
        expect(JSON.stringify(JSON.parse(res.text).hobbies)).to.equal(
          JSON.stringify(["English", "Book"])
        );

        done();
      });
  });
  it("should update user", (done) => {
    chai
      .request(server)
      .put("/api/users/" + id)
      .send({
        username: "Vadim",
        hobbies: ["Running", "Videogames", "Reading"],
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text).id).to.equal(id);
        expect(JSON.parse(res.text).username).to.equal("Vadim");
        expect(JSON.parse(res.text).age).to.equal(25);
        expect(JSON.stringify(JSON.parse(res.text).hobbies)).to.equal(
          JSON.stringify(["Running", "Videogames", "Reading"])
        );

        done();
      });
  });
  it("should delete user", (done) => {
    chai
      .request(server)
      .delete("/api/users/" + id)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(204);

        done();
      });
  });
  it("shouldn't get non-existing user", (done) => {
    chai
      .request(server)
      .get("/api/users/" + id)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.text).to.equal("Not Found");
        done();
      });
  });
});
