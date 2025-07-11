import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnalyticsCharts } from "@/components/analytics-charts"
import { ProductivityMetrics } from "@/components/productivity-metrics"
import { TeamPerformance } from "@/components/team-performance"

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
          <TabsTrigger value="team">Team Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Suspense fallback={<div>Loading analytics...</div>}>
            <AnalyticsCharts />
          </Suspense>
        </TabsContent>

        <TabsContent value="productivity" className="space-y-4">
          <ProductivityMetrics />
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <TeamPerformance />
        </TabsContent>
      </Tabs>
    </div>
  )
}
