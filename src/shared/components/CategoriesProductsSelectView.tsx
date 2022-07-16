import { FunctionComponent } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

interface CategoriesProductsSelectViewProps {
  isActive: boolean;
  title: string;
  setIsActive: () => void;
}

const CategoriesProductsSelectView: FunctionComponent<
  CategoriesProductsSelectViewProps
> = ({ isActive, title, setIsActive }) => {
  return (
    <button
      className={`gap-2 btn btn-outline btn-sm ${
        isActive ? "btn-secondary" : ""
      }`}
      onClick={setIsActive}
    >
      {title === "Table View" ? (
        <AiOutlineUnorderedList />
      ) : (
        <BsFillGrid3X3GapFill />
      )}

      <p className="text-xs custom-normal-button-base sm:text-sm md:text-base">
        {title}
      </p>
    </button>
  );
};

export default CategoriesProductsSelectView;
