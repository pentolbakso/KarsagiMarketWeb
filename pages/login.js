import React, { useState } from "react";
import {
  Form,
  Header,
  Segment,
  Button,
  Divider,
  Message,
  Container,
  Icon,
} from "semantic-ui-react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import { login } from "../stores/authActions";
import { NextSeo } from "next-seo";

export default function About() {
  const [formError, setFormError] = useState(null);
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Alamat email tidak valid")
      .required("Email harap diisi"),
    password: Yup.string()
      .min(4, "Panjang karakter minimal 4")
      .required("Password harap diisi"),
  });

  async function submitForm(values, { setSubmitting }) {
    try {
      setSubmitting(true);
      const { email, password } = values;
      await login(email, password);
      setSubmitting(false);

      Router.push("/penjual/tokosaya");
    } catch (err) {
      setSubmitting(false);
      setFormError(err.message);
    }
  }

  return (
    <>
      <NextSeo title="Login" />

      <Segment>
        <Header as="h2">Login sebagai penjual</Header>
        {router.query && router.query.message && (
          <Message error>{router.query.message}</Message>
        )}
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={submitForm}
        >
          {(props) => (
            <Form size="large" error={formError != null}>
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
                  type="password"
                  placeholder="Password (minimal 6 karakter)"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.password}
                  error={props.errors.password}
                />
              </Form.Field>
              <Message error header="Login Gagal" content={formError} />
              <Button
                primary
                type="submit"
                size="large"
                onClick={props.handleSubmit}
                loading={props.isSubmitting}
              >
                Masuk
              </Button>
            </Form>
          )}
        </Formik>
        <Divider horizontal>Belum punya toko online?</Divider>
        <Container textAlign="center">
          <Link href="/daftar/penjual">
            <Button size="large">
              <Icon name="store" />
              Buka Toko Online
            </Button>
          </Link>
        </Container>
      </Segment>
    </>
  );
}
