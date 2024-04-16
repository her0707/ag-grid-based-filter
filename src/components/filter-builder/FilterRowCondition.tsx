import { ChangeEvent, useContext } from "react";
import { X } from "lucide-react";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { FilterContext } from "./FilterContext";
import { deleteItem, findItem } from "@/utils/utils";
import { operator } from "../constants/filter";
import { Input } from "../ui/input";
import { DatePicker } from "../ui/date-picker";

interface Props {
  condition: ColumnAdvancedFilterModel;
}

const FilterValue = ({ condition }: Props) => {
  const { setFilterModel, rowDefs } = useContext(FilterContext);

  const row = rowDefs.find(row => row.colId === condition.colId);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterModel(draft => {
      const item = findItem(draft.conditions, condition.id, false);
      if (!item || !item?.index) return;

      if (item.filterType === "text") {
        item.filter = e.target.value;
      }
    });
  };

  const onSelectChange = (value: string) => {
    setFilterModel(draft => {
      const item = findItem(draft.conditions, condition.id, false);

      if (!item || !item?.index) return;

      if (item.filterType === "text") {
        item.filter = value;
      }
    });
  };

  if (condition.filterType === "boolean") {
    return <></>;
  } else if (condition.filterType === "text" && row && "filterValues" in row) {
    return (
      <Select onValueChange={onSelectChange} value={condition.filter}>
        <SelectTrigger className="w-auto">
          <SelectValue placeholder="Select a Value" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {row.filterValues?.map(item => (
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
    return <Input className="w-auto" onChange={onChange} />;
  }
};

export default function FilterRowCondition({ condition }: Props) {
  const { setFilterModel, filterModel, rowDefs } = useContext(FilterContext);

  const handleColNameChange = (e: string) => {
    setFilterModel(draft => {
      const item = findItem(draft.conditions, condition.id, false);

      if (item && "colId" in item) {
        const row = rowDefs.find(row => row.colId === e);

        if (!row) return;

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

      if (item && "colId" in item) {
        item.type = operator;
      }
    });
  };

  const handleDelete = () => {
    setFilterModel(draft => {
      const item = findItem(draft.conditions, condition.id, true);

      if (!item) return;

      deleteItem(draft.conditions, condition.id);
    });
  };

  const level = condition ? condition.level * 24 : 0;

  return (
    <div style={{ paddingLeft: level }} className="flex items-center flex-row gap-x-2">
      <X className="w-6 h-6" onClick={handleDelete} />
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

      <FilterValue condition={condition} />
    </div>
  );
}
