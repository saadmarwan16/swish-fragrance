import type { GetServerSideProps, NextPage } from "next";
import AdminLayout from "../../src/shared/components/AdminLayout";
import { GrHistory, GrClose } from "react-icons/gr";
import { useState } from "react";
import dayjs from "dayjs";
import PaginationTabs from "../../src/shared/components/PaginationTabs";
import EmptyContent from "../../src/shared/components/EmptyContent";
import ErrorContent from "../../src/shared/components/ErrorContent";
import { HistoryModel } from "../../src/modules/history/data/models/history_model";
import historyController from "../../src/modules/history/controllers/history_controller";
import LoaderContent from "../../src/shared/components/LoaderContent";

interface HistoryPageProps {
  histories: HistoryModel | null;
}

const History: NextPage<HistoryPageProps> = (props) => {
  const [histories, setHistories] = useState(props.histories);

  return (
    <AdminLayout titlePrefix="History">
      <div>
        <p className="mb-6 custom-heading1">History</p>
        <>
          {!histories ? (
            <ErrorContent
              title="history"
              setContent={() =>
                historyController
                  .getHistories()
                  .then((res) => setHistories(res))
              }
            />
          ) : (
            <>
              {historyController.loading ? (
                <LoaderContent />
              ) : (
                <>
                  {histories.data.length === 0 ? (
                    <EmptyContent title="History" content="history" />
                  ) : (
                    <>
                      {histories.data.map((history) => (
                        <div
                          key={history.id}
                          className="flex items-center justify-between gap-4 py-4 border-b border-base-300"
                        >
                          <div className="flex items-center gap-2">
                            <GrHistory className="w-20 custom-heading2" />
                            <div>
                              <p>{history.attributes.content}</p>
                              <p className="pt-2 text-xs text-gray-500 sm:text-sm">
                                {dayjs(history.attributes.createdAt).format(
                                  "hh:mm a, MMM D, YYYY"
                                )}
                              </p>
                            </div>
                          </div>
                          <button
                            className="btn btn-square btn-sm btn-ghost"
                            onClick={() => {
                              let page = histories.meta.pagination.page;
                              if (
                                histories.meta.pagination.total > 1 &&
                                histories.data.length === 1
                              ) {
                                page = page - 1;
                              }

                              historyController
                                .deleteHistory(history.id, page)
                                .then((res) => setHistories(res));
                            }}
                          >
                            <GrClose className="custom-heading2" />
                          </button>
                        </div>
                      ))}
                    </>
                  )}
                </>
              )}

              <PaginationTabs
                pagination={histories.meta.pagination}
                setContent={(page) => {
                  historyController
                    .getHistories(page)
                    .then((res) => setHistories(res));
                }}
              />
            </>
          )}
        </>
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const histories = await historyController.getHistories();

  return {
    props: {
      histories: null,
    },
  };
};

export default History;
