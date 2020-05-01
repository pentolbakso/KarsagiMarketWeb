import styled from "styled-components";
import {
  Container,
  Header,
  Segment,
  Button,
  Icon,
  Menu,
  Divider,
} from "semantic-ui-react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Karsagi Market</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
            Buka Toko Online
          </Button>
        </Link>
        <Divider horizontal style={{ marginTop: "4em" }}>
          Sudah punya akun?
        </Divider>
        <Link href="/login">
          <Button size="big">Login</Button>
        </Link>
      </Segment>
    </>
  );
}
