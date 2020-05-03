import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Form,
  Header,
  Segment,
  Button,
  Icon,
  Message,
  Divider,
  Label,
} from "semantic-ui-react";
import Head from "next/head";
import Router from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import { register } from "../stores/authActions";
import { whatsappUrl } from "../utils/format";
import { useConnect } from "remx";
import authStore from "../stores/authStore";
import * as sellerActions from "../stores/sellerActions";

export default function PesanKurir({ props }) {
  const { user } = connect(props);
  const [shop, setShop] = useState(null);
  const [formError, setFormError] = useState(null);

  const validationSchema = Yup.object().shape({
    description: Yup.string().required("Deskripsi harap diisi"),
    pickupAddress: Yup.string().required(
      "Alamat penjemputan barang harap diisi"
    ),
    senderName: Yup.string().required("Nama pengirim harap diisi"),
    recvAddress: Yup.string().required("Alamat tujuan harap diisi"),
    recvName: Yup.string().required("Nama penerima harap diisi"),
    recvPhonenumber: Yup.string()
      //.typeError("Nomor harus berupa angka")
      .matches(
        /^(^62){1}\d{8,13}$/gm,
        "Nomor telpon harus valid format & panjangnya! misal: 6281200001111"
      )
      .required("Nomor telpon harap di isi"),
  });

  async function submitForm(values, { setSubmitting }) {
    try {
      setSubmitting(true);
      //await register(storeTitle, fullname, phonenumber, email, password);

      let message =
        "Bismillah," +
        "\nAna butuh kurir untuk pengiriman sbb:" +
        "\n\nAlamat pickup: " +
        values.pickupAddress +
        "\nNama pemesan: " +
        values.senderName +
        "\nDeskripsi barang: " +
        values.description +
        "\n--->\nAlamat pengiriman: " +
        values.recvAddress +
        "\nNama penerima: " +
        values.recvName +
        "\nNomor telp penerima: " +
        values.recvPhonenumber;

      setSubmitting(false);

      const KURIR_MANAGER_PHONENUMBER = "628561155222";
      window.open(whatsappUrl(KURIR_MANAGER_PHONENUMBER, message));

      Router.push("/");
    } catch (err) {
      setSubmitting(false);
      setFormError(err.message);
    }
  }

  async function _getStore() {
    try {
      const data = await sellerActions.getStore();
      if (data.total > 0) {
        setShop(data.data[0]);
      }
    } catch (err) {
    } finally {
    }
  }

  useEffect(() => {
    if (user) _getStore();
  }, [user]);

  return (
    <>
      <Head>
        <title>{"Form Pesan Kurir | Karsagi Market"}</title>
      </Head>
      <Segment attached>
        <Message info>
          <Message.Header>Pesan Kurir di KarsagiMarket</Message.Header>
          <Message.List>
            <Message.Item>Jujur dan amanah</Message.Item>
            <Message.Item>
              Antum turut membantu para ikhwan yg bekerja menjadi Kurir
            </Message.Item>
          </Message.List>
        </Message>
        <Divider horizontal>
          <Label>Penjemputan</Label>
        </Divider>
        <Formik
          initialValues={{
            description: "",
            pickupAddress: (shop && shop.address) || "",
            senderName: user.fullname || "",
            recvAddress: "",
            recvName: "",
            recvPhonenumber: "",
          }}
          validationSchema={validationSchema}
          onSubmit={submitForm}
          enableReinitialize={true}
        >
          {(props) => (
            <Form error={formError != null}>
              <Form.Field>
                <Form.TextArea
                  label="Deskripsi barang (jumlah, berat, jenis, dsb)"
                  name="description"
                  placeholder="misal: 2 juz mangga, 1 juz durian"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.description}
                  error={props.errors.description}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Alamat penjemputan barang"
                  name="pickupAddress"
                  placeholder="misal: Jl. Antapani 55, Bandung"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.pickupAddress}
                  error={props.errors.pickupAddress}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Nama Pemesan / Pengirim"
                  name="senderName"
                  placeholder="misal: Mas Wanto / Toko Berkah Jaya"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.senderName}
                  error={props.errors.senderName}
                />
              </Form.Field>
              <Divider horizontal>
                <Label>Tujuan Pengiriman</Label>
              </Divider>
              <Form.Field>
                <Form.Input
                  label="Alamat pengiriman barang"
                  name="recvAddress"
                  placeholder="misal: Griya Caraka Blok A No 33, Arcamanik"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.recvAddress}
                  error={props.errors.recvAddress}
                />
              </Form.Field>
              <Form.Group widths={2}>
                <Form.Field>
                  <Form.Input
                    label="Nama Penerima"
                    name="recvName"
                    placeholder="misal: Abu Zaky"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.recvName}
                    error={props.errors.recvName}
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    label="Nomor handphone / Whatsapp"
                    name="recvPhonenumber"
                    placeholder="misal: 628xxx"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.recvPhonenumber}
                    error={props.errors.recvPhonenumber}
                  />
                </Form.Field>
              </Form.Group>
              <Message size="tiny" error header="Gagal" content={formError} />
              <p>
                Perkiraan ongkir akan dihitung oleh Kurir (berdasar jarak/waktu)
                lalu dikomunikasikan ke Pengirim.
              </p>
              <Button
                size="big"
                color="green"
                type="submit"
                onClick={props.handleSubmit}
                loading={props.isSubmitting}
              >
                <Icon name="whatsapp" />
                Kirim Pesan
              </Button>
            </Form>
          )}
        </Formik>
      </Segment>
    </>
  );
}

const connect = (props) =>
  useConnect(() => ({
    user: authStore.getUser(),
  }));
