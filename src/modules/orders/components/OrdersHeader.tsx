import { FunctionComponent } from "react";
import ContentPageSection from "../../../shared/components/ContentPageSection";
import { Pagination } from "../../products/data/models/products_model";

interface OrdersHeaderProps {
  itemsCount: number;
  pagination: Pagination;
}

const OrdersHeader: FunctionComponent<OrdersHeaderProps> = ({
  itemsCount,
  pagination: { page, pageSize, total },
}) => {
  const startingCursor = itemsCount > 0 ? 1 + (page - 1) * pageSize : 0;
  const endingCursor =
    startingCursor === 0 ? 0 : startingCursor + itemsCount - 1;

  return (
    <div className="flex flex-col gap-2 pb-4 sm:flex-row sm:justify-between sm:items-center">
      <div className="flex flex-col gap-1 sm:items-center sm:flex-row md:gap-2 lg:gap-3">
        <p className="custom-heading2 text-primary">Orders</p>
        <ContentPageSection
          startingCursor={startingCursor}
          endingCursor={endingCursor}
          total={total}
        />
      </div>
    </div>
  );
};

export default OrdersHeader;
