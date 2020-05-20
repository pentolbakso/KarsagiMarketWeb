import React, { useEffect, useState } from "react";
import {
  Header,
  Segment,
  Button,
  Icon,
  Message,
  Form,
  Card,
  Visibility,
  Grid,
} from "semantic-ui-react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useConnect } from "remx";
import { productCategoriesWithAll, productCategories } from "../config/arrays";
import userStore from "../stores/userStore";
import * as userActions from "../stores/userActions";
import { productUrl } from "../utils/format";
import SearchBox from "../components/SearchBox";
import CardProduct from "../components/CardProduct";
import { NextSeo } from "next-seo";

export default function HomePage(props) {
  const { products } = connect(props);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function _browse() {
    try {
      if (loading) return;
      //console.log("loading product " + category + "?" + router.query.keyword);
      setLoading(true);
      await userActions.browseProducts("all", "");
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    //console.log("keyword", router.query.keyword);
    _browse();
  }, []);

  return (
    <>
      <NextSeo title="Belanja Produk Halal" />
      <Message warning style={{ marginBottom: 10 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>
            KarsagiMarket membuka peluang bagi ikhwan yg ingin membuka toko
            online! Tidak dipungut biaya, Gratis!
          </div>
          <Link href="/daftar/penjual">
            <Button color="orange" floated="right" style={{ width: 150 }}>
              Buka Toko
            </Button>
          </Link>
        </div>
      </Message>
      <SearchBox
        size="huge"
        onSubmit={(keyword) =>
          Router.push({ pathname: "/cari", query: { keyword } })
        }
      />
      <Header as="h4">Kategori</Header>
      <Card.Group itemsPerRow={2}>
        {productCategories.map((cat) => (
          <Link
            key={cat.key}
            href={{ pathname: "/cari", query: { category: cat.value } }}
          >
            <Card color="blue">
              <Card.Content style={{ backgroundColor: "#fbfbfb" }}>
                <div style={{ fontSize: 15, textAlign: "center" }}>
                  {cat.text}
                </div>
              </Card.Content>
            </Card>
          </Link>
        ))}
      </Card.Group>
      <Header as="h4">20 Produk Terkini</Header>
      {loading ? (
        <Card.Group itemsPerRow={2}>
          <CardProduct placeholder />
          <CardProduct placeholder />
        </Card.Group>
      ) : products.length == 0 ? (
        <Segment placeholder basic>
          <Header icon color="grey">
            <Icon name="search" />
            Produk tidak ditemukan
          </Header>
        </Segment>
      ) : (
        <Card.Group itemsPerRow={2}>
          {products.map((p, idx) => (
            <Link key={idx} href={productUrl(p)}>
              <CardProduct product={p} />
            </Link>
          ))}
        </Card.Group>
      )}
    </>
  );
}

const connect = () =>
  useConnect(() => ({
    products: userStore.getProducts(),
  }));
