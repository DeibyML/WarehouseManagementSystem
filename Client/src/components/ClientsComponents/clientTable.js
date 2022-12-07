import { useEffect, useState } from "react";
import { Constants } from "../../constants";
import axios from "axios";

import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from "react-crud-table";
import "../table.css";

export const ClientTable = () => {
  const servidor = Constants.SERVER_URL + Constants.CONTROLLER_CLIENT;
  let [clients, setClients] = useState([]);

  //Get Customers from Server
  useEffect(() => {
    const resp = async () => await axios.get(servidor);
    resp().then((res) => setClients(res.data));
  }, []);

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
    create: async (client) => {
      try {
        // Assing new Id random
        let newId = Math.floor(Math.random() * 1000);

        // In case to be able to calculate next id, it adds +1 from the last item.
        if (!!Number(clients[clients.length - 1]?.id)) {
          newId = Number(clients[clients.length - 1]?.id) + 1;
        }
        client.id = newId;
        await axios.post(servidor, client).then(() => {
          clients.push({
            ...client,
          });
        });
      } catch (error) {
        console.error(error.response.data);
      }

      return Promise.resolve(client);
    },
    update: async (data) => {
      const client = clients.find((t) => t.id === data.id);
      await axios.put(servidor, data).then(() => {
        client.name = data.name;
        client.telephone = data.telephone;
        client.email = data.email;
        client.address = data.address;
        client.postalCode = data.postalCode;
        client.city = data.city;
        client.province = data.province;
      });

      return Promise.resolve(client);
    },
    delete: async (data) => {
      const client = clients.find((t) => t.id === data.id);
      clients = clients.filter((t) => t._id !== client._id);
      await axios.delete(servidor, { data: { _id: data._id } }).then((resp) => {
        console.log("Server response: " + resp.message);
      });

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
      {clients?.length > 0 && (
        <CRUDTable
          caption="Clients"
          fetchItems={(payload) => service.fetchItems(payload)}
        >
          <Fields>
            <Field name="id" label="Id" hideInUpdateForm hideInCreateForm />
            <Field name="name" label="Name" placeholder="Name" />
            <Field name="telephone" label="Telephone" placeholder="123456789" />
            <Field name="email" label="Email" placeholder="mail@mail.com" />
            <Field name="address" label="Address" placeholder="address" />
            <Field
              name="postalCode"
              label="Postal Codel"
              placeholder="XXX XXX"
            />
            <Field name="city" label="City" placeholder="City" />
            <Field name="province" label="Province" placeholder="Province" />
          </Fields>

          <CreateForm
            title="New Product"
            message="Add a new Product"
            trigger="Add Product"
            onSubmit={(product) => {
              service.create(product);
              window.location.reload();
            }}
            submitText="ADD"
            validate={validation}
          />
          <UpdateForm
            title="Client Update"
            message="Update Client"
            trigger="Update"
            onSubmit={(client) => {
              service.update(client);
              window.location.reload();
            }}
            submitText="Update"
            validate={validation}
          />

          <DeleteForm
            title="Client Delete"
            message="Are you sure you want to delete this Client"
            trigger="Delete"
            onSubmit={(client) => {
              service.delete(client);
              window.location.reload();
            }}
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
      )}
    </div>
  );
};
