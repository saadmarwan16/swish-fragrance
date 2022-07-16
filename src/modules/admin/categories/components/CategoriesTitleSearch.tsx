import { FunctionComponent } from "react";

interface CategoriesTitleSearchProps {
  itemCount: number;
}

const CategoriesTitleSearch: FunctionComponent<CategoriesTitleSearchProps> = ({
  itemCount,
}) => {
  return (
    <div className="flex flex-col gap-2 pb-4 sm:flex-row sm:justify-between sm:items-center">
      <p className="custom-heading2 text-primary">
        Categories ({itemCount})
      </p>

      <input type="text" placeholder="Search categories by name ..." className="max-w-xs custom-input" />
    </div>
  );
};

export default CategoriesTitleSearch;
