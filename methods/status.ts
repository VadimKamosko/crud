import { IncomingMessage, ServerResponse } from "http";

export const urlId = /\/api\/users\/.+$/;
export const urlWithoutId = "/api/users";

export function NotFound(res: ServerResponse) {
  res.statusCode = 404;
  res.end(JSON.stringify({ message: "Not Found" }));
}

export function BadRequest(
  res: ServerResponse,
  text: string = "Invalid userID"
) {
  res.statusCode = 400;
  res.end(JSON.stringify({ message: text }));
}

export function returnId(req: IncomingMessage) {
  !req.url && (req.url = "/");
  let id: string = req.url.split("/").pop() ?? "";
  return id;
}

export function Servererror(res: ServerResponse) {
  res.statusCode = 500;
  res.end(JSON.stringify({ message: "Something went wrong" }));
}

export function isJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
