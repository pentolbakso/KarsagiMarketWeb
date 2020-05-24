import { Container, Header, Segment, Button, Icon } from "semantic-ui-react";
import { NextSeo } from "next-seo";

export default function About() {
  return (
    <>
      <NextSeo title="Tentang Kami" />
      <>
        <Header as="h2">Tentang Pasar Karsagi</Header>
        <p>
          Pasar Karsagi adalah website untuk memfasilitasi transaksi jual beli.
          Yaitu, jual beli yang tidak mengandung riba dan hanya menjual
          barang-barang yg secara syar'i diperbolehkan.
        </p>
        <p>Beberapa poin penting:</p>
        <ul>
          <li>
            Pasar Karsagi tidak terlibat langsung terhadap akad jual beli.
          </li>
          <li>
            Pasar Karsagi tidak ikut mengurusi masalah pembayaran/transfer dana,
            misal: seperti Toped. Hal itu sepenuhnya diatur antara Pembeli dan
            Penjual
          </li>
          <li>Saat ini hanya tersedia di Bandung</li>
        </ul>
      </>
    </>
  );
}
