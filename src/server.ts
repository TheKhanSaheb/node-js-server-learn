import { createServer, IncomingMessage, type Server } from "node:http";

const server: Server = createServer((req: IncomingMessage, res) => {
    console.log("Received request");
    res.end("Hello World");
});

server.listen(5000, () => {
    console.log("Server is listening on port 5000");
});