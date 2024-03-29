import { Header, Segment, Accordion } from "semantic-ui-react";
import { NextSeo } from "next-seo";

const panels = [
  {
    key: "1",
    title: "Apa itu Karsagi?",
    content: [
      "Karsagi adalah singkatan dari Kajian Rutin Sabtu Pagi. Kajian sunnah ilimiah yg rutin diadakan setiap Sabtu, di masjid At-Taqwa Parakan Mas, Bandung. Pemilihan nama tersebut hanya u/ kemudahan saja.",
    ].join(" "),
  },
  {
    key: "2",
    title: "Adakah biaya untuk membuka toko?",
    content: ["Tidak ada."].join(" "),
  },
  // {
  //   key: "3",
  //   title: "Kapan dibuka untuk kota / daerah lain?",
  //   content: {
  //     content: ["InsyaAllah jika ada peluang dan kesempatan."].join(" "),
  //   },
  // },
  {
    key: "4",
    title: "Apakah semua barang boleh dijual di Pasar Karsagi?",
    content: {
      content: [
        "Tidak mengandung riba dan hanya menjual barang-barang yg secara syariat Islam dibolehkan.",
      ].join(" "),
    },
  },
  {
    key: "5",
    title:
      "Apakah Pasar Karsagi ikut mengatur/urus masalah pembayaran/transfer/sejenisnya ?",
    content: {
      content: [
        "Tidak. Itu sepenuhnya diatur sesuai kesepakatan Penjual dan Pembeli",
      ].join(" "),
    },
  },
];

export default function Help() {
  return (
    <>
      <NextSeo title="Bantuan" />

      <>
        <Header as="h2">Bantuan</Header>
        <Header as="h4">Pertanyaan yg sering ditanyakan</Header>
        <Accordion defaultActiveIndex={0} panels={panels} />
      </>
    </>
  );
}
