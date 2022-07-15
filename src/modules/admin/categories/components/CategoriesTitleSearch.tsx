import { FunctionComponent } from "react";

interface CategoriesTitleSearchProps {
  itemCount: number;
}

const CategoriesTitleSearch: FunctionComponent<CategoriesTitleSearchProps> = ({
  itemCount,
}) => {
  return (
    <div className="flex flex-col gap-2 pb-4 sm:flex-row sm:justify-between sm:items-center">
      <p className="font-semibold md:text-lg lg:text-xl text-primary">
        Categories ({itemCount})
      </p>

      <input type="text" placeholder="Search category ..." className="w-full max-w-xs input-sm input input-bordered input-secondary" />
    </div>
  );
};

export default CategoriesTitleSearch;
