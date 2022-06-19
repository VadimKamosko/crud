import { IncomingMessage, ServerResponse } from "http";
import { BadRequest, isJsonString, NotFound, urlWithoutId } from "./status";
import { UserController as UserContrl } from "../users";

export function getPostMethode(req: IncomingMessage, res: ServerResponse) {
  if (req.url == urlWithoutId || req.url == urlWithoutId + "/") {
    let data: string = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      if (isJsonString(data)) {
        const checkData = UserContrl.addNewuser(JSON.parse(data));
        if (checkData) {
          res.statusCode = 201;
          res.end(JSON.stringify(checkData));
          return;
        } else {
          BadRequest(res, "Does not contain required fields");
          return;
        }
      } else {
        BadRequest(res, "Body missing or incorrect");
        return;
      }
    });
    return;
  }
  NotFound(res);
}
