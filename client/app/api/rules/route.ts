import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { ensureUser } from "@/lib/data/users";
import {
  getRulesByUserId,
  createRule,
  countRulesByUserId,
} from "@/lib/data/rules";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await ensureUser(userId);

    const rules = await getRulesByUserId(user.id);

    return NextResponse.json({ rules });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content } = await req.json();

    const user = await ensureUser(userId);

    const existingRulesCount = await countRulesByUserId(user.id);
    const maxRules = user.plan === "PRO" ? 50 : 5;

    if (existingRulesCount >= maxRules) {
      return NextResponse.json(
        { error: "Max rules limit reached" },
        { status: 403 },
      );
    }

    const rule = await createRule(user.id, content);

    return NextResponse.json({ rule }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
