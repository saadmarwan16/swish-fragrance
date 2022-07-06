import { createContext, FunctionComponent, ReactNode, useContext } from "react";
import useBreakpoint, { Breakpoint } from "use-breakpoint";

const BREAK_POINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xl2: Infinity,
};

type TBreakPoints =
  | {
      readonly breakpoint: undefined;
      readonly minWidth: undefined;
      readonly maxWidth: undefined;
    }
  | Breakpoint<{ xs: number; sm: number; md: number; lg: number; xl: number, xl2: number, }>;

const CustomBreakPointContext = createContext<TBreakPoints | null>(null);

interface CustomBreakPointProviderProps {
  children: ReactNode;
}

export const CustomBreakPointProvider: FunctionComponent<
  CustomBreakPointProviderProps
> = ({ children }) => {
  const value = useBreakpoint(BREAK_POINTS, 'lg');

  return (
    <CustomBreakPointContext.Provider value={value}>
      {children}
    </CustomBreakPointContext.Provider>
  );
};

const useCustomBreakPointContext = () => useContext(CustomBreakPointContext)!;

export default useCustomBreakPointContext;
