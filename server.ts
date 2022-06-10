import http, { IncomingMessage, ServerResponse } from "http";
import { UserController as UserContrl } from "./users";

const hostName: string = "127.0.0.1";
const port: number = 3000;
export let server = http
  .createServer((req: IncomingMessage, res: ServerResponse) => {
    if (req.url) {
      if (req.method == "GET") {
        if (req.url == "/users") {
          res.statusCode = 200;
          res.end(JSON.stringify(UserContrl.readAll()));
        }
        if (/\/users\/\d+$/.test(req.url)) {
          let id: string | undefined = req.url.split("/").pop();
          if (id)
            if (UserContrl.readId(id)) {
              res.statusCode = 200;
              res.end(JSON.stringify(UserContrl.readId(id)));
            } else {
              res.statusCode = 400;
              res.end("NotFound");
            }
        }
      }
      if (req.method == "POST") {
        res.end("POST");
        console.log(req.method);
      }
      if (req.method == "PUT") {
        res.end("PUT");
        console.log(req.method);
      }
      if (req.method == "PUT") {
        res.end("DELETE");
        console.log(req.method);
      }
    }
  })
  .listen(port, hostName, () => {
    console.log("started");
  });
