/*import { useTable, useSortBy, usePagination } from "react-table";
import useRows from "./rowsClients";
import useColumns from "./columsClient";


export const ClientTable = () => {
  const columns = useColumns();
  const data = useRows();
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
*/
import React from "react";
import ReactDOM from "react-dom";
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from "react-crud-table";
import "./table.css";

export const ClientTable = () => {
  let clients = [
    {
      id: "1",
      Name: "Felipe",
      Telephone: "6479014847",
      Email: "felipe961031@gmail.com",
      Address: "1484 Torrington",
      PostalCode: "L5V",
      City: "Mississsauga",
      Province: "ON",
    },
    {
      id: "2",
      Name: "Deiby",
      Telephone: "00014455",
      Email: "deiby@gmail.com",
      Address: "1484 pronvincial rd",
      PostalCode: "L3A",
      City: "Mississsauga",
      Province: "ON",
    },
  ];

  const SORTERS = {
    NUMBER_ASCENDING: (mapper) => (a, b) => mapper(a) - mapper(b),
    NUMBER_DESCENDING: (mapper) => (a, b) => mapper(b) - mapper(a),
    STRING_ASCENDING: (mapper) => (a, b) => mapper(a).localeCompare(mapper(b)),
    STRING_DESCENDING: (mapper) => (a, b) => mapper(b).localeCompare(mapper(a)),
  };

  const getSorter = (data) => {
    const mapper = (x) => x[data.field];
    let sorter = SORTERS.STRING_ASCENDING(mapper);

    if (data.field === "id") {
      sorter =
        data.direction === "ascending"
          ? SORTERS.NUMBER_ASCENDING(mapper)
          : SORTERS.NUMBER_DESCENDING(mapper);
    } else {
      sorter =
        data.direction === "ascending"
          ? SORTERS.STRING_ASCENDING(mapper)
          : SORTERS.STRING_DESCENDING(mapper);
    }

    return sorter;
  };

  let count = clients.length;
  const service = {
    fetchItems: (payload) => {
      let result = Array.from(clients);
      result = result.sort(getSorter(payload.sort));
      return Promise.resolve(result);
    },
    create: (client) => {
      count += 1;
      clients.push({
        ...client,
        id: count,
      });
      return Promise.resolve(client);
    },
    update: (data) => {
      const client = clients.find((t) => t.id === data.id);
      client.Name = data.Name;
      client.Telephone = data.Telephone;
      client.Email = data.Email;
      client.Address = data.Address;
      client.PostalCode = data.PostalCode;
      client.City = data.City;
      client.Province = data.Province;
      return Promise.resolve(client);
    },
    delete: (data) => {
      const client = clients.find((t) => t.id === data.id);
      clients = clients.filter((t) => t.id !== client.id);
      return Promise.resolve(client);
    },
  };

  const styles = {
    container: { margin: "auto", width: "fit-content" },
  };

  const validation = (values) => {
    const errors = {};
    if (!values.Name) {
      errors.Name = "Please, provide client's name";
    }

    if (!values.Telephone) {
      errors.Telephone = "Please, provide client's telephone";
    }
    if (!values.Address) {
      errors.Address = "Please, provide client's address";
    }

    if (!values.PostalCode) {
      errors.PostalCode = "Please, provide client's postal code";
    }
    if (!values.Email) {
      errors.Email = "Please, provide client's email";
    }

    if (!values.City) {
      errors.City = "Please, provide client's city";
    }
    if (!values.Province) {
      errors.Province = "Please, provide client's province";
    }

    return errors;
  };

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="Clients"
        fetchItems={(payload) => service.fetchItems(payload)}
      >
        <Fields>
          <Field name="id" label="Id" hideInCreateForm hideInUpdateForm />
          <Field name="Name" label="Name" placeholder="Name" />
          <Field name="Telephone" label="Telephone" placeholder="123456789" />
          <Field name="Email" label="Email" placeholder="mail@mail.com" />
          <Field name="Address" label="Address" placeholder="address" />
          <Field name="PostalCode" label="Postal Codel" placeholder="XXX XXX" />
          <Field name="City" label="City" placeholder="City" />
          <Field name="Province" label="Province" placeholder="Province" />
        </Fields>
        <CreateForm
          title="New Client"
          message="Add a new Client"
          trigger="Add Client"
          onSubmit={(client) => service.create(client)}
          submitText="ADD"
          validate={validation}
        />

        <UpdateForm
          title="Client Update"
          message="Update Client"
          trigger="Update"
          onSubmit={(client) => service.update(client)}
          submitText="Update"
          validate={validation}
        />

        <DeleteForm
          title="Client Delete"
          message="Are you sure you want to delete this Client"
          trigger="Delete"
          onSubmit={(client) => service.delete(client)}
          submitText="Delete"
          validate={(values) => {
            const errors = {};
            if (!values.id) {
              errors.id = "Please, provide id";
            }
            return errors;
          }}
        />
      </CRUDTable>
    </div>
  );
};
