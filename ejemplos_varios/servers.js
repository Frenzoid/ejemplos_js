/**
 * @author: MrFrenzoid
 */

/**
 * Ejemplo sencillo de como usar el mismo servidor https para sockets y api rest.
 */

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const fs = require('fs')

const app = express();

// Body parser configuration
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));

// Logger to console.
app.use(logger("dev"));

// Enable cors
app.use(cors());

const https = require('https')

const server = https.createServer({
  key: fs.readFileSync('certs/server.key'),
  cert: fs.readFileSync('certs/server.cert')
},
  app);

const io = require("socket.io")(server, {
  cors: { origin: "*", }
});

server.listen(3000, () => {
  console.log("Servidor https escuchando en el puerto 3000");
});

module.exports = { io, app }