import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import {
  Modal,
  Header,
  Segment,
  Button,
  Icon,
  Menu,
  Item,
  Label,
  Form,
  Message,
} from "semantic-ui-react";
import Head from "next/head";
import Link from "next/link";
import { useConnect } from "remx";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";

// import sellerStore from "../../stores/sellerStore";
import * as sellerActions from "../../stores/sellerActions";

export default function ModalProduct({ product, ...props }) {
  //const { shop, products } = connect(props);
  const formRef = useRef();
  const [formError, setFormError] = useState(null);
  const [readyStock, setReadyStock] = useState(true);
  const [isPromo, setIsPromo] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Nama barang harap diisi"),
    price: Yup.number()
      .typeError("Harga harus berupa angka")
      .required("Harga barang harap diisi"),
    weight: Yup.number().typeError("Berat harus berupa angka"),
  });

  function handleSubmit() {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  }

  async function submitForm(values, { setSubmitting }) {
    try {
      values.isReadyStock = readyStock;
      values.isPromoPrice = isPromo;
      setSubmitting(true);
      if (product._id) await sellerActions.updateProduct(product._id, values);
      else await sellerActions.createProduct(values);
      setSubmitting(false);

      props.onClose(); //close modal
    } catch (err) {
      setSubmitting(false);
      setFormError(err.message);
    }
  }

  useEffect(() => {
    setReadyStock(
      product.isReadyStock == undefined ? true : product.isReadyStock
    );
    setIsPromo(!!product.isPromoPrice);
  }, [product]);

  return (
    <Modal {...props}>
      {/* <Modal.Header>Tambah</Modal.Header> */}
      <Modal.Content>
        {product._id && <p>ID: {product._id}</p>}
        <Formik
          innerRef={formRef}
          initialValues={{
            name: product.name,
            description: product.description,
            price: product.price,
            weight: product.weight,
            notes: product.notes,
          }}
          validationSchema={validationSchema}
          onSubmit={submitForm}
        >
          {(props) => (
            <Form error={formError != null}>
              <Form.Field>
                <Label color={readyStock ? "green" : "red"}>
                  <Form.Checkbox
                    label="Stok READY!"
                    checked={readyStock}
                    onChange={() => setReadyStock(!readyStock)}
                  />
                </Label>
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Nama Barang"
                  name="name"
                  placeholder="misal: Madu Majalengka ORI"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.name}
                  error={props.errors.name}
                />
              </Form.Field>
              <Form.Field>
                <Form.TextArea
                  label="Deskripsi "
                  name="description"
                  placeholder="Penjelasan singkat mengenai barang, jumlah stok, akad jual beli, harga khusus grosir, garansi, dsb"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.description}
                  error={props.errors.description}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Harga (Rp)"
                  name="price"
                  placeholder="misal: 25000"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.price}
                  error={props.errors.price}
                />
              </Form.Field>
              <Form.Field>
                <Form.Checkbox
                  label="Harga diatas adalah harga PROMO (atau sedang discount)"
                  checked={isPromo}
                  onChange={() => setIsPromo(!isPromo)}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Berat (gram)"
                  name="weight"
                  placeholder="Bebas, diisi atau tidak"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.weight}
                  error={props.errors.weight}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Catatan"
                  name="notes"
                  placeholder="Catatan utk calon pembeli (jika ada)"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.notes}
                  error={props.errors.notes}
                />
              </Form.Field>
              <Message error header="Gagal" content={formError} />
            </Form>
          )}
        </Formik>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={props.onClose}>Batal</Button>
        <Button
          type="submit"
          positive
          icon="checkmark"
          labelPosition="right"
          content="Tambah"
          onClick={handleSubmit}
          loading={formRef.current && formRef.current.isSubmitting}
        />
      </Modal.Actions>
    </Modal>
  );
}

const connect = (props) =>
  useConnect(() => ({
    // shop: sellerStore.getShop(),
    // products: sellerStore.getProducts(),
  }));
