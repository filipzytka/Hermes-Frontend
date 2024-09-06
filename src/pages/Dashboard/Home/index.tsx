import HomeGrid from "../../../components/Dashboard/HomeGrid";
import DashboardLayout from "../Layout/DashboardLayout";

export default function Dashboard() {
  const HOME_PAGE_INDEX = 0;

  return (
    <DashboardLayout currentPageIndex={HOME_PAGE_INDEX} currentPage={"Home"}>
      <HomeGrid />
    </DashboardLayout>
  );
}
