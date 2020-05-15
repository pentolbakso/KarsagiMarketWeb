import React, { useState, useEffect } from "react";
import { Message } from "semantic-ui-react";
import Router from "next/router";
import * as Yup from "yup";
import { whatsappUrl } from "../utils/format";
import { useConnect } from "remx";
import authStore from "../stores/authStore";
import * as sellerActions from "../stores/sellerActions";
import { event } from "../lib/gtag";
import { NextSeo } from "next-seo";

export default function PesanKurir({ props }) {
  const { user } = connect(props);
  const [, setShop] = useState(null);
  const [, setFormError] = useState(null);

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
      <NextSeo title="Pesan Kurir" />
      <Message info>
        <Message.Header>Pesan Kurir di KarsagiMarket</Message.Header>
        <Message.Content>
          Fitur ini masih dalam pengembangan. Mohon sabar menunggu. Barakallahu
          fiikum.
        </Message.Content>
      </Message>

      {/* <Segment attached>
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
            senderName: (user && user.fullname) || "",
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
      </Segment> */}
    </>
  );
}

const connect = () =>
  useConnect(() => ({
    user: authStore.getUser(),
  }));
