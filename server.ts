import http, { IncomingMessage, ServerResponse } from "http";
import { UserController as UserContrl } from "./users";

const hostName = "127.0.0.1";
const port = 3000;
export const server = http
  .createServer((req: IncomingMessage, res: ServerResponse) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET,POST,DELETE,PUT"
    );
    res.setHeader("Access-Control-Allow-Headers", "*");
    //=============OPTIONS==================
    if (req.method === "OPTIONS") {
      res.writeHead(200);
      res.end();
      return;
    }

    !req.url && (req.url = "/");
    //=============GET=====================
    if (req.method == "GET") {
      if (req.url == "/users") {
        res.statusCode = 200;
        res.end(JSON.stringify(UserContrl.readAll()));
        return;
      }

      if (/\/users\/\d+$/.test(req.url)) {
        let id: string = req.url.split("/").pop() ?? "";
        if (UserContrl.readId(id)) {
          res.statusCode = 200;
          res.end(JSON.stringify(UserContrl.readId(id)));
          return;
        } else {
          res.statusCode = 404;
          res.end("NotFound");
          return;
        }
      } else {
        res.statusCode = 400;
        res.end("NotFound");
        return;
      }
    }
    //============POST======================
    if (req.method == "POST") {
      if (req.url == "/users") {
        let data: string = "";
        req.on("data", (chunk) => {
          data += chunk;
        });
        req.on("end", () => {
          if (data) {
            let checkData = UserContrl.addNewuser(JSON.parse(data));
            if (checkData) {
              res.statusCode = 201;
              res.end("Create new user");
              return;
            } else {
              res.statusCode = 400;
              res.end("NotFound");
              return;
            }
          } else {
            res.statusCode = 400;
            res.end("NotFound");
            return;
          }
        });
        return;
      }
    }
    //================PUT====================
    if (req.method == "PUT") {
      res.end("PUT");
      console.log(req.method);
    }
    //===============DELETE================
    if (req.method == "DELETE") {
      if (/\/users\/\d+$/.test(req.url)) {
        let id: string = req.url.split("/").pop() ?? "";
        if (UserContrl.readId(id)) {
          res.statusCode = 204;
          UserContrl.deleteuser(id);
          console.log(req.method);
          res.end("DELETE");
          return;
        } else {
          res.statusCode = 404;
          res.end("NotFound");
          return;
        }
      } else {
        res.statusCode = 400;
        res.end("NotFound");
        return;
      }
    }
    res.statusCode = 404;
    res.end("NotFound");
  })
  .listen(port, hostName, () => {
    console.log("started");
  });
