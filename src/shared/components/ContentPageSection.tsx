import { FunctionComponent } from "react";

interface ContentPageSectionProps {
  startingCursor: number;
  endingCursor: number;
  total: number;
}

const ContentPageSection: FunctionComponent<ContentPageSectionProps> = ({
  startingCursor,
  endingCursor,
  total,
}) => {
  return (
    <div className="px-2 py-1 border rounded-lg custom-flex-center border-base-300 max-w-fit sm:max-w-xs">
      <p className="text-xs sm:text-sm md:text-base">
        Showing {startingCursor} - {endingCursor} of {total}
      </p>
    </div>
  );
};

export default ContentPageSection;
