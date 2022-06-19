import "dotenv/config";
import http, { IncomingMessage, METHODS, ServerResponse } from "http";
import { Getmethode } from "./methods/get";
import { getPutmethode } from "./methods/put";
import { getPostMethode } from "./methods/post";
import { getDeletemethode } from "./methods/delete";
import { NotFound, Servererror } from "./methods/status";

const port: number = process.env.PORT ? +process.env.PORT : 3300;
const hostName: string = process.env.HOST || "127.0.0.1";

enum Methods {
  GET = "GET",
  POST = "POST",
  OPTIONS = "OPTIONS",
  PUT = "PUT",
  DELETE = "DELETE",
}

export const server = http
  .createServer((req: IncomingMessage, res: ServerResponse) => {
    try {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Request-Method", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET,POST,DELETE,PUT"
      );
      res.setHeader("Access-Control-Allow-Headers", "*");
      res.setHeader('Content-Type', 'application/json');


      switch (req.method) {
        case Methods.OPTIONS:
          res.writeHead(200);
          res.end();
          break;
        case Methods.GET:
          Getmethode(req, res);
          break;
        case Methods.POST:
          getPostMethode(req, res);
          break;
        case Methods.PUT:
          getPutmethode(req, res);
          break;
        case Methods.DELETE:
          getDeletemethode(req, res);
          break;
        default:
          NotFound(res);
          break;
      }
    } catch (e) {
      Servererror(res);
    }
  })
  .listen(port, hostName, () => {
    console.log(`started on port ${port}`);
  });
