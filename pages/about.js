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
        <ul>
          <li>
            Pasar Karsagi hanya menyediakan wadah untuk promosi produk, tidak
            terlibat langsung terhadap akad jual beli.
          </li>
          <li>
            Pasar Karsagi tidak ikut mengurusi masalah pembayaran/transfer dana,
            misal: seperti Toped. Hal itu sepenuhnya diatur sesuai kesepakatan
            Pembeli dan Penjual
          </li>
          <li>
            didasari oleh kaidah-kaidah fiqih muamalah yang berdasarkan Al
            Qur'an dan Hadis Shahih
          </li>
        </ul>
      </>
    </>
  );
}
