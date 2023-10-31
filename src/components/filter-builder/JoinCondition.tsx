import { useContext } from "react";
import { Plus } from "lucide-react";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { FilterContext } from "./FilterContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function JoinCondition() {
  const { setFilterModel, filterModel } = useContext(FilterContext);

  const handleChange = (e: "AND" | "OR") => {
    setFilterModel(prev => ({
      ...prev,
      type: e,
    }));
  };

  const handleAddFilterRow = (type: "group" | "condition") => () => {
    switch (type) {
      case "group":
        setFilterModel(prev => ({
          ...prev,
          conditions: [...prev.conditions, { filterType: "join", type: "AND", level: prev.level + 1, conditions: [] }],
        }));
        break;

      case "condition":
        setFilterModel(prev => ({
          ...prev,
          conditions: [...prev.conditions, { filterType: "text", type: "equals", level: prev.level, colId: "" }],
        }));
    }
  };

  return (
    <div className="flex justify-center items-center gap-x-2">
      <Select onValueChange={handleChange} value={filterModel.type}>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="AND">And</SelectItem>
            <SelectItem value="OR">Or</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Plus />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem >Add Group</DropdownMenuItem>
          <DropdownMenuItem>Add Condition</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
