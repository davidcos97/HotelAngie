import type { Request, Response } from "express";
import { ApiError } from "@/utils/apiError";
import * as roomsService from "./rooms.service";

export async function listRoomsHandler(_req: Request, res: Response) {
  const rooms = await roomsService.listRooms();
  res.json(rooms);
}

export async function getRoomHandler(req: Request, res: Response) {
  const room = await roomsService.getRoomById(req.params.id!);
  res.json(room);
}

export async function getRoomBySlugHandler(req: Request, res: Response) {
  const room = await roomsService.getRoomBySlug(req.params.slug!);
  res.json(room);
}

export async function createRoomHandler(req: Request, res: Response) {
  const room = await roomsService.createRoom(req.body);
  res.status(201).json(room);
}

export async function updateRoomHandler(req: Request, res: Response) {
  const room = await roomsService.updateRoom(req.params.id!, req.body);
  res.json(room);
}

export async function deleteRoomHandler(req: Request, res: Response) {
  await roomsService.deleteRoom(req.params.id!);
  res.status(204).send();
}

export async function getAvailabilityHandler(req: Request, res: Response) {
  const month = req.query.month as string | undefined;
  if (!month) throw ApiError.badRequest("El parámetro 'month' es requerido (formato YYYY-MM)");
  const unavailableDates = await roomsService.getRoomAvailability(req.params.id!, month);
  res.json({ unavailableDates });
}
