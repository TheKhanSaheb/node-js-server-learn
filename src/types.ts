import type { IncomingMessage, ServerResponse } from "node:http";

export type Res =ServerResponse;
export type Req = IncomingMessage;

export interface Order 
{
    id: number
    customer :string
    quantity: number
    food: string
    price: number
}