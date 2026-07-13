import type { Request, Response } from "express";
import * as blogService from "./blog.service";

export async function listPostsHandler(_req: Request, res: Response) {
  res.json(await blogService.listPosts());
}

export async function getPostHandler(req: Request, res: Response) {
  res.json(await blogService.getPostBySlug(req.params.slug!));
}

export async function createPostHandler(req: Request, res: Response) {
  res.status(201).json(await blogService.createPost(req.body));
}

export async function updatePostHandler(req: Request, res: Response) {
  res.json(await blogService.updatePost(req.params.id!, req.body));
}

export async function deletePostHandler(req: Request, res: Response) {
  await blogService.deletePost(req.params.id!);
  res.status(204).send();
}

export async function addCommentHandler(req: Request, res: Response) {
  const comment = await blogService.addComment(req.params.slug!, req.body.name, req.body.message);
  res.status(201).json(comment);
}
