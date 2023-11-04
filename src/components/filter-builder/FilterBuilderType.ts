type AdvancedFilterModel = JoinAdvancedFilterModel | ColumnAdvancedFilterModel;

type FilterType = "text" | "number" | "boolean" | "date" | "dateString" | "object";

interface JoinAdvancedFilterModel {
  filterType: "join";
  type: "AND" | "OR";
  level: number;
  id: string;
  parent?: JoinAdvancedFilterModel;
  conditions: AdvancedFilterModel[];
}

type ColumnAdvancedFilterModel =
  | TextAdvancedFilterModel
  | NumberAdvancedFilterModel
  | BooleanAdvancedFilterModel
  | DateAdvancedFilterModel
  | DateStringAdvancedFilterModel
  | ObjectAdvancedFilterModel;

interface BaseFilterModel {
  colId: string;
  id: string;
  parent?: JoinAdvancedFilterModel;
  level: number;
}

interface TextAdvancedFilterModel extends BaseFilterModel {
  filterType: "text";
  type: TextAdvancedFilterModelType;
  filter?: string;
}

type TextAdvancedFilterModelType =
  | "equals"
  | "notEqual"
  | "contains"
  | "notContains"
  | "startsWith"
  | "endsWith"
  | "blank"
  | "notBlank";

interface NumberAdvancedFilterModel extends BaseFilterModel {
  filterType: "number";
  type: ScalarAdvancedFilterModelType;
  filter?: number;
}

type ScalarAdvancedFilterModelType =
  | "equals"
  | "notEqual"
  | "lessThan"
  | "lessThanOrEqual"
  | "greaterThan"
  | "greaterThanOrEqual"
  | "blank"
  | "notBlank";

interface BooleanAdvancedFilterModel extends BaseFilterModel {
  filterType: "boolean";
  type: BooleanAdvancedFilterModelType;
}

type BooleanAdvancedFilterModelType = "true" | "false";

interface DateAdvancedFilterModel extends BaseFilterModel {
  filterType: "date";
  type: ScalarAdvancedFilterModelType;
  filter?: string;
}

interface DateStringAdvancedFilterModel extends BaseFilterModel {
  filterType: "dateString";
  type: ScalarAdvancedFilterModelType;
  filter?: string;
}

interface ObjectAdvancedFilterModel extends BaseFilterModel {
  filterType: "object";
  type: TextAdvancedFilterModelType;
  filter?: string;
}

interface RowDefs {
  colId: string;
  colName: string;
  filterValues?: { text: string; value: string }[];
  colType: FilterType;
}
