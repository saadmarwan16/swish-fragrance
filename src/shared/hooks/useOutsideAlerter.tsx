import { FunctionComponent, useRef, useState, useEffect } from "react";

interface useOutsideAlerterProps {
  initialValue: boolean;
}

const useOutsideAlerter = (initialValue: boolean) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(initialValue);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) setIsVisible(true);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
    //   document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref]);

  return { isVisible, setIsVisible, ref };
};

export default useOutsideAlerter;
