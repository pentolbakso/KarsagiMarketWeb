import { Header, Segment } from "semantic-ui-react";
import { NextSeo } from "next-seo";

export default function Help() {
  return (
    <>
      <NextSeo title="Cara Kerja" />

      <>
        <Header as="h2">Cara Kerja</Header>
        <Header as="h3">Cara Memesan Produk</Header>
        <p>
          Cara kerja transaksi di Pasar Karsagi cukup sederhana, dan masih
          manual. Artinya, masih diperlukan komunikasi secara langsung antara
          Penjual dan Pembeli. Interaksi bisa lewat WhatsApp, Telpon, dsb. Kami
          hanya menfasilitasi website untuk menampung produk/jasa yg anda
          tawarkan.
        </p>
        <p>Secara garis besarnya, tahapan jual beli adalah sebagai berikut</p>
        <ul>
          <li>Pembeli mencari produk</li>
          <li>
            Jika ada yg cocok, Pembeli bisa menghubungi Penjual (via WA, call)
          </li>
          <li>
            Jika deal, silahkan lakukan pembayaran sesuai kesepakatan dgn
            Penjual (tunai, COD, transfer)
          </li>
          <li>Barang diterima, uang diterima. Alhamdulillah.</li>
        </ul>
        {/* <Header as="h3">Cara Memesan Kurir</Header>
        <ul>
          <li>Gunakan tombol Pesan Kurir untuk mulai proses pemesanan</li>
          <li>
            Pada form pesan, tentukan alamat penjemputan + pengiriman barang
          </li>
          <li>
            Kirim, lalu calon Kurir akan membalas dgn perkiraan biaya ongkir
          </li>
          <li>
            Jika deal, maka Kurir akan memulai proses penjemputan/pengiriman
            barang
          </li>
        </ul> */}
      </>
    </>
  );
}
