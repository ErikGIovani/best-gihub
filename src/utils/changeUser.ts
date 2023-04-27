import { PrismaClient } from "@prisma/client";

import { INewUser } from "./types";

const prisma = new PrismaClient();

const changeUser = async (UserID: string, NewUser: INewUser) => {
  const updatedUser = await prisma.user.update({
    where: { id: UserID },
    data: NewUser,
  });

  if (updatedUser) {
    console.log("User Updated");
  } else {
    console.error("Error Updating User");
  }
};

export default changeUser;
