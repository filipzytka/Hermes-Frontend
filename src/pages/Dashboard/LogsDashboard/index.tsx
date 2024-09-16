import DashboardLayout from "../../../components/Dashboard/Layout/DashboardLayout";
import LogsGrid from "../../../components/Dashboard/LogsGrid";

export default function LogsDashboard() {
  const HOME_PAGE_INDEX = 3;

  return (
    <DashboardLayout currentPageIndex={HOME_PAGE_INDEX}>
      <LogsGrid />
    </DashboardLayout>
  );
}
