import http from 'http';



const processId = process.pid;
const server = http.createServer((req, res) => {

  for (let id = 0; id < 1e2; id++) {
    setTimeout(() => {
      res.end(`handled by pid: ${processId}`);
    }, 100)
  }
})



server.listen(3000)
  .once('listening', () => {
    console.log(`Server started in process`, processId)
  });


process.on("SIGTERM", () => {
  console.log("server ending", new Date().toISOString());
  server.close(() => process.exit());
})