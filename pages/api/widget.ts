import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

import type { NextApiRequest, NextApiResponse } from "next";

export type Link = {
  url: string;
  title: string;
  type: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const { name, heading, avatar, links } = req.body;
  if (!session) {
    return res.status(401).json({ message: "Not logged in" });
  }
  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        widget: {
          upsert: {
            create: {
              name,
              heading,
              avatar,
              links: {
                create: links,
              },
            },
            update: {
              name,
              heading,
              avatar,
              links: {
                deleteMany: {},
                create: links,
              },
            },
          },
        },
      },
    });
    res.status(200).json({ message: "Widget created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
