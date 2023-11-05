import { useContext } from "react";
import { Plus } from "lucide-react";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { FilterContext } from "./FilterContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { generateUniqueId } from "@/utils/utils";

export default function JoinCondition() {
  const { setFilterModel, filterModel, rowDefs } = useContext(FilterContext);

  const handleChange = (e: "AND" | "OR") => {
    setFilterModel(draft => (draft.type = e));
  };

  const handleAddFilterRow = (type: "group" | "condition") => () => {
    switch (type) {
      case "group":
        setFilterModel(draft => {
          draft.conditions.push({
            id: generateUniqueId(),
            filterType: "join",
            type: "AND",
            parent: draft,
            level: draft.level + 1,
            conditions: [],
          });
        });
        break;

      case "condition":
        setFilterModel(draft =>
          draft.conditions.push({
            id: generateUniqueId(),
            filterType: "text",
            type: "equals",
            parent: draft,
            level: draft.level,
            colId: rowDefs[0].colId,
          }),
        );
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Select onValueChange={handleChange} value={filterModel.type}>
        <SelectTrigger className="w-auto">
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
          <DropdownMenuItem onClick={handleAddFilterRow("group")}>Add Group</DropdownMenuItem>
          <DropdownMenuItem onClick={handleAddFilterRow("condition")}>Add Condition</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
