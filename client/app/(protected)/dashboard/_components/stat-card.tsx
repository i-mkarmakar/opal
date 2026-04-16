"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StatCardProps {
  label: string;
  used: number;
  limit: number;
  percentage: number;
}

export function StatCard({ label, used, limit, percentage }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-3xl">
          {used}/{limit}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-2 bg-muted rounded-full">
          <div
            className="h-2 rounded-full bg-primary"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
