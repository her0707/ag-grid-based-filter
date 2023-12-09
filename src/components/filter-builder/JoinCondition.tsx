import { useContext } from "react";
import { X, Plus } from "lucide-react";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { FilterContext } from "./FilterContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { findItem, generateUniqueId } from "@/utils/utils";
import FilterRowCondition from "./FilterRowCondition";

interface Props {
  condition?: JoinAdvancedFilterModel;
}

export default function JoinCondition({ condition }: Props) {
  const { setFilterModel, filterModel, rowDefs } = useContext(FilterContext);

  const handleChange = (e: "AND" | "OR") => {
    setFilterModel(draft => {
      if (!condition) {
        draft.type = e;
        return;
      }

      const item = findItem(draft.conditions, condition.id, false);
      if (item && !("colId" in item)) {
        item.type = e;
      }
    });
  };

  const handleAddFilterRow = (type: "group" | "condition") => () => {
    switch (type) {
      case "group":
        setFilterModel(draft => {
          if (condition) {
            const item = findItem(draft.conditions, condition.id, false);

            if (item && "conditions" in item) {
              item.conditions.unshift({
                id: generateUniqueId(),
                filterType: "join",
                type: "AND",
                parent: item,
                level: item.level + 1,
                conditions: [],
              });
            }
          } else {
            draft.conditions.push({
              id: generateUniqueId(),
              filterType: "join",
              type: "AND",
              parent: draft,
              level: draft.level,
              conditions: [],
            });
          }
        });
        break;

      case "condition":
        setFilterModel(draft => {
          if (condition) {
            const item = findItem(draft.conditions, condition.id, false);

            if (item && "conditions" in item) {
              item.conditions.unshift({
                id: generateUniqueId(),
                filterType: "text",
                type: "equals",
                parent: item,
                level: item.level + 1,
                colId: rowDefs[0].colId,
              });
            }
          } else {
            draft.conditions.push({
              id: generateUniqueId(),
              filterType: "text",
              type: "equals",
              parent: draft,
              level: draft.level,
              colId: rowDefs[0].colId,
            });
          }
        });
    }
  };

  const handleDelete = () => {
    if (!condition) return;

    setFilterModel(draft => {
      const item = findItem(draft.conditions, condition.id, true);

      if (!item || !item?.index) return;

      draft.conditions.splice(item.index, 1);
    });
  };

  const level = condition ? condition.level * 24 : 0;

  return (
    <>
      <div style={{ paddingLeft: level }} className="flex items-center gap-x-2">
        {condition && <X className="w-6 h-6" onClick={handleDelete} />}
        <Select onValueChange={handleChange} value={condition ? condition.type : filterModel.type}>
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
      {condition &&
        condition.conditions.map(condition => {
          if ("conditions" in condition) {
            return <JoinCondition condition={condition} key={condition.id} />;
          } else {
            return <FilterRowCondition condition={condition} key={condition.id} />;
          }
        })}
    </>
  );
}
