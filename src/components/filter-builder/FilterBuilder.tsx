import JoinCondition from "./JoinCondition";
import { FilterContextProvider } from "./FilterContext";
import FilterRows from "./FilterRows";

interface Props {
  rowDefs: RowDefs[];
}

export function FilterBuilder({ rowDefs }: Props) {
  return (
    <FilterContextProvider rowDefs={rowDefs}>
      <div className="flex justify-center flex-col m-6 gap-y-2">
        <JoinCondition />
        <FilterRows />
      </div>
    </FilterContextProvider>
  );
}
