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
import PageContainer from "../components/PageContainer";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <PageContainer>
      <Head>
        <title>Karsagi Market</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Segment placeholder style={{ padding: "3em" }}>
        <Header as="h2" style={{ textAlign: "center" }}>
          Mulai Berjualan!
          <Header.Subheader style={{ marginTop: "1em" }}>
            KarsagiMarket membuka pendaftaran untuk para ikhwan/akhwat yang
            ingin menjual produk/jasanya. Segera buka toko online anda untuk
            mulai berjualan. Gratis! Tidak dipungut biaya.
          </Header.Subheader>
        </Header>
        <Link href="/daftar/penjual">
          <Button size="big" primary style={{ marginTop: "1em" }}>
            Buat Toko Online
          </Button>
        </Link>
        <Link href="/about">
          <a>Tentang Karsagi</a>
        </Link>
      </Segment>
    </PageContainer>
  );
}
