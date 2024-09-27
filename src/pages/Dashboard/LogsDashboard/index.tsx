import { useState } from "react";
import DashboardLayout from "../../../components/Dashboard/Layout/DashboardLayout";
import LogsGrid from "../../../components/Dashboard/LogsGrid";
import { useDebouncedCallback } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { searchLogs } from "../../../api/logs";
import { popUp } from "../../../utils/Popup";
import Loading from "../../../components/Loading";

export default function LogsDashboard() {
  const [message, setMessage] = useState("");
  const [debouncedMessage, setDebouncedMessage] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 20,
    page: 0,
  });

  const debouncedSetMessage = useDebouncedCallback((value) => {
    setDebouncedMessage(value);
  }, 150);

  const {
    data: logsData,
    refetch,
    isLoading,
  } = useQuery({
    placeholderData: keepPreviousData,
    queryKey: ["searched-logs", paginationModel, debouncedMessage],
    select: (data) => ({
      rows: data?.logs.map((l, index) => ({
        id: index,
        message: l.message,
        created: moment(new Date(l.created)).format("MMMM Do YYYY, HH:mm"),
      })),
      totalCount: data?.totalCount ?? 0,
    }),
    queryFn: async () =>
      await searchLogs(
        paginationModel.page,
        paginationModel.pageSize,
        debouncedMessage
      ),
  });

  const handleRefresh = async () => {
    await refetch();
    popUp("Logs have been updated", "success");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <DashboardLayout currentPageIndex={3}>
      <LogsGrid
        debouncedSetMessage={debouncedSetMessage}
        handleRefresh={handleRefresh}
        logsData={logsData}
        message={message}
        paginationModel={paginationModel}
        setMessage={setMessage}
        setPaginationModel={setPaginationModel}
      />
    </DashboardLayout>
  );
}
