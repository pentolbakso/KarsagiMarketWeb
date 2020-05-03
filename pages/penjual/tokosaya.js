import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Container,
  Header,
  Segment,
  Button,
  Icon,
  Menu,
  Item,
  Label,
  Message,
  Divider,
} from "semantic-ui-react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useConnect } from "remx";
import dayjs from "dayjs";
import sellerStore from "../../stores/sellerStore";
import * as sellerActions from "../../stores/sellerActions";
import ProductModal from "../../components/modals/modal.editproduct";
import { image200 } from "../../utils/images";
import { currencyFormat } from "../../utils/format";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function TokoSaya(props) {
  const { shop, products } = connect(props);
  const [loadingShop, setLoadingShop] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productModalVisible, setProductModalVisible] = useState(false);
  const [productEdit, setProductEdit] = useState(false);

  async function getStore() {
    try {
      setLoadingShop(true);
      await sellerActions.getStore();
    } catch (err) {
    } finally {
      setLoadingShop(false);
    }
  }

  async function getProducts() {
    try {
      setLoadingProducts(true);
      await sellerActions.getProducts();
    } catch (err) {
    } finally {
      setLoadingProducts(false);
    }
  }

  function showProductModal(product) {
    setProductModalVisible(true);
    setProductEdit(product);
  }

  useEffect(() => {
    getStore();
  }, []);

  useEffect(() => {
    if (shop) {
      getProducts();
    }
  }, [shop]);

  return (
    <>
      <Head>
        <title>Toko Saya | Karsagi Market</title>
      </Head>
      <Segment attached>
        {loadingShop && <p>Loading...</p>}
        {!loadingShop && !shop && <Button primary>Buat Toko</Button>}
        {shop && (
          <div>
            <h2>{shop.title}</h2>
            <p>
              Sejak {dayjs(shop.createdAt).format("MMM YYYY")} -{" "}
              {shop.description || "Belum ada deskripsi"}
            </p>
            <p>
              <Label basic color="blue">
                <Icon name="phone" />{" "}
                {shop.phonenumber || "Belum ada nomor telpon"}
              </Label>
              <Label basic color="green">
                <Icon name="whatsapp" /> {shop.wanumber || "Belum ada nomor WA"}
              </Label>
            </p>
            {!shop.phonenumber && !shop.wanumber && (
              <Message color="yellow">
                <Message.Header>Perhatian</Message.Header>
                Anda belum menambahkan nomor telpon / WA yg akan digunakan jika
                Pembeli hendak melakukan transaksi. Silahkan tambah nomor
                melalui tombol Edit Toko
              </Message>
            )}
            <Button
              info
              color="teal"
              onClick={() => Router.push("/penjual/edittoko")}
            >
              Edit Toko
              <Icon name="pencil right" />
            </Button>
          </div>
        )}
      </Segment>
      <Segment attached>
        <Link href="/pesankurir">
          <Button size="big" color="orange">
            <Icon name="bicycle" />
            Pesan Kurir
          </Button>
        </Link>
      </Segment>
      {shop && (
        <>
          {/* <Header as="h4" attached block>
        Order masuk
      </Header>
      <Segment attached>Sedang dikembangkan, mohon bersabar</Segment> */}
          <Header as="h4" block attached>
            Barang yg sedang dijual
          </Header>
          <Segment attached>
            <Button
              primary
              compact
              icon
              labelPosition="left"
              onClick={() => showProductModal({})}
            >
              <Icon name="plus" />
              Tambah
            </Button>
            <Divider />
            <Item.Group divided unstackable>
              {products.length == 0 && (
                <Segment placeholder basic>
                  <Header icon color="grey">
                    <Icon name="store" />
                    Anda belum punya barang yg dijual
                  </Header>
                </Segment>
              )}
              {products.map((p) => (
                <Item key={p._id}>
                  <Item.Image
                    size="tiny"
                    src={
                      p.photos && p.photos.length > 0
                        ? image200(p.photos[0].filename)
                        : ""
                    }
                  />
                  <Item.Content>
                    <Item.Header>{p.name}</Item.Header>
                    <Item.Meta>
                      {p.price ? (
                        <Label basic>{currencyFormat(p.price)}</Label>
                      ) : (
                        "Belum ada harga"
                      )}
                      {p.isPromoPrice ? (
                        <Label basic color="green" size="small" compact>
                          Harga Promo
                        </Label>
                      ) : null}
                      {!p.isReadyStock ? (
                        <Label basic color="red" size="small" compact>
                          Stok Habis
                        </Label>
                      ) : null}{" "}
                      update: {dayjs(p.updatedAt).fromNow()}
                    </Item.Meta>
                    {/* <Item.Description>{p.description}</Item.Description> */}
                    <Item.Extra>
                      <a onClick={() => showProductModal(p)}>
                        <Icon name="pencil" />
                        Edit
                      </a>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              ))}
            </Item.Group>
          </Segment>
        </>
      )}
      <ProductModal
        open={productModalVisible}
        onClose={() => {
          console.log("onClose");
          setProductModalVisible(false);
        }}
        size="small"
        product={productEdit}
        closeOnDimmerClick={false}
      />
    </>
  );
}

const connect = (props) =>
  useConnect(() => ({
    shop: sellerStore.getShop(),
    products: sellerStore.getProducts(),
  }));
