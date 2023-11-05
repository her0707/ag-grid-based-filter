import { generateUniqueId } from "@/utils/utils";
import { PropsWithChildren, createContext, useState, Dispatch, SetStateAction } from "react";
import { produce, Draft } from "immer";

interface FilterBuilderValue {
  filterModel: JoinAdvancedFilterModel;
  setFilterModel: (set: (draft: Draft<JoinAdvancedFilterModel>) => void) => void;
  rowDefs: RowDefs[];
}

interface ProviderProps {
  rowDefs: RowDefs[];
}

export const FilterContext = createContext<FilterBuilderValue>({
  filterModel: {
    filterType: "join",
    level: 0,
    type: "AND",
    id: generateUniqueId(),
    conditions: [],
  },
  setFilterModel: (set: (draft: Draft<JoinAdvancedFilterModel>) => void) => {},
  rowDefs: [],
});

export const FilterContextProvider = ({ children, rowDefs }: PropsWithChildren<ProviderProps>) => {
  const [filterModel, setFilterModel] = useState<JoinAdvancedFilterModel>({
    filterType: "join",
    type: "AND",
    level: 0,
    id: generateUniqueId(),
    conditions: [],
  });

  const _setFilterModel = (set: (draft: Draft<JoinAdvancedFilterModel>) => void) => {
    setFilterModel(
      produce(draft => {
        set(draft);
      }),
    );
  };

  return (
    <FilterContext.Provider value={{ filterModel, setFilterModel: _setFilterModel, rowDefs }}>
      {children}
    </FilterContext.Provider>
  );
};
