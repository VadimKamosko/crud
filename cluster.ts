import cluster from "node:cluster";
import { cpus } from "node:os";
import process from "node:process";

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
     cluster.fork();
  });
}
if (cluster.isWorker) {  
 import('./server');  
}
