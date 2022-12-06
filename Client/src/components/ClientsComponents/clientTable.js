import { useEffect, useState } from "react";
import { Constants } from "../../constants";
import axios from "axios";
//import { Client } from "../models/client";
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from "react-crud-table";
import "./table.css";

export const ClientTable = () => {
  const [client, setClients] = useState([]);

  useEffect(() => {
    axios
      .get(Constants.SERVER_URL + Constants.CONTROLLER_CLIENT)
      .then((res) => {
        console.log("Data cargada", res.data);
        setClients(res.data);
      });
  }, []);
  let clientes = client.map((data, index) => {
    return (
      <>
        {data.id},{data.name}
      </>
    );
  });
  let clients = { clientes };

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
      client.name = data.name;
      client.telephone = data.telephone;
      client.email = data.email;
      client.address = data.address;
      client.postalCode = data.postalCode;
      client.city = data.city;
      client.province = data.province;
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
    if (!values.name) {
      errors.name = "Please, provide client's name";
    }

    if (!values.telephone) {
      errors.telephone = "Please, provide client's telephone";
    }
    if (!values.address) {
      errors.address = "Please, provide client's address";
    }

    if (!values.postalCode) {
      errors.postalCode = "Please, provide client's postal code";
    }
    if (!values.email) {
      errors.email = "Please, provide client's email";
    }

    if (!values.city) {
      errors.city = "Please, provide client's city";
    }
    if (!values.province) {
      errors.province = "Please, provide client's province";
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
          <Field name="name" label="Name" placeholder="Name" />
          <Field name="telephone" label="Telephone" placeholder="123456789" />
          <Field name="email" label="Email" placeholder="mail@mail.com" />
          <Field name="address" label="Address" placeholder="address" />
          <Field name="postalCode" label="Postal Codel" placeholder="XXX XXX" />
          <Field name="city" label="City" placeholder="City" />
          <Field name="province" label="Province" placeholder="Province" />
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
}; */
