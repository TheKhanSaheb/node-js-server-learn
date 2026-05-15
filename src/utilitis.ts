import type { Res } from "./types";

export function sendResponse<T>(res:Res,{message,data,error}: { message?: string; data?: T; error?: boolean },status: number=200) 
{
    res.writeHead(status,{"content-type":"application/json"})
    res.end(JSON.stringify({
        
        success:error ? false: true,
        message:message,
        data:error ?null :data
     }));

}