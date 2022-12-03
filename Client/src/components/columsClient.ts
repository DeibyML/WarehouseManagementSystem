import { useMemo } from "react";

export default function useColumns() {
  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "Id",
      },
      {
        Header: "Name",
        accessor: "Name",
      },
      {
        Header: "Telephone",
        accessor: "Telephone",
      },
      {
        Header: "Email",
        accessor: "Email",
      },
      {
        Header: "Address",
        accessor: "Address",
      },
      {
        Header: "Postal Code",
        accessor: "PostalCode",
      },
      {
        Header: "City",
        accessor: "City",
      },
      {
        Header: "Provice",
        accessor: "Province",
      },
    ],
    []
  );

  return columns;
}
