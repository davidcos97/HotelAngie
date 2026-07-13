import { prisma } from "@/config/prisma";
import { ApiError } from "@/utils/apiError";
import type { BlogPostInput } from "./blog.schema";

export function listPosts() {
  return prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } });
}

export async function getPostBySlug(slug: string) {
  const post = await prisma.blogPost.findUnique({ where: { slug }, include: { comments: { orderBy: { createdAt: "desc" } } } });
  if (!post) throw ApiError.notFound("Artículo no encontrado");
  return post;
}

async function getPostById(id: string) {
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) throw ApiError.notFound("Artículo no encontrado");
  return post;
}

export async function createPost(input: BlogPostInput) {
  const existing = await prisma.blogPost.findUnique({ where: { slug: input.slug } });
  if (existing) throw ApiError.conflict("Ya existe un artículo con ese slug");
  return prisma.blogPost.create({ data: input });
}

export async function updatePost(id: string, input: Partial<BlogPostInput>) {
  await getPostById(id);
  return prisma.blogPost.update({ where: { id }, data: input });
}

export async function deletePost(id: string) {
  await getPostById(id);
  await prisma.blogPost.delete({ where: { id } });
}

export async function addComment(slug: string, name: string, message: string) {
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) throw ApiError.notFound("Artículo no encontrado");
  return prisma.comment.create({ data: { postId: post.id, name, message } });
}
