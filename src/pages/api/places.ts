import type { NextApiRequest, NextApiResponse } from "next";

import messages from "@/utils/messages";
import usersCall from "@/utils/usersCall";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(404).json(messages.notFound);
  }

  try {
    const users = await usersCall();

    if (users.length === 0) {
      return res.status(400).json(messages.error);
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(messages.error);
  }
}
