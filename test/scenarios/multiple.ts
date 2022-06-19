import chai from "chai";
import http from "http";

export function multipleScen(expect: Chai.ExpectStatic, server: http.Server) {
  let firstuser: string;
  let seconduser: string;
  let third: string;
  it("should create user", (done) => {
    chai
      .request(server)
      .post("/api/users")
      .send({
        username: "First user",
        age: 20,
        hobbies: ["FirstHobbie", "SecondHobbie"],
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(JSON.parse(res.text).username).to.equal("First user");
        expect(JSON.parse(res.text).age).to.equal(20);
        expect(JSON.stringify(JSON.parse(res.text).hobbies)).to.equal(
          JSON.stringify(["FirstHobbie", "SecondHobbie"])
        );
        firstuser = res.text;
        done();
      });
  });
  it("should create another user", (done) => {
    chai
      .request(server)
      .post("/api/users")
      .send({
        username: "Second user",
        age: 19,
        hobbies: ["SecondHobbie"],
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(JSON.parse(res.text).username).to.equal("Second user");
        expect(JSON.parse(res.text).age).to.equal(19);
        expect(JSON.stringify(JSON.parse(res.text).hobbies)).to.equal(
          JSON.stringify(["SecondHobbie"])
        );
        seconduser = res.text;
        done();
      });
  });
  it("should create another user", (done) => {
    chai
      .request(server)
      .post("/api/users")
      .send({
        username: "Third user",
        age: 18,
        hobbies: ["Hobbies", "Hobbies"],
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(JSON.parse(res.text).username).to.equal("Third user");
        expect(JSON.parse(res.text).age).to.equal(18);
        expect(JSON.stringify(JSON.parse(res.text).hobbies)).to.equal(
          JSON.stringify(["Hobbies", "Hobbies"])
        );
        third = res.text;
        done();
      });
  });
  it("should get three users", (done) => {
    chai
      .request(server)
      .get("/api/users")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text).length).to.equals(3);
        expect(res.text.includes(firstuser)).to.equals(true);
        expect(res.text.includes(seconduser)).to.equals(true);
        expect(res.text.includes(third)).to.equals(true);
        done();
      });
  });
  it("should delete first user", (done) => {
    chai
      .request(server)
      .delete("/api/users/" + JSON.parse(firstuser).id)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(204);

        done();
      });
  });
  it("should get two users", (done) => {
    chai
      .request(server)
      .get("/api/users")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text).length).to.equals(2);
        expect(res.text.includes(seconduser)).to.equals(true);
        expect(res.text.includes(third)).to.equals(true);
        done();
      });
  });
  it("should delete last user", (done) => {
    chai
      .request(server)
      .delete("/api/users/" + JSON.parse(third).id)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(204);

        done();
      });
  });
  it("should get one user", (done) => {
    chai
      .request(server)
      .get("/api/users")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text).length).to.equals(1);
        expect(res.text.includes(seconduser)).to.equals(true);
        done();
      });
  });
}
