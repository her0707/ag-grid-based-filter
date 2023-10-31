import JoinCondition from "./JoinCondition";
import { FilterContextProvider } from "./FilterContext";

interface Props {
  rowDefs: RowDefs[];
}

export function FilterBuilder({ rowDefs }: Props) {
  return (
    <FilterContextProvider rowDefs={rowDefs}>
      <JoinCondition />
    </FilterContextProvider>
  );
}
