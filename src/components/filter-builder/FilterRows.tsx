import { useContext } from "react";
import { FilterContext } from "./FilterContext";
import FilterRowCondition from "./FilterRowCondition";

export default function FilterRows() {
  const { filterModel } = useContext(FilterContext);

  return filterModel.conditions.map(condition => {
    if ("conditions" in condition) {
      return null;
    } else {
      return <FilterRowCondition condition={condition} key={condition.id} />;
    }
  });
}
