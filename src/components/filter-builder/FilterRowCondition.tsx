import { useContext } from "react";
import { Minus } from "lucide-react";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { FilterContext } from "./FilterContext";
import { findItem } from "@/utils/utils";
import { operator } from "../constants/filter";
import { Input } from "../ui/input";
import { DatePicker } from "../ui/date-picker";

interface Props {
  condition: ColumnAdvancedFilterModel;
  rowDefs: RowDefs[];
}

const FilterValue = ({ condition, rowDefs }: Props) => {
  const row = rowDefs.find(row => row.colId === condition.colId);

  if (condition.filterType === "boolean") {
    return <></>;
  } else if (condition.filterType === "text" && row.filterValues) {
    return (
      <Select value={condition.filter}>
        <SelectTrigger className="w-auto">
          <SelectValue placeholder="Select a Value" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {row.filterValues.map(item => (
              <SelectItem key={item.value} value={item.value}>
                {item.text}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  } else if (condition.filterType.startsWith("date")) {
    return <DatePicker />;
  } else {
    return <Input className="w-auto" />;
  }
};

export default function FilterRowCondition({ condition }: Props) {
  const { setFilterModel, filterModel, rowDefs } = useContext(FilterContext);

  const handleColNameChange = (e: string) => {
    setFilterModel(draft => {
      const item = findItem(draft.conditions, condition.id, false);

      if ("colId" in item) {
        const row = rowDefs.find(row => row.colId === e);
        item.colId = e;
        item.filterType = row.colType;
      }
    });
  };

  const handleOperatorChange = (
    operator: TextAdvancedFilterModelType | ScalarAdvancedFilterModelType | BooleanAdvancedFilterModelType,
  ) => {
    setFilterModel(draft => {
      const item = findItem(draft.conditions, condition.id, false);

      if ("colId" in item) {
        item.type = operator;
      }
    });
  };

  const handleDelete = () => {
    setFilterModel(draft => {
      const item = findItem(draft.conditions, condition.id, true);

      draft.conditions.splice(item.index, 1);
    });
  };

  return (
    <div className="flex items-center flex-row gap-x-2">
      <Minus className="w-6 h-6" onClick={handleDelete} />
      <Select onValueChange={handleColNameChange} value={condition.colId}>
        <SelectTrigger className="w-auto">
          <SelectValue placeholder="Select a Column" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {rowDefs.map(row => (
              <SelectItem key={row.colId} value={row.colId}>
                {row.colName}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={handleOperatorChange} value={condition.type}>
        <SelectTrigger className="w-auto">
          <SelectValue placeholder="Select a Operator" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {operator[condition.filterType].map(operatorType => (
              <SelectItem key={operatorType.value} value={operatorType.value}>
                {operatorType.text}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <FilterValue condition={condition} rowDefs={rowDefs} />
    </div>
  );
}
