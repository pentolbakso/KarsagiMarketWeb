import { Container, Header, Segment, Button, Icon } from "semantic-ui-react";
import { NextSeo } from "next-seo";

export default function About() {
  return (
    <>
      <NextSeo title="Syarat dan Ketentuan" />
      <>
        <Header as="h2">Syarat dan Ketentuan</Header>
        <p>
          Dengan membuat akun dan melakukan transaksi via Pasar Karsagi, anda
          telah menyetujui syarat dan ketentuan yg berlaku pada website ini.
        </p>
        <Header as="h3">Produk yg tidak boleh dijual</Header>
        <ul>
          <li>
            Secara umum, barang-barang yg tidak diperbolehkan untuk
            diperjualbelikan menurut kaidah fiqih muamalah dalam Islam. Contoh:
            makanan haram, alat musik, rokok, alkohol/ yg memabukkan
          </li>
          <li>
            Semua produk yang dilarang oleh peraturan perundangan negara
            republik Indonesia
          </li>
        </ul>
      </>
    </>
  );
}
