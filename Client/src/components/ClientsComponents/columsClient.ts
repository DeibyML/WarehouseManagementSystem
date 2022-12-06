import { useMemo } from "react";

export default function useColumns() {
  const columns = useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
      },
      {
        Header: "name",
        accessor: "name",
      },
      {
        Header: "telephone",
        accessor: "telephone",
      },
      {
        Header: "email",
        accessor: "email",
      },
      {
        Header: "address",
        accessor: "address",
      },
      {
        Header: "postalCode",
        accessor: "postalCode",
      },
      {
        Header: "city",
        accessor: "city",
      },
      {
        Header: "province",
        accessor: "province",
      },
    ],
    []
  );

  return columns;
}
