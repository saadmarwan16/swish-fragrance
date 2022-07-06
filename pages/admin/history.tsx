import type { NextPage } from "next";
import AdminLayout from "../../src/shared/components/AdminLayout";

interface HistoryPageProps {}

const History: NextPage<HistoryPageProps> = ({}) => {
  return (
    <AdminLayout titlePrefix="History">
      <div className="text-4xl font-semibold">History View is working</div>
    </AdminLayout>
  );
};

export default History;
