import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

function clampInt(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.trunc(n)));
}

async function getOrCreateDemoInstallationId() {
  // Must fit in 32-bit signed int for Postgres "integer"
  const base = clampInt(Math.floor(Date.now() / 1000), 1, 2_000_000_000);
  for (let i = 0; i < 50; i++) {
    const candidate = base - i;
    const exists = await prisma.installation.findUnique({
      where: { installationId: candidate },
      select: { id: true },
    });
    if (!exists) return candidate;
  }
  // Extremely unlikely fallback
  return clampInt(Math.floor(Math.random() * 2_000_000_000), 1, 2_000_000_000);
}

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        installations: {
          include: {
            repositories: {
              include: { pullRequests: true, issues: true },
            },
          },
        },
        rules: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const DEMO_REPO_FULL_NAME = "demo/opal-sandbox";
    const existingRepo =
      user.installations.flatMap((i) => i.repositories).find((r) => r.fullName === DEMO_REPO_FULL_NAME) ??
      null;

    let repoId = existingRepo?.id ?? null;

    if (!repoId) {
      const installationId = await getOrCreateDemoInstallationId();
      const installation =
        user.installations[0] ??
        (await prisma.installation.create({
          data: {
            installationId,
            accountLogin: "demo",
            userId,
          },
        }));

      const githubIdBase = BigInt(Date.now()) * 10_000n;
      const repo = await prisma.repository.create({
        data: {
          githubId: githubIdBase + 1n,
          name: "opal-sandbox",
          fullName: DEMO_REPO_FULL_NAME,
          installationId: installation.id,
          indexingStatus: "COMPLETED",
        },
      });
      repoId = repo.id;

      // Seed a small amount of history for charts + logs.
      const prCount = 24;
      const issueCount = 14;

      await prisma.pullRequest.createMany({
        data: Array.from({ length: prCount }, (_, idx) => ({
          githubId: githubIdBase + BigInt(100 + idx),
          number: idx + 1,
          title: [
            "Refactor auth redirect flow",
            "Fix flaky dashboard chart rendering",
            "Improve PR review prompt templates",
            "Add repository indexing status UI",
            "Optimize logs filtering query",
            "Harden webhook signature verification",
          ][idx % 6],
          repositoryId: repoId!,
          reviewedAt: daysAgo(2 + (idx * 3) % 75),
        })),
      });

      await prisma.issue.createMany({
        data: Array.from({ length: issueCount }, (_, idx) => ({
          githubId: githubIdBase + BigInt(500 + idx),
          number: 200 + idx,
          title: [
            "Investigate slow embeddings upsert",
            "Dashboard shows empty state incorrectly",
            "Add retry for GitHub API rate limits",
            "Rules page fails on first load",
            "Indexing stuck in progress",
          ][idx % 5],
          repositoryId: repoId!,
          analyzedAt: daysAgo(1 + (idx * 5) % 85),
        })),
      });
    }

    // Seed some rules (idempotent-ish: only add if user has none).
    if (user.rules.length === 0) {
      await prisma.rule.createMany({
        data: [
          {
            userId,
            content:
              "Be concise. Focus on correctness, security, and performance. Suggest fixes with minimal diffs.",
          },
          {
            userId,
            content:
              "Prefer TypeScript types over `any`. Call out missing error handling and add tests when logic changes.",
          },
        ],
      });
    }

    // Ensure usage cards look "filled" (keep within typical FREE limits).
    await prisma.user.update({
      where: { id: userId },
      data: {
        prsUsed: Math.max(user.prsUsed, 7),
        prsCreated: Math.max(user.prsCreated, 4),
        issuesUsed: Math.max(user.issuesUsed, 5),
        chatMessagesUsed: Math.max(user.chatMessagesUsed, 9),
      },
    });

    return NextResponse.json({
      ok: true,
      repoFullName: DEMO_REPO_FULL_NAME,
      message: "Demo data seeded",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

