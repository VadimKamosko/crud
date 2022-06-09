import http, { IncomingMessage, ServerResponse } from "http";

const hostName: string = "127.0.0.1";
const port: number = 3000;

export let server = http
  .createServer((req: IncomingMessage, res: ServerResponse) => {
      if(req.method == "GET")
      {
        res.end(`GET\n  ${process.pid}`);
        console.log(req.method);
      }
      if(req.method == "POST")
      {
        res.end('POST')
        console.log(req.method);
      }
      if(req.method == "PUT")
      {
        res.end('PUT')
        console.log(req.method);
      }
      if(req.method == "PUT")
      {
        res.end('DELETE')
        console.log(req.method);
      }

  }).listen(port,hostName,()=>{
    console.log('started')
  });

