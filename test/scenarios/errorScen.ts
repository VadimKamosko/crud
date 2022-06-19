import chai from "chai";
import  http  from "http";



export function errorScen(expect:Chai.ExpectStatic,server:http.Server) {
  let id: string;
  it("should create user", (done) => {
    chai
      .request(server)
      .post("/api/users")
      .send({
        username: "UserTest",
        age: 20,
        hobbies: ["FirstHobbie", "SecondHobbie"],
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(JSON.parse(res.text).username).to.equal("UserTest");
        expect(JSON.parse(res.text).age).to.equal(20);
        expect(JSON.stringify(JSON.parse(res.text).hobbies)).to.equal(
          JSON.stringify(["FirstHobbie", "SecondHobbie"])
        );
        id = JSON.parse(res.text).id;
        done();
      });
  });
  it("shouldn't get user with invalid userid", (done) => {
    chai
      .request(server)
      .get("/api/users/" + id + "5")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid userID");
        done();
      });
  });
  it("shouldn't update user with invalid userid", (done) => {
    chai
      .request(server)
      .put("/api/users/" + id + "5")
      .send({
        username: "Vadim",
        hobbies: ["Running", "Videogames", "Reading"],
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid userID");

        done();
      });
  });
  it("should't delete with invalid userid", (done) => {
    chai
      .request(server)
      .delete("/api/users/" + id + "5")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid userID");

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
  it("should't delete non-existing user", (done) => {
    chai
      .request(server)
      .delete("/api/users/" + id)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.text).to.equal("Not Found");

        done();
      });
  });
  it("shouldn't update user non-existing user", (done) => {
    chai
      .request(server)
      .put("/api/users/" + id)
      .send({
        username: "Vadim",
        hobbies: ["Running", "Videogames", "Reading"],
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.text).to.equal("Not Found");

        done();
      });
  });
}
