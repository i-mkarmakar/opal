"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const primaryCtaStyles =
  "bg-gradient-to-b from-primary to-[color-mix(in_srgb,var(--primary)_55%,black)] text-white hover:text-white active:text-white hover:opacity-95 active:opacity-90 shadow-[0_8px_20px_-10px_hsl(var(--primary)/0.9)] border-transparent";

interface RuleFormProps {
  newRule: string;
  onNewRuleChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  creating: boolean;
  canAddMore: boolean;
  rulesCount: number;
  maxRules: number;
  isFree: boolean;
  error: string | null;
}

export function RuleForm({
  newRule,
  onNewRuleChange,
  onSubmit,
  creating,
  canAddMore,
  rulesCount,
  maxRules,
  isFree,
  error,
}: RuleFormProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Add New Rule</CardTitle>
        <CardDescription>Write your rule in natural language.</CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit}>
          <Input
            value={newRule}
            onChange={(e) => onNewRuleChange(e.target.value)}
            placeholder="e.g. Flag missing tests on API changes"
            disabled={creating || !canAddMore}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex items-center justify-between">
            <span className="text-sm items-center justify-between">
              {rulesCount}/{maxRules} used
              {isFree && rulesCount >= 5 && (
                <span className="ml-2 text-primary">
                  Upgrade to Pro for more rules
                </span>
              )}
            </span>

            <Button
              variant="default"
              className={primaryCtaStyles}
              type="submit"
              disabled={creating || !canAddMore}
            >
              {creating ? "Adding..." : "Add Rule"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
