import React, { useEffect } from "react";
import {
  Container,
  Header,
  Segment,
  Button,
  Icon,
  Menu,
} from "semantic-ui-react";
import Head from "next/head";
import Link from "next/link";
import { useConnect } from "remx";

export default function EditProfil() {
  return (
    <>
      <Head>
        <title>Karsagi Market</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Segment>
        <Header as="h3">Ubah Profil</Header>
        <p>Development in-progress</p>
      </Segment>
    </>
  );
}

const connect = (props) =>
  useConnect(() => ({
    //user: authStore.getUser(),
  }));
