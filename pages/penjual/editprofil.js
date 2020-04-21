import React, { useEffect } from "react";
import styled from "styled-components";
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
import PageContainer from "../../components/PageContainer";
import Navbar from "../../components/Navbar";
import { useConnect } from "remx";

export default function EditProfil() {
  return (
    <PageContainer>
      <Head>
        <title>Karsagi Market</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Segment>
        <Header as="h3">Ubah Profil</Header>
        <p>Development in-progress</p>
      </Segment>
    </PageContainer>
  );
}

const connect = (props) =>
  useConnect(() => ({
    //user: authStore.getUser(),
  }));
