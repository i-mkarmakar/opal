import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { updateIndexingStatus } from "@/lib/data/repositories";
import type { IndexingStatus } from "@prisma/client";

const VALID_STATUSES: IndexingStatus[] = ["NOT_STARTED", "INDEXING", "COMPLETED", "FAILED"];

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { repoFullName, status } = body;

    if (!repoFullName || !status) {
      return NextResponse.json(
        { error: "repoFullName and status are required" },
        { status: 400 },
      );
    }

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be one of: NOT_STARTED, INDEXING, COMPLETED, FAILED" },
        { status: 400 },
      );
    }

    await updateIndexingStatus(repoFullName, status as IndexingStatus);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }
}
