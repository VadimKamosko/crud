import http, { IncomingMessage, ServerResponse } from "http";
import { UserController as UserContrl } from "./users";

const hostName = "127.0.0.1";
const port = 3000;

let urlId = /\/api\/users\/\d+$/;
let urlWithoutId = "/api/users";
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
      //=============OPTIONS==================
      if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return;
      }

      !req.url && (req.url = "/");
      //=============GET=====================
      if (req.method == "GET") {
        if (req.url == urlWithoutId) {
          res.statusCode = 200;
          res.end(JSON.stringify(UserContrl.readAll()));
          return;
        }

        if (urlId.test(req.url)) {
          let id: string = returnId(req);
          if (UserContrl.readId(id)) {
            res.statusCode = 200;
            res.end(JSON.stringify(UserContrl.readId(id)));
            return;
          } else {
            NotFound(res);
            return;
          }
        } else {
          BadRequest(res);
          return;
        }
      }
      //============POST======================
      if (req.method == "POST") {
        if (req.url == urlWithoutId) {
          let data: string = "";
          req.on("data", (chunk) => {
            data += chunk;
          });
          req.on("end", () => {
            if (data) {
              let checkData = UserContrl.addNewuser(JSON.parse(data));
              if (checkData) {
                res.statusCode = 201;
                res.end(JSON.stringify(checkData));
                return;
              } else {
                NotFound(res);
                return;
              }
            } else {
              BadRequest(res);
              return;
            }
          });
          return;
        }
      }
      //================PUT====================
      if (req.method == "PUT") {
        if (urlId.test(req.url)) {
          let id: string = returnId(req);
          let data = "";
          let UserPut = UserContrl.readId(id);
          if (UserPut) {
            req.on("data", (chunk) => {
              data += chunk;
            });
            req.on("end", () => {
              res.statusCode = 200;
              UserContrl.updateUser(id, JSON.parse(data));
              res.end(JSON.stringify(UserPut));
            });
          } else {
            NotFound(res);
            return;
          }
        } else {
          BadRequest(res);
          return;
        }
        return;
      }
      //===============DELETE================
      if (req.method == "DELETE") {
        if (urlId.test(req.url)) {
          let id: string = returnId(req)
          if (UserContrl.readId(id)) {
            res.statusCode = 204;
            UserContrl.deleteuser(id);
            res.end("DELETE");
            return;
          } else {
            NotFound(res);
            return;
          }
        } else {
          BadRequest(res);
          return;
        }
      }
      NotFound(res);
    } catch (e) {
      res.statusCode = 500;
      res.end("Something went wrong");
    }
  })
  .listen(port, hostName, () => {
    console.log("started");
  });

function NotFound(res: ServerResponse) {
  res.statusCode = 404;
  res.end("Not Found");
}

function BadRequest(res: ServerResponse) {
  res.statusCode = 400;
  res.end("Bad Request");
}

function returnId(req: IncomingMessage) {
  !req.url && (req.url = "/");
  let id: string = req.url.split("/").pop() ?? "";
  return id;
}
