import { FunctionComponent } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

interface PaginationTabsProps {}

const PaginationTabs: FunctionComponent<PaginationTabsProps> = () => {
  return (
    <div className="rounded-lg btn-group">
      <button className="font-medium normal-case btn btn-xs btn-outline btn-secondary">
        First
      </button>
      <button className="btn btn-xs btn-outline btn-secondary">
        <AiOutlineLeft />
      </button>
      <button className="btn btn-xs !text-base-content  btn-disabled">3</button>
      <button className="btn btn-xs btn-outline btn-secondary">
        <AiOutlineRight />
      </button>
      <button className="font-medium normal-case btn btn-xs btn-outline btn-secondary">
        Last
      </button>
    </div>
  );
};

export default PaginationTabs;
