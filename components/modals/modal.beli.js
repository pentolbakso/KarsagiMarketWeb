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
  Grid,
  List,
  Image,
  Divider,
  Input,
  Dropdown,
} from "semantic-ui-react";
import Link from "next/link";
import { useConnect } from "remx";
import { Formik } from "formik";
import * as Yup from "yup";
import uuid from "react-uuid";

import * as userActions from "../../stores/userActions";
import { currencyFormat, whatsappUrl } from "../../utils/format";
//import Router from "next/router";

const ItemToBuy = ({ item, options, onChange, onRemove }) => {
  function handleDropdownChange(e, data) {
    onChange({
      key: item.key,
      _id: data.value,
      qty: item.qty,
      price: item.price,
    });
  }

  function handleInputChange(e) {
    //console.log(e.target.value);
    onChange({
      key: item.key,
      _id: item._id,
      qty: e.target.value,
      price: item.price,
    });
  }

  return (
    <List.Item horizontal>
      <Input labelPosition="right" type="number" min="1">
        {/* <Label basic>Jumlah</Label> */}
        <input
          style={{ width: "5em" }}
          defaultValue={item.qty || 1}
          onChange={handleInputChange}
        />
        <Dropdown
          button
          basic
          floating
          options={options}
          defaultValue={item._id}
          onChange={handleDropdownChange}
        />
      </Input>
      <List.Content floated="right">
        <Button
          circular
          basic
          icon="close"
          color="red"
          size="mini"
          onClick={onRemove}
        />
      </List.Content>
    </List.Item>
  );
};

export default function ModalBuy({ product, ...props }) {
  //const { shop, products } = connect(props);
  const formRef = useRef();
  const [isSubmitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [productList, setProductList] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [buyingList, setBuyingList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Nama pembeli harap diisi"),
  });

  function handleSubmit() {
    if (buyingList.length == 0) {
      alert("Silahkan pilih minimal satu produk untuk dibeli");
      return;
    }

    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  }

  function handleAddItem() {
    if (productList.length == 0) {
      alert("Gagal load daftar barang! Silahkan coba refresh");
      return;
    }
    // select first item
    setBuyingList(
      buyingList.concat({
        key: uuid(),
        _id: productList[0]._id,
        qty: 1,
        name: productList[0].name,
        price: productList[0].price || 0,
      })
    );
  }

  function handleUpdateItem(item) {
    console.log("onUpdate", item);
    const newList = buyingList.map((b) => {
      if (b.key == item.key) {
        // get price
        let prod = productList.find((p) => p._id == item._id);
        return { ...item, price: prod.price || 0, name: prod.name };
      } else return b;
    });
    setBuyingList(newList);
  }

  function handleRemoveItem(key) {
    const newList = buyingList.filter((b) => b.key != key);
    setBuyingList(newList);
  }

  useEffect(() => {
    console.log(buyingList), [buyingList];
    let total = 0;
    buyingList.forEach((b) => (total = total + Number(b.qty) * b.price));
    setTotalAmount(total);
  });

  async function submitForm(values) {
    try {
      let items = "";
      buyingList.forEach((b) => {
        items = items + "\n" + b.qty + "x " + b.name;
      });

      setSubmitting(true);
      let message =
        "Bismillah," +
        "\nAna berminat untuk membeli barang berikut:" +
        "\n" +
        items +
        "\nTotal:" +
        currencyFormat(totalAmount) +
        "\n\n---" +
        "\nCatatan untuk Penjual: " +
        values.notes +
        "\n---" +
        "\nNama Pembeli: " +
        values.fullname +
        "\nAlamat:" +
        "\n\n" +
        values.address;
      setSubmitting(false);

      let WAnumber = product.store.wanumber || product.store.phonenumber;
      window.open(whatsappUrl(WAnumber, message));

      props.onClose(); //close modal
    } catch (err) {
      setSubmitting(false);
      setFormError(err.message);
    }
  }

  async function _getAllProducts() {
    try {
      const data = await userActions.getAllStoreProducts();
      setProductList(data);
      productsToOptions(data);
    } catch (err) {
      //
    } finally {
      //
    }
  }

  function productsToOptions(data) {
    const options = data
      //.filter((p) => p.isReadyStock)
      .map((p) => {
        return {
          key: p._id,
          value: p._id,
          text: `${p.name} - ${
            p.isReadyStock ? currencyFormat(p.price) : "Stok Kosong"
          }`,
        };
      });
    setProductOptions(options);
  }

  useEffect(() => {
    if (!props.open) {
      // onClose
      setBuyingList([]);
    } else {
      //onOpen
      setFormError(null);
      if (productList.length == 0) {
        _getAllProducts();
      }
      //initial item to buy
      setBuyingList(
        buyingList.concat({
          key: uuid(),
          _id: product._id,
          qty: 1,
          price: product.price || 0,
          name: product.name,
        })
      );
    }
  }, [props.open]);

  return (
    <Modal {...props}>
      {/* <Modal.Header>Form Beli</Modal.Header> */}
      <Modal.Content>
        <Header as="h4">Daftar barang yg akan dibeli</Header>
        <List verticalAlign="middle">
          {buyingList.map((item) => (
            <ItemToBuy
              key={item.key}
              item={item}
              options={productOptions}
              onChange={handleUpdateItem}
              onRemove={() => handleRemoveItem(item.key)}
            />
          ))}
        </List>
        <Button primary size="mini" onClick={handleAddItem}>
          <Icon name="plus" />
          Tambah
        </Button>
        <Header as="h3" color="orange">
          Total: {currencyFormat(totalAmount)}
        </Header>
        <Formik
          innerRef={formRef}
          initialValues={{
            fullname: "",
            address: "",
            notes: "",
          }}
          validationSchema={validationSchema}
          onSubmit={submitForm}
        >
          {(props) => (
            <Form error={formError != null}>
              <Form.Field>
                <Form.TextArea
                  label="Catatan untuk Penjual"
                  name="notes"
                  placeholder="Catatan jika ada"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.notes}
                  error={props.errors.notes}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Nama Pembeli (wajib diisi)"
                  name="fullname"
                  placeholder="misal: Abdullah"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.fullname}
                  error={props.errors.fullname}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Alamat pengiriman barang"
                  name="address"
                  placeholder="misal: Jl Anggrek 15, Cicadas, Bandung"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.address}
                  error={props.errors.address}
                />
              </Form.Field>
              <Message error header="Gagal" content={formError} />
            </Form>
          )}
        </Formik>
        <Message
          compact
          info
          header="Info"
          content="Mohon berikan alamat yg jelas agar Penjual bisa menghitung biaya ongkir jika ada. Biaya ini akan dikomunikasikan kepada Pembeli"
        />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={props.onClose}>Batal</Button>
        <Button
          type="submit"
          positive
          icon="whatsapp"
          labelPosition="right"
          content="Kirim Pesan"
          onClick={handleSubmit}
          loading={isSubmitting}
        />
      </Modal.Actions>
    </Modal>
  );
}
