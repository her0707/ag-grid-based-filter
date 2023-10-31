import { useContext } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { FilterContext } from "./FilterContext";

interface Props {
  rowDefs: RowDefs[];
}

export default function FilterRow({ rowDefs }: Props) {
  const { setFilterModel, filterModel } = useContext(FilterContext);

  const handleColNameChange = (e: string) => {};

  return (
    <Select onValueChange={handleColNameChange} value={filterModel.type}>
      <SelectTrigger>
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
  );
}
