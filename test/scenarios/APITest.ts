import chai from "chai";
import http from "http";

export function APIScenario(expect: Chai.ExpectStatic, server: http.Server) {
  let id: string;
  it("should get empty massive", (done) => {
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
        username: "User",
        age: 23,
        hobbies: ["FirstHobbie", "SecondHobbie"],
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(JSON.parse(res.text).username).to.equal("User");
        expect(JSON.parse(res.text).age).to.equal(23);
        expect(JSON.stringify(JSON.parse(res.text).hobbies)).to.equal(
          JSON.stringify(["FirstHobbie", "SecondHobbie"])
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
        expect(JSON.parse(res.text).username).to.equal("User");
        expect(JSON.parse(res.text).age).to.equal(23);
        expect(JSON.stringify(JSON.parse(res.text).hobbies)).to.equal(
          JSON.stringify(["FirstHobbie", "SecondHobbie"])
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
        expect(JSON.parse(res.text).age).to.equal(23);
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
        expect(JSON.parse(res.text).message).to.equal("Not Found");
        done();
      });
  });
}
