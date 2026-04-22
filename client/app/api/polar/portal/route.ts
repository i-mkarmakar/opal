import { CustomerPortal } from "@polar-sh/nextjs";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

class PortalHttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const getPolarServer = () => {
  const value = process.env.POLAR_SERVER;
  return value === "production" ? "production" : "sandbox";
};

const customerPortalHandler = CustomerPortal({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  getCustomerId: async (_req: NextRequest) => {
    const { userId } = await auth();
    if (!userId) {
      throw new PortalHttpError(401, "Unauthorized");
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const customerId = user?.polarCustomerId;
    if (!customerId) {
      throw new PortalHttpError(404, "No Polar customer ID found");
    }
    return customerId;
  },
  server: getPolarServer(),
});

export async function GET(req: NextRequest) {
  try {
    return await customerPortalHandler(req);
  } catch (error) {
    if (error instanceof PortalHttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const message =
      error instanceof Error ? error.message : "Failed to open customer portal";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
