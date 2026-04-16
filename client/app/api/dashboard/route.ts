import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PLAN_LIMITS } from "@/lib/plan-limits";
import { getDashboardStats, buildChartData } from "@/lib/data/logs";
import { ensureUser } from "@/lib/data/users";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureUser(userId);

    const stats = await getDashboardStats(userId);

    if (!stats) {
      return NextResponse.json(
        { error: "Failed to load dashboard data" },
        { status: 500 },
      );
    }

    const { user, installation, repositories, totalPRs, totalIssues, prsByDate, issuesByDate } = stats
    const chartData = buildChartData(prsByDate, issuesByDate)

    return NextResponse.json({
      user: {
        email: user.email,
        plan: user.plan,
        prsUsed: user.prsUsed,
        prsCreated: user.prsCreated,
        issuesUsed: user.issuesUsed,
        chatMessagesUsed: user.chatMessagesUsed,
        billingCycleStart: user.billingCycleStart
      },
      stats: {
        totalPrs: totalPRs,
        totalIssues,
        repoCount: repositories.length,
        repoName: repositories[0]?.fullName || "No repository connected",
        indexingStatus: repositories[0]?.indexingStatus || "NOT_STARTED",
        githubAccount: installation?.accountLogin || null
      },
      chartData,
      limits: PLAN_LIMITS
    })
  } catch (error) {
    console.error("Dashboard API error:", error);
    const message = error instanceof Error ? error.message : "internal server error";
    return NextResponse.json(
      { error: message },
      { status: 500 },
    );
  }
}
