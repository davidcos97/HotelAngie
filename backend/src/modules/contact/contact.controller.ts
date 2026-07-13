import type { Request, Response } from "express";
import * as contactService from "./contact.service";

export async function createContactHandler(req: Request, res: Response) {
  const message = await contactService.createContactMessage(req.body);
  res.status(201).json({ id: message.id });
}

export async function listContactHandler(_req: Request, res: Response) {
  res.json(await contactService.listContactMessages());
}
