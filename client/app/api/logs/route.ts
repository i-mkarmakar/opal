import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getFilteredLogs } from "@/lib/data/logs";
import { ensureUser } from "@/lib/data/users";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureUser(userId);

    const { searchParams } = new URL(req.url);

    const result = await getFilteredLogs(userId, {
      type: searchParams.get("type"),
      repoId: searchParams.get("repoId"),
      startDate: searchParams.get("startDate"),
      endDate: searchParams.get("endDate"),
    });

    if (!result) {
      return NextResponse.json({ logs: [], repositories: [] });
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
