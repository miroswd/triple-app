import os from 'os';
import cluster from 'cluster';

// quem gerencia, balanceia a carga
// cluster.isPrimary


// quem realmente vai trabalhar
//cluster.isWorker



const runPrimaryProcess = async () => {
  // quem vai criar as cópias da aplicação e fazer o redirecionamento dos processos

  const processesCount = os.cpus().length * 2;

  console.log(`Primary ${process.pid} is running`);
  console.log(`Forking server with ${processesCount} processes`);


  for (let i = 0; i < processesCount; i++) {
    cluster.fork(); // basicamente vai rodar o mesmo arquivo, mas como cópia e aí vai mudar para isWorker
  }

  cluster.on("exit", (worker, code, signal) => {

    // se ele terminou com erro e não foi o sistema operacional que desligou ou simplesmente q a gente resolveu desconectar
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`${worker.process.pid} died... scheduling another one!`)
      cluster.fork();
    }
  })

}


const runWorkerProcess = async () => {
  // processo filho que vai executar o código que está dentro do server
  await import("./server.js")
}



cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess()