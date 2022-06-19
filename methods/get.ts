import { IncomingMessage, ServerResponse } from "http";
import { UserController as UserContrl } from "../users";
import { BadRequest, NotFound, returnId, urlId, urlWithoutId } from "./status";

export function Getmethode(req: IncomingMessage, res: ServerResponse) {
  !req.url && (req.url = "/");
  if (req.url == urlWithoutId) {
    res.statusCode = 200;
    res.end(JSON.stringify(UserContrl.readAll()));
    return;
  }

  if (urlId.test(req.url)) {
    let id: string = returnId(req);
    if (!UserContrl.chechId(id)) {
      BadRequest(res);
      return;
    }
    if (UserContrl.readId(id)) {
      res.statusCode = 200;
      res.end(JSON.stringify(UserContrl.readId(id)));
      return;
    } else {
      NotFound(res);
      return;
    }
  }
  NotFound(res);
}
