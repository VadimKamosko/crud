import { IncomingMessage, ServerResponse } from "http";
import { UserController as UserContrl } from "../users";
import { BadRequest, NotFound, returnId, urlId } from "./status";

export function getDeletemethode(req: IncomingMessage, res: ServerResponse) {
  !req.url && (req.url = "/");
  if (urlId.test(req.url)) {
    const id: string = returnId(req);
    if (!UserContrl.chechId(id)) {
      BadRequest(res);
      return;
    }
    if (UserContrl.readId(id)) {
      res.statusCode = 204;
      UserContrl.deleteuser(id);
      res.end("DELETE");
      return;
    } else {
      NotFound(res);
      return;
    }
  }
  NotFound(res);
}
