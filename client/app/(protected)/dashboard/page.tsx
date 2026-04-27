"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { useUsage } from "@/components/providers/usage-provider";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import DashboardLoading from "./loading";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

interface DashboardData {
  user: {
    email: string;
    plan: "FREE" | "PRO";
    prsUsed: number;
    prsCreated: number;
    issuesUsed: number;
    chatMessagesUsed: number;
  };
  stats: {
    totalPrs: number;
    totalIssues: number;
    repoCount: number;
    repoName: string;
  };

  chartData: {
    date: string;
    pullRequests: number;
    issues: number;
  }[];

  limits: {
    FREE: {
      prs: number;
      prsCreated: number;
      issues: number;
      chat: number;
    };

    PRO: {
      prs: number;
      prsCreated: number;
      issues: number;
      chat: number;
    };
  };
}

export default function DashboardPage() {
  const { isSignedIn, isLoaded } = useAuthRedirect();
  const { getUsagePercentage } = useUsage();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [upgradeSuccess, setUpgradeSuccess] = useState(false);
  const [timeRange, setTimeRange] = useState("90d");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("upgraded") === "true") {
      setUpgradeSuccess(true);
      params.delete("upgraded");
      const query = params.toString();
      const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}`;
      window.history.replaceState({}, "", nextUrl);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const res = await fetch("/api/dashboard");
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(json.error || `Request failed (${res.status})`);
          return;
        }
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard");
        console.error("dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!isLoaded) {
      return;
    }

    if (!isSignedIn) {
      // Keep the loading state while auth redirect is in progress.
      setLoading(true);
      return;
    }

    setLoading(true);
    fetchData();
  }, [isLoaded, isSignedIn]);

  if (!isLoaded || loading || !isSignedIn) {
    return <DashboardLoading />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-2">
        <p className="text-destructive font-medium">{error}</p>
        <p className="text-sm text-muted-foreground text-center px-4">
          Ensure DATABASE_URL is set and run: pnpm prisma migrate dev
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  const filteredChartData = data.chartData.filter((item) => {
    const date = new Date(item.date);
    const now = new Date();
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - days);
    return date >= startDate;
  });

  const limits = data.limits[data.user.plan];

  const usageCards = [
    {
      label: "PRs Reviewed This Month",
      used: data.user.prsUsed,
      limit: limits.prs,
      percentage: getUsagePercentage("prs"),
    },
    {
      label: "PRs Created This Month",
      used: data.user.prsCreated,
      limit: limits.prsCreated,
      percentage: getUsagePercentage("prsCreated"),
    },
    {
      label: "Issues Analyzed This Month",
      used: data.user.issuesUsed,
      limit: limits.issues,
      percentage: getUsagePercentage("issues"),
    },
    {
      label: "Chat Messages This Month",
      used: data.user.chatMessagesUsed,
      limit: limits.chat,
      percentage: getUsagePercentage("chat"),
    },
  ];

  return (
    <>
      <Head>
        <title>Dashboard | Opal</title>
        <meta
          name="description"
          content="Usage, activity trends, and repository status at a glance."
        />
      </Head>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of your code review activity
            </p>
            {upgradeSuccess && (
              <div className="mt-3 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary">
                Upgrade successful. Your Pro plan is now active.
              </div>
            )}
          </div>
          <SectionCards cards={usageCards} />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive
              chartData={filteredChartData}
              timeRange={timeRange}
              onTimeRangeChange={setTimeRange}
            />
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
