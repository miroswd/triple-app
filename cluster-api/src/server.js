import http from 'http';



const processId = process.pid;
const server = http.createServer((req, res) => {

  for (let i = 0; i < 100; i++) {
    res.end(`handled by pid: ${processId}`);
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

/*

// simular q ocorreu um erro inesperado que matou um pid
setTimeout(() => {
  process.exit(1);
}, Math.random() * 1e4)

*/