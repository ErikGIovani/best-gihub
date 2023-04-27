import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

import { UserZodSchema } from "@/utils/validations";
import { INewUser } from "@/utils/types";
import changeUser from "@/utils/changeUser";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Not found" });
  }

  const result = UserZodSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ message: "The username is not valid" });
  }

  const { username } = result.data;

  const response = await fetch(`https://api.github.com/users/${username}`);
  const user = await response.json();

  if (user.message) {
    return res.status(400).json({ message: "The username not exist" });
  }

  const Users = await prisma.user.findMany();
  const UsersOrdered = Users.sort((a, b) => b.total - a.total);

  const NewUser: INewUser = {
    username: user.login,
    name: user.name,
    url: user.html_url,
    avatar: user.avatar_url,
    total: user.public_repos + user.followers,
  };

  if (NewUser.total >= UsersOrdered[0].total) {
    await changeUser(UsersOrdered[0].id, NewUser);
    res.status(200).json({
      message: "Congratulations, you are in the first place",
    });
  } else if (
    NewUser.total < UsersOrdered[0].total &&
    NewUser.total >= UsersOrdered[1].total
  ) {
    await changeUser(UsersOrdered[1].id, NewUser);
    res.status(200).json({
      message: "Congratulations, you are in the second place",
    });
  } else if (
    NewUser.total < UsersOrdered[1].total &&
    NewUser.total >= UsersOrdered[2].total
  ) {
    await changeUser(UsersOrdered[2].id, NewUser);
    res.status(200).json({
      message: "Congratulations, you are in the third place",
    });
  } else {
    res.status(200).json({
      message: "Sorry, you are not in any of the first places",
    });
  }
}
