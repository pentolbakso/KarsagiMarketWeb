import styled from "styled-components";
import { Container, Header, Segment, Button, Icon } from "semantic-ui-react";
import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>{"Tentang Karsagi Market"}</title>
      </Head>
      <Segment>
        <Header as="h2">Tentang Karsagi Market</Header>
        <p>
          Karsagi Market adalah sebuah website untuk memfasilitasi transaksi
          jual beli. Yaitu, jual beli yang tidak mengandung riba dan hanya
          menjual barang-barang yg secara syar'i diperbolehkan.
        </p>
        <p>Beberapa poin penting:</p>
        <ul>
          <li>
            Karsagi Market tidak terlibat langsung terhadap akad jual beli.
          </li>
          <li>
            Karsagi Market tidak ikut mengurusi masalah pembayaran/transfer
            dana, misal: seperti Toped. Hal itu sepenuhnya diatur antara Pembeli
            dan Penjual
          </li>
          <li>Saat ini hanya tersedia di Bandung</li>
        </ul>
      </Segment>
    </>
  );
}
