import { FilterBuilder } from "@/components/filter-builder/FilterBuilder";

function App() {
  const rowDefs = [
    { colId: "make", colName: "make", colType: "text" },
    { colId: "model", colName: "model", colType: "text" },
    { colId: "price", colName: "price", colType: "number" },
    {
      colId: "country",
      colName: "country",
      colType: "text",
      filterValues: [
        { text: "한국", value: "korea" },
        { text: "일본", value: "japan" },
        { text: "미국", value: "usa" },
      ],
    },
  ] satisfies RowDefs[];

  return <FilterBuilder rowDefs={rowDefs} />;
}

export default App;
