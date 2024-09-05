import DashboardLayout from "../Layout/DashboardLayout";
import BanListGrid from "../../../components/Dashboard/BanListGrid";

export default function BanListDashboard() {
  const BANLIST_PAGE_INDEX = 2;

  return (
    <DashboardLayout
      currentPageIndex={BANLIST_PAGE_INDEX}
      currentPage={"BanList"}
    >
      <BanListGrid />
    </DashboardLayout>
  );
}
