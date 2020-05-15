import { Header, Segment } from "semantic-ui-react";
import { NextSeo } from "next-seo";

export default function Help() {
  return (
    <>
      <NextSeo title="Cara Kerja" />

      <Segment>
        <Header as="h2">Cara Kerja</Header>
        <Header as="h3">Cara Memesan Produk</Header>
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
        <Header as="h3">Cara Memesan Kurir</Header>
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
        </ul>
      </Segment>
    </>
  );
}
