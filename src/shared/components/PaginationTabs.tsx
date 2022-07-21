import { observer } from "mobx-react-lite";
import { FunctionComponent } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Pagination } from "../../modules/admin/products/products_model";

interface PaginationTabsProps {
  pagination: Pagination;
  setContent: (page: number) => void;
}

const PaginationTabs: FunctionComponent<PaginationTabsProps> = ({
  pagination,
  setContent,
}) => {
  return (
    <div className="flex justify-end pt-6">
      <div className="gap-2 rounded-lg btn-group">
        <button
          className={`btn btn-square btn-sm btn-primary  ${
            pagination.page <= 1 ? " btn-disabled" : ""
          }`}
          onClick={async () => await setContent(pagination.page - 1)}
        >
          <AiOutlineLeft />
        </button>
        <button className="px-4 btn btn-sm !text-base-content btn-disabled">
          {pagination.pageCount === 0 ? "NaN" : pagination.page}
        </button>
        <button
          className={`btn btn-square btn-sm btn-primary  ${
            pagination.page >= pagination.pageCount ? " btn-disabled" : ""
          }`}
          onClick={() => setContent(pagination.page + 1)}
        >
          <AiOutlineRight />
        </button>
      </div>
    </div>
  );
};

export default observer(PaginationTabs);
