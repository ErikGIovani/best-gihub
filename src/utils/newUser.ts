import type { NextApiResponse } from "next";

import changeUser from "./changeUser";
import type { GitHubUser, NewUser } from "./types";
import type { User } from "@prisma/client";

const newUser = async (
  res: NextApiResponse,
  user: GitHubUser,
  users: User[]
) => {
  const newUser: NewUser = {
    username: user.login,
    name: user.name,
    url: user.html_url,
    avatar: user.avatar_url,
    total: user.public_repos + user.followers,
  };

  if (newUser.total >= users[0].total) {
    await changeUser(users[0].id, newUser);
    return res.status(200).json({
      message: "Congratulations, you are in the first place",
    });
  } else if (
    newUser.total < users[0].total &&
    newUser.total >= users[1].total
  ) {
    await changeUser(users[1].id, newUser);
    return res.status(200).json({
      message: "Congratulations, you are in the second place",
    });
  } else if (
    newUser.total < users[1].total &&
    newUser.total >= users[2].total
  ) {
    await changeUser(users[2].id, newUser);
    return res.status(200).json({
      message: "Congratulations, you are in the third place",
    });
  } else {
    return res.status(200).json({
      message: "Sorry, you are not in any of the first places",
    });
  }
};

export default newUser;
