import { createServer, IncomingMessage, type Server } from "node:http";
import { sendResponse } from "./utilitis";
import { Orders_Route } from "./Routes/Order_route";

const server: Server = createServer((req, res) => {
   
const url = req.url ?? "/";
    if (url === "/") {
        sendResponse(res, { message: "Hello, World!" });
        return;
    }

    if (url.startsWith("/orders")) {
       Orders_Route(req, res);
        return;
    }



    
    else {
        sendResponse(res, { error: true, message: "Not Found" }, 404);
    }






});

server.listen(5000, () => {
    console.log("Server is listening on port 5000");
});