import "dotenv/config";
import http, { IncomingMessage, ServerResponse } from "http";
import { Getmethode } from "./methods/get";
import { getPutmethode } from "./methods/put";
import { getPostMethode } from "./methods/post";
import { getDeletemethode } from "./methods/delete";
import { Servererror } from "./methods/status";

const port: number = process.env.PORT ? +process.env.PORT : 3300;
const hostName: string = process.env.HOST || "127.0.0.1";


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
      
      if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return;
      }

      if (req.method == "GET") {
        Getmethode(req, res);
        return;
      }

      if (req.method == "POST") {
        getPostMethode(req, res);
        return;
      }

      if (req.method == "PUT") {
        getPutmethode(req, res);
        return;
      }

      if (req.method == "DELETE") {
        getDeletemethode(req, res);
        return;
      }

    } catch (e) {
      Servererror(res)
    }
  })
  .listen(port, hostName, () => {
    console.log(`started on port ${port}`);
  });
