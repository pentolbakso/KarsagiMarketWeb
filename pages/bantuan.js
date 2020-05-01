import styled from "styled-components";
import {
  Container,
  Header,
  Segment,
  Button,
  Accordion,
} from "semantic-ui-react";
import PageContainer from "../components/PageContainer";
import Head from "next/head";

const panels = [
  {
    key: "1",
    title: "Apa itu Karsagi?",
    content: [
      "Karsagi adalah singkatan dari Kajian Rutin Sabtu Pagi. Kajian sunnah rutin yg diadakan setiap Sabtu, di masjid At-Taqwa Parakan Mas, Bandung",
    ].join(" "),
  },
  {
    key: "2",
    title: "Adakah biaya untuk membuka toko?",
    content: ["Tidak ada."].join(" "),
  },
  {
    key: "3",
    title: "Kapan dibuka untuk kota / daerah lain?",
    content: {
      content: ["InsyaAllah jika ada peluang dan kesempatan."].join(" "),
    },
  },
  {
    key: "4",
    title: "Apakah semua barang boleh dijual di KarsagiMarket?",
    content: {
      content: [
        "Tidak mengandung riba dan hanya menjual barang-barang yg secara syariat Islam dibolehkan.",
      ].join(" "),
    },
  },
  {
    key: "5",
    title:
      "Apakah KarsagiMarket ikut mengatur/urus masalah pembayaran/transfer/sejenisnya ?",
    content: {
      content: [
        "Tidak. Itu sepenuhnya diatur sesuai kesepakatan Penjual dan Pembeli",
      ].join(" "),
    },
  },
];

export default function Help() {
  return (
    <PageContainer>
      <Segment>
        <Header as="h2">Bantuan</Header>
        <Header as="h4">Cara Kerja</Header>
        <p>
          Cara kerja transaksi di Karsagi Market (KM) cukup sederhana, dan masih
          manual. Artinya, masih diperlukan interaksi langsung antara Penjual
          dan Pembeli dalam akad. Interaksi bisa lewat WhatsApp, Telpon, dsb. KM
          hanya menfasilitasi website untuk menampung produk/jasa yg antum
          tawarkan.
        </p>
        <p>Secara garis besarnya, tahapan jual beli adalah sebagai berikut</p>
        <ul>
          <li>Pembeli mencari produk di Market</li>
          <li>
            Jika ada yg cocok, Pembeli bisa menghubungi Penjual (via WA, call)
          </li>
          <li>
            Jika deal, silahkan lakukan pembayaran sesuai kesepakatan dgn
            Penjual
          </li>
          <li>Barang diterima, uang diterima. Alhamdulillah.</li>
        </ul>
        <Header as="h4">Pertanyaan yg sering ditanyakan</Header>
        <Accordion defaultActiveIndex={0} panels={panels} />
      </Segment>
    </PageContainer>
  );
}
