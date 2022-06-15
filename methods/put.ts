import { IncomingMessage, ServerResponse } from "http";
import { BadRequest, isJsonString, NotFound, returnId, urlId } from "./status";
import { UserController as UserContrl } from "../users";

export function getPutmethode(req: IncomingMessage, res: ServerResponse) {
  !req.url && (req.url = "/");
  if (urlId.test(req.url)) {
    let id: string = returnId(req);
    if (!UserContrl.chechId(id)) {
      BadRequest(res);
      return;
    }
    let data = "";
    let UserPut = UserContrl.readId(id);
    if (UserPut) {
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        if (!isJsonString(data)) {
          BadRequest(res);
          return ;
        }
        res.statusCode = 200;
        UserContrl.updateUser(id, JSON.parse(data));
        res.end(JSON.stringify(UserPut));
      });
    } else {
      NotFound(res);
      return;
    }
    return;
  }
  NotFound(res);
}
