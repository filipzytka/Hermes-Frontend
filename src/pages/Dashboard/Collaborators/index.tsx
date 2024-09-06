import CollaboratorsGrid from "../../../components/Dashboard/CollaboratorsGrid";
import DashboardLayout from "../../../components/Dashboard/Layout/DashboardLayout";

export default function CollabDashboard() {
  const COLLABORATORS_PAGE_INDEX = 1;

  return (
    <DashboardLayout
      currentPageIndex={COLLABORATORS_PAGE_INDEX}
      currentPage={"Collaborators"}
    >
      <CollaboratorsGrid />
    </DashboardLayout>
  );
}
