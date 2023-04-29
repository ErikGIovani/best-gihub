import { PrismaClient } from "@prisma/client";

import type { NewUser } from "./types";

const prisma = new PrismaClient();

const changeUser = async (userID: string, newUser: NewUser) => {
  const updatedUser = await prisma.user.update({
    where: { id: userID },
    data: newUser,
  });

  if (updatedUser) {
    console.log("User Updated");
  } else {
    console.error("Error Updating User");
  }
};

export default changeUser;
