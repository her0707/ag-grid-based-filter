import { FilterBuilder } from "@/components/filter-builder/FilterBuilder";

function App() {
  const rowDefs = [
    { colId: "make", colName: "make", colType: "text" },
    { colId: "model", colName: "model", colType: "text" },
    { colId: "price", colName: "price", colType: "number" },
  ] satisfies RowDefs[];

  return <FilterBuilder rowDefs={rowDefs} />;
}

export default App;
