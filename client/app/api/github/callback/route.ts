import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";


export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const installationIdParam = searchParams.get("installation_id");

    if (!installationIdParam) {
      return NextResponse.redirect(new URL("/settings?error=missing_installation", req.url));
    }

    const installationId = parseInt(installationIdParam, 10);

    await prisma.installation.create({
      data: {
        installationId,
        accountLogin: "pending",
        userId,
      },
    });

    return NextResponse.redirect(new URL("/dashboard?installation=success", req.url))
  } catch (error) {
    return NextResponse.redirect(new URL("/settings?error=callback_failed", req.url))
  }
}
