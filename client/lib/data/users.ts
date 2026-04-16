import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { PLAN_LIMITS, type PlanType } from "@/lib/plan-limits";

export async function ensureUser(userId: string) {
  const existing = await prisma.user.findUnique({ where: { id: userId } });
  if (existing) return existing;

  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses?.[0]?.emailAddress ?? "";

  return prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      email,
      plan: "FREE",
      prsUsed: 0,
      prsCreated: 0,
      issuesUsed: 0,
      chatMessagesUsed: 0,
      billingCycleStart: new Date(),
    },
  });
}

export async function getUserById(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

export async function getUserWithInstallations(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      installations: {
        include: {
          repositories: true,
        },
      },
    },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function incrementUsageCounter(
  userId: string,
  counter: "prsUsed" | "prsCreated" | "issuesUsed" | "chatMessagesUsed",
) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      [counter]: {
        increment: 1,
      },
    },
  });
}

export function checkPlanLimit(
  plan: string,
  used: number,
  type: "prs" | "prsCreated" | "issues" | "chat",
): boolean {
  const limits = PLAN_LIMITS[plan as PlanType];
  return used < limits[type];
}
