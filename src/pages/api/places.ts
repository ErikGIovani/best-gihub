import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(400).json({ message: "Not found" });
  }

  const Users = await prisma.user.findMany();
  const UsersOrdered = Users.sort((a, b) => b.total - a.total);

  res.status(200).json(UsersOrdered);
}
