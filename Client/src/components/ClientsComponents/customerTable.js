import { useTable, useSortBy, usePagination } from "react-table";
import axios from "axios";
import useColumns from "./columsClient";
import { useEffect, useState } from "react";
import { Constants } from "../../constants";
//import useRows from "./rowsClients";

export const CustomerTable = () => {
  const [client, setData] = useState([]);

  const columns = useColumns();
  ``;
  useEffect(() => {
    axios
      .get(Constants.SERVER_URL + Constants.CONTROLLER_CLIENT)
      .then((res) => {
        console.log("Data cargada", res.data);
        setData(res.data);
      });
  }, []);
  const rows = client.map((data, index) => {
    return (
      <>
        {data.id},{data.name}
      </>
    );
  });
  const data = { rows };

  const table = useTable({ columns, data }, useSortBy, usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
  } = table;
  return (
    <>
      <table {...getTableProps}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "desc"
                        : "asc"
                      : ""
                  }
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </>
  );
};
