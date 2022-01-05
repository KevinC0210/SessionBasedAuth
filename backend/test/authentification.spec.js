var session = require("supertest-session");
var myApp = require("../app");

var testSession = null;

beforeEach(() => {
  testSession = session("http://localhost:3030/api");
});

describe("without being logged in", () => {
  it("should get the public page", (done) => {
    testSession.get("/").expect(200).end(done);
  });

  it("should fail accessing the restricted page", (done) => {
    testSession.get("/restricted").expect(403).end(done);
  });

  it("should fail accessing the admin page", (done) => {
    testSession.get("/admin").expect(403).end(done);
  });

  it("should log in as user", (done) => {
    testSession
      .post("/login")
      .send({ userid: "user", password: "userpassword" })
      .expect(200);
    testSession.get("/logout").expect(200).end(done);
  });

  it("should log in as admin", (done) => {
    testSession
      .post("/login")
      .send({ userid: "admin", password: "adminpassword" })
      .expect(200);
    testSession.get("/logout").expect(200).end(done);
  });
});

describe("being logged in as a user", () => {
  var userSession;

  beforeEach((done) => {
    testSession
      .post("/login")
      .send({ userid: "user", password: "userpassword" })
      .expect(200)
      .end((error) => {
        if (error) return done(error);
        userSession = testSession;
        return done();
      });
  });

  it("should get the public page", (done) => {
    userSession.get("/").expect(200).end(done);
  });

  it("should get the restricted page", (done) => {
    userSession.get("/restricted").expect(200).end(done);
  });

  it("should fail accessing the admin page", (done) => {
    userSession.get("/admin").expect(403).end(done);
  });

  it("should log out", (done) => {
    userSession.get("/logout").expect(200).end(done);
  });
});

describe("being logged in as an admin", () => {
  var adminSession;

  beforeEach((done) => {
    testSession
      .post("/login")
      .send({ userid: "admin", password: "adminpassword" })
      .expect(200)
      .end((error) => {
        if (error) return done(error);
        adminSession = testSession;
        return done();
      });
  });

  it("should get the public page", (done) => {
    adminSession.get("/").expect(200).end(done);
  });

  it("should get the restricted page", (done) => {
    adminSession.get("/restricted").expect(200).end(done);
  });

  it("should get the admin page", (done) => {
    adminSession.get("/admin").expect(200).end(done);
  });

  it("should log out", (done) => {
    adminSession.get("/logout").expect(200).end(done);
  });
});
