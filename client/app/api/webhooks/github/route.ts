import { NextRequest, NextResponse } from "next/server";
import { Webhooks } from "@octokit/webhooks";
import {
  handleInstallationCreated,
  handlePullRequestOpened,
} from "@/lib/handlers/github";

const webhooks = new Webhooks({
  secret: process.env.WEBHOOK_SECRET || "development-secret",
});

webhooks.on("installation.created", handleInstallationCreated);
webhooks.on("pull_request.opened", handlePullRequestOpened);

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("x-hub-signature-256");
    const body = await req.text();

    if (!signature || !(await webhooks.verify(body, signature))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = JSON.parse(body);
    const eventName = req.headers.get("x-github-event");

    if (eventName === "installation") {
      await handleInstallationCreated(payload);
    } else if (eventName === "pull_request") {
      await handlePullRequestOpened(payload);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("GitHub webhook error:", error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }
}
