import React, { useState } from "react";
import styled from "styled-components";
import {
  Form,
  Header,
  Segment,
  Button,
  Checkbox,
  Message,
  Divider,
} from "semantic-ui-react";
import Head from "next/head";
import Router from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import { register } from "../../stores/authActions";

export default function About() {
  const [formError, setFormError] = useState(null);

  const validationSchema = Yup.object().shape({
    storeTitle: Yup.string()
      .min(6, "Panjang karakter minimal 6")
      .required("Nama toko harap diisi (minimal 6 karakter)"),
    fullname: Yup.string().required("Nama lengkap harap diisi"),
    phonenumber: Yup.string()
      //.typeError("Nomor harus berupa angka")
      .matches(
        /^(^62){1}\d{8,13}$/gm,
        "Nomor telpon harus valid format & panjangnya! misal: 6281200001111"
      )
      .required("Nomor telpon harap di isi"),
    email: Yup.string()
      .email("Alamat email tidak valid")
      .required("Email harap diisi"),
    password: Yup.string()
      .min(6, "Panjang karakter minimal 6")
      .required("Password harap diisi"),
  });

  async function submitForm(values, { setSubmitting }) {
    try {
      setSubmitting(true);
      const { storeTitle, fullname, phonenumber, email, password } = values;
      await register(storeTitle, fullname, phonenumber, email, password);
      setSubmitting(false);

      Router.push("/penjual/tokosaya");
    } catch (err) {
      setSubmitting(false);
      setFormError(err.message);
    }
  }

  return (
    <>
      <Head>
        <title>{"Form Pendaftaran Penjual Karsagi Market"}</title>
      </Head>

      <Segment attached="top" tertiary>
        <Header as="h3">Buka Toko Online</Header>
      </Segment>
      <Segment attached>
        <Formik
          initialValues={{
            storeTitle: "",
            fullname: "",
            phonenumber: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={submitForm}
        >
          {(props) => (
            <Form
              size="big"
              warning={formError == null}
              error={formError != null}
            >
              <Form.Field>
                <Form.Input
                  label="Nama Toko"
                  name="storeTitle"
                  placeholder="misal: Toko Berkah Jaya"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.storeTitle}
                  error={props.errors.storeTitle}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Nama Penjual"
                  name="fullname"
                  placeholder="Nama lengkap penjual"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.fullname}
                  error={props.errors.fullname}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Nomor handphone / Whatsapp"
                  name="phonenumber"
                  placeholder="misal: 628xxx"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.phonenumber}
                  error={props.errors.phonenumber}
                />
              </Form.Field>
              <Divider horizontal>Untuk Login</Divider>
              <Form.Field>
                <Form.Input
                  label="Email"
                  name="email"
                  placeholder="Alamat email untuk Login"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.email}
                  error={props.errors.email}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Password"
                  name="password"
                  placeholder="Password (minimal 6 karakter)"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.password}
                  error={props.errors.password}
                />
              </Form.Field>
              <Message size="tiny" error header="Gagal" content={formError} />
              <Message
                size="tiny"
                warning
                header="Perhatian"
                content={
                  "Saat ini KarsagiMarket hanya tersedia untuk area kota BANDUNG dan sekitarnya."
                }
              />
              <Button
                primary
                type="submit"
                size="big"
                onClick={props.handleSubmit}
                loading={props.isSubmitting}
              >
                Buka Toko
              </Button>
            </Form>
          )}
        </Formik>
      </Segment>
    </>
  );
}
