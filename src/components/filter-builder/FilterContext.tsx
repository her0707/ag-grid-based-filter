import { PropsWithChildren, createContext, useState, Dispatch, SetStateAction } from "react";

interface FilterBuilderValue {
  filterModel: JoinAdvancedFilterModel;
  setFilterModel: Dispatch<SetStateAction<JoinAdvancedFilterModel>>;
  rowDefs: RowDefs[];
}

interface ProviderProps {
  rowDefs: RowDefs[];
}

export const FilterContext = createContext<FilterBuilderValue>({
  filterModel: {
    filterType: "join",
    level: 1,
    type: "AND",
    conditions: [],
  },
  setFilterModel: () => {},
  rowDefs: [],
});

export const FilterContextProvider = ({ children, rowDefs }: PropsWithChildren<ProviderProps>) => {
  const [filterModel, setFilterModel] = useState<JoinAdvancedFilterModel>({
    filterType: "join",
    type: "AND",
    level: 1,
    conditions: [],
  });

  return <FilterContext.Provider value={{ filterModel, setFilterModel, rowDefs }}>{children}</FilterContext.Provider>;
};
