import { createServer, IncomingMessage, type Server } from "node:http";
import { sendResponse } from "./utilitis";
import { orderRoute } from "./Routes/Order_route";
import type { Req } from "./types";

const server: Server = createServer((req, res) => {
   
const url = req.url ?? "/";
    if (url === "/") {
        sendResponse(res, { message: "Hello, World!" });
        return;
    }

    if (url.startsWith("/orders")) {
       orderRoute(req as Req, res);
        return;
    }



    
    else {
        sendResponse(res, { error: true, message: "Not Found" }, 404);
    }






});

server.listen(5000, () => {
    console.log("Server is listening on port 5000");
});