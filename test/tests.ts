import chai from "chai";
import chaiHttp from "chai-http";
import { APIScenario } from "./scenarios/APITest";
import { errorScen } from "./scenarios/errorScen";
import { multipleScen } from "./scenarios/multiple";
import { server } from "../server";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Users API", () => {
  APIScenario(expect,server)
});

describe("test multiple", () => {
  multipleScen(expect,server);
});

describe("third scenario", () => {
  errorScen(expect,server);
});
