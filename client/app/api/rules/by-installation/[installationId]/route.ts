import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ installationId: string }> },
) {
  try {
    const { installationId } = await params
    const installationIdNum = parseInt(installationId)

    const installation = await prisma.installation.findUnique({
      where: {
        installationId: installationIdNum
      },
      include: {
        user: {
          include: {
            rules: {
              orderBy: {
                createdAt: "asc",
              },
            },
          },
        },
      },
    });

    if (!installation) {
      return NextResponse.json({ rules: [] });
    }

    const rules = installation.user.rules.map((rule) => rule.content);

    return NextResponse.json({ rules });
  } catch (error) {
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }
}
