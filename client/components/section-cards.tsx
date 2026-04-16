"use client"

import {
  TrendingDownIcon,
  TrendingUpIcon,
} from "@/components/global/inline-icons"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface UsageCardData {
  label: string
  used: number
  limit: number
  percentage: number
}

interface SectionCardsProps {
  cards: UsageCardData[]
}

export function SectionCards({ cards }: SectionCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {cards.map((card) => {
        const isOverLimit = card.percentage >= 100
        const TrendIcon = isOverLimit ? TrendingDownIcon : TrendingUpIcon
        const badgeLabel = isOverLimit
          ? "Limit reached"
          : `${Math.round(card.percentage)}% used`

        return (
          <Card key={card.label} className="@container/card">
            <CardHeader>
              <CardDescription>{card.label}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {card.used}/{card.limit}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TrendIcon />
                  {badgeLabel}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="w-full h-2 bg-muted rounded-full">
                <div
                  className="h-2 bg-primary rounded-full transition-all"
                  style={{ width: `${Math.min(card.percentage, 100)}%` }}
                />
              </div>
              <div className="text-muted-foreground">
                {card.limit - card.used > 0
                  ? `${card.limit - card.used} remaining this month`
                  : "Monthly limit reached"}
              </div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
