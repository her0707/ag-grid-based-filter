import { useContext } from "react";
import { FilterContext } from "./FilterContext";
import FilterRowCondition from "./FilterRowCondition";
import JoinCondition from "./JoinCondition";

export default function FilterRows() {
  const { filterModel } = useContext(FilterContext);

  return filterModel.conditions.map(condition => {
    if ("conditions" in condition) {
      return <JoinCondition condition={condition} key={condition.id} />;
    } else {
      return <FilterRowCondition condition={condition} key={condition.id} />;
    }
  });
}
