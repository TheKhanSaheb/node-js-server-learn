import type { Req, Res } from "./types";

export function sendResponse<T>(res:Res,{message,data,error}: { message?: string; data?: T; error?: boolean },status: number=200) 
{
    res.writeHead(status,{"content-type":"application/json"})
    res.end(JSON.stringify({
        
        success:error ? false: true,
        message:message,
        data:error ?null :data
     }));

}


export const extractRequestInfo = async <T>(req: Req) => {
  const body: T | null =
    req.method === "POST" || req.method === "PUT" ? await parseBody<T>(req) : null;
  const params = req.url?.split("/").filter(Boolean) ?? [];
  return {
    method: req.method ?? undefined,
    url: req.url ?? "/",
    body,
    params,
  };
};

export const parseBody = async <T>(req: Req): Promise<T | null> => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
};