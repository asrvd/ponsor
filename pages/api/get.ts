import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });
  const widget = await prisma.widget.findUnique({
    where: {
      userId: user?.id,
    },
  });
  const links = await prisma.link.findMany({
    where: {
      widgetId: widget?.id,
    },
  });
  res.status(200).json({
    user,
    widget,
    links,
  });
}
