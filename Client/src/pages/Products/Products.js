import {React, useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from "react-crud-table";
import "../../components/table.css";
import { Product } from '../../models/product';
import axios from 'axios';
import { Constants } from '../../constants';

export const Products = () => {
  
  let [productItems, setItems] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  
  useEffect(() => {
     const getProducts = async () => await axios.get(Constants.SERVER_URL + Constants.CONTROLLER_PRODUCT);

      getProducts().then(resp => {
      if (resp.data) {
        setItems(resp.data);
      }
    });
  }, [])


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

  let count = productItems.length;
  const service = {
    fetchItems: (payload) => {
      let result = Array.from(productItems);
      result = result.sort(getSorter(payload.sort));
      return Promise.resolve(result);
    },
    create: (product) => {
      count += 1;
      productItems.push({
        ...product,
        id: count,
      });
      return Promise.resolve(product);
    },
    update: async (data) => {
      const product = productItems.find((t) => t.id === data.id);
      await axios.put(Constants.SERVER_URL + Constants.CONTROLLER_PRODUCT, data)
      .then((resp)=>{
        if(resp.data.status==="success"){
          product._id=data._id;
          product.name = data.name;
          product.quantity = data.quantity;
          product.category = data.category;
          product.location = data.location;
          product.price = data.price;
          productItems = productItems.filter((t) => t._id !== product._id)
        }   
    });
      return Promise.resolve(product);
    },
    delete: async (data) => {
      const product = productItems.find((t) => t._id === data._id);
      await axios.delete(Constants.SERVER_URL + Constants.CONTROLLER_PRODUCT, { data: {_id: data._id}})
      .then((resp)=>{
        if(resp.data.status==="success")
          productItems = productItems.filter((t) => t._id !== product._id)
    });
      return Promise.resolve(product);
    },
  };

  const styles = {
    container: { margin: "auto", width: "fit-content" },
  };

  const validation = (values) => {
    const errors = {};
    if (!values.Name) {
      errors.Name = "Please, provide product's name";
    }

    if (!values.Quantity) {
      errors.Quantity = "Please, provide product's quantity";
    }
    if (!values.Category) {
      errors.Category = "Please, provide product's category";
    }

    if (!values.Location) {
      errors.Location = "Please, provide product's location";
    }
    if (!values.Price) {
      errors.Price = "Please, provide product's price";
    }

    return errors;
  };

  return (
    <div style={styles.container}>
      {productItems?.length > 0 &&
      <CRUDTable
        caption="Products"
        fetchItems={(payload) => service.fetchItems(payload)}
      >
        <Fields>
          <Field name="id" label="Id" hideInCreateForm hideInUpdateForm />
          <Field name="name" label="Name" placeholder="Name" />
          <Field name="quantity" label="Quantity" placeholder="123456789" />
          <Field name="category" label="Category" placeholder="Category" />
          <Field name="location" label="Location" placeholder="Location" />
          <Field name="price" label="Price" placeholder="00.00" />
        </Fields>
        <CreateForm
          title="New Product"
          message="Add a new Product"
          trigger="Add Product"
          onSubmit={(product) => service.create(product)}
          submitText="ADD"
          validate={validation}
        />

        <UpdateForm
          title="Product Update"
          message="Update Product"
          trigger="Update"
          onSubmit={(product) =>{service.update(product); window.location.reload();}}
          submitText="Update"
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.id = "Please, provide name";
            }
            return errors;}}
        />

        <DeleteForm
          title="Product Delete"
          message="Are you sure you want to delete this Product"
          trigger="Delete"
          onSubmit={(product) => {service.delete(product); window.location.reload();}}
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
      }
    </div>
  );
};



