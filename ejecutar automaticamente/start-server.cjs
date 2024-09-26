import { exec } from 'child_process';
import open from 'open';

// Ejecuta 'npm run dev' y captura la salida
const server = exec('npm run dev');

// Captura la salida del servidor
server.stdout.on('data', (data) => {
  console.log(data);

  // Busca una línea que contenga el puerto (por ejemplo, 'http://localhost:3000')
  const match = data.match(/http:\/\/localhost:\d+/);
  if (match) {
    // Extrae el enlace del servidor
    const url = match[0];
    console.log(`Servidor iniciado en: ${url}`);

    // Abre el navegador con el enlace correcto
    open(url);
  }
});

server.stderr.on('data', (data) => {
  console.error(`Error: ${data}`);
});