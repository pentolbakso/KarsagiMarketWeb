import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Container,
  Header,
  Segment,
  Button,
  Icon,
  Form,
  Message,
} from "semantic-ui-react";
import Head from "next/head";
import Link from "next/link";
import PageContainer from "../../components/PageContainer";
import Navbar from "../../components/Navbar";
import { useConnect } from "remx";
import { Formik } from "formik";
import * as Yup from "yup";
import Router from "next/router";
import GoogleMapReact from "google-map-react";
import * as sellerActions from "../../stores/sellerActions";
import sellerStore, { getShop } from "../../stores/sellerStore";

export default function EditToko(props) {
  const { shop } = connect(props);
  const [formError, setFormError] = useState(null);
  let initialCenter = { lat: -6.919541, lng: 107.607229 };
  if (shop && shop.location)
    initialCenter = {
      lat: shop.location.coordinates[0],
      lng: shop.location.coordinates[1],
    };
  const [center, setCenter] = useState(initialCenter);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(6, "Panjang karakter minimal 6")
      .required("Nama toko harap diisi (minimal 6 karakter)"),
    phonenumber: Yup.number()
      .typeError("Nomor harus berupa angka")
      .required("Nomor telpon harap di isi"),
    wanumber: Yup.string().typeError("Nomor harus berupa angka"),
    address: Yup.string().required("Alamat lengkap toko harap diisi"),
  });

  async function submitForm(values, { setSubmitting }) {
    try {
      values.location = {
        type: "Point",
        coordinates: [center.lat, center.lng],
      };
      setSubmitting(true);
      await sellerActions.updateStore(values);
      setSubmitting(false);

      Router.replace("/penjual/tokosaya");
    } catch (err) {
      setSubmitting(false);
      setFormError(err.message);
    }
  }

  const handleApiLoaded = (map, maps) => {};

  useEffect(() => {
    // TODO: check if HTTPS is installed, otherwise it wont work
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        function (error) {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    }
  }, []);

  return (
    <PageContainer>
      <Head>
        <title>Karsagi Market</title>
      </Head>
      <Navbar />
      <Segment>
        <Header as="h3">Edit Toko</Header>
        <Formik
          initialValues={{
            title: shop.title,
            description: shop.description,
            phonenumber: shop.phonenumber,
            wanumber: shop.wanumber,
            address: shop.address,
          }}
          validationSchema={validationSchema}
          onSubmit={submitForm}
        >
          {(props) => (
            <Form error={formError != null}>
              <Form.Field>
                <Form.Input
                  label="Nama Toko"
                  name="title"
                  placeholder="misal: Toko Berkah Jaya"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.title}
                  error={props.errors.title}
                />
              </Form.Field>
              <Form.Field>
                <Form.TextArea
                  label="Deskripsi Toko"
                  name="description"
                  placeholder="Penjelasan singkat tentang toko dan barang-barang yg dijual"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.description}
                  error={props.errors.description}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Nomor Telpon"
                  name="phonenumber"
                  placeholder="628xx"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.phonenumber}
                  error={props.errors.phonenumber}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Nomor WhatsApp"
                  name="wanumber"
                  placeholder="628xx"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.wanumber}
                  error={props.errors.wanumber}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Alamat Toko (untuk pengambilan barang oleh Kurir)"
                  name="address"
                  placeholder="misal: Komplek Griya Caraka Block A-2, Arcamanik"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.address}
                  error={props.errors.address}
                />
              </Form.Field>
              <Message>
                <Message.Header>
                  Pilih lokasi alamat toko anda pada peta:
                </Message.Header>
                <p>
                  Geser peta sehingga PIN KUNING tepat berada di bawah lokasi
                  toko/rumah anda. Untuk lebih akurat dalam penentuan posisi,
                  gunakan fungsi Zoom +/-.
                  <br />
                  Afwan kalau petanya tidak sempurna karena ada keterbatasan dgn
                  Google
                </p>
              </Message>
              <div
                style={{ height: "40vh", width: "100%", marginBottom: "1em" }}
              >
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: "AIzaSyD3SgMhlUOsv3ZaZWmVCFWE01Ap67FK8Ig",
                  }}
                  defaultCenter={initialCenter}
                  defaultZoom={15}
                  yesIWantToUseGoogleMapApiInternals={true}
                  onGoogleApiLoaded={({ map, maps }) =>
                    handleApiLoaded(map, maps)
                  }
                  onChange={(coord) => {
                    //console.log(coord.center);
                    setCenter(coord.center);
                  }}
                >
                  <Icon
                    //lat={center.lat}
                    //lng={center.lng}
                    name="target"
                    size="big"
                    color="yellow"
                    circular
                  />
                </GoogleMapReact>
              </div>
              <p>Koordinat terpilih: {`${center.lat},${center.lng}`}</p>
              <Message error header="Gagal" content={formError} />
              <Button
                primary
                type="submit"
                size="big"
                onClick={props.handleSubmit}
                loading={props.isSubmitting}
              >
                Update
              </Button>
            </Form>
          )}
        </Formik>
      </Segment>
    </PageContainer>
  );
}

const connect = (props) =>
  useConnect(() => ({
    shop: sellerStore.getShop(),
  }));
