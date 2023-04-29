import type { NextApiRequest, NextApiResponse } from "next";

import messages from "@/utils/messages";
import { userZodSchema } from "@/utils/validations";
import githubCall from "@/utils/githubCall";
import usersCall from "@/utils/usersCall";
import newUser from "@/utils/newUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(404).json(messages.notFound);
  }

  const result = userZodSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ message: "The username is not valid" });
  }

  const { username } = result.data;

  try {
    const user = await githubCall(username);

    if (user.message) {
      return res.status(400).json({ message: "The username not exist" });
    }

    const users = await usersCall();

    return await newUser(res, user, users);
  } catch (error) {
    return res.status(400).json(messages.error);
  }
}
