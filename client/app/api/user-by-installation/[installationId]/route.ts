import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ installationId: string }> },
) {
  try {
    const { installationId } = await params;
    const installationIdNum = parseInt(installationId, 10);

    const installation = await prisma.installation.findUnique({
      where: {
        installationId: installationIdNum,
      },
      select: {
        userId: true,
      },
    });

    if (!installation) {
      return NextResponse.json({ userId: null }, { status: 404 });
    }

    return NextResponse.json({ userId: installation.userId });
  } catch (error) {
    return NextResponse.json(
      { error: "error fetching user by intallationID" },
      { status: 500 },
    );
  }
}
