import { Header, Segment, Button, Divider } from "semantic-ui-react";
import Link from "next/link";
import { NextSeo } from "next-seo";

export default function Home() {
  return (
    <>
      <NextSeo title="Buka Toko Online" />
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
