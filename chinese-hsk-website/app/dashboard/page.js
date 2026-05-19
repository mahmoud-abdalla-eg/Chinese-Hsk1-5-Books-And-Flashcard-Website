import DashboardClient from "@/components/dashboard/dashboard-client";
import { getHskSummary } from "@/lib/data/hsk";

export default function DashboardPage() {
  return <DashboardClient summaries={getHskSummary()} />;
}
