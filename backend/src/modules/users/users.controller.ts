import type { Request, Response } from "express";
import * as usersService from "./users.service";

export async function listUsersHandler(_req: Request, res: Response) {
  res.json(await usersService.listUsers());
}

export async function createUserHandler(req: Request, res: Response) {
  res.status(201).json(await usersService.createUser(req.body));
}

export async function deleteUserHandler(req: Request, res: Response) {
  await usersService.deleteUser(req.params.id!);
  res.status(204).send();
}
