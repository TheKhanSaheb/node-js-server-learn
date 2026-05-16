import type { IncomingMessage, ServerResponse } from "node:http";

export type Res =ServerResponse;
export type Req = IncomingMessage  & {
    method :Method
}

export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface Order 
{
    id: string
    customer :string
    quantity: number
    food: string
    price: number
}