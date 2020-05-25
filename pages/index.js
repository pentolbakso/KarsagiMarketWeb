import React, { useEffect, useState } from "react";
import {
  Header,
  Segment,
  Button,
  Icon,
  Message,
  Card,
} from "semantic-ui-react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useConnect } from "remx";
import { productCategories } from "../config/arrays";
import userStore from "../stores/userStore";
import * as userActions from "../stores/userActions";
import { productUrl } from "../utils/format";
import SearchBox from "../components/SearchBox";
import CardProduct from "../components/CardProduct";
import { NextSeo } from "next-seo";

export default function HomePage(props) {
  const { products } = connect(props);
  const [loading, setLoading] = useState(false);

  function openCategory(value) {
    userStore.setSearch(value, "");
    Router.push({ pathname: "/cari" });
  }

  function handleSearch(keyword) {
    userStore.setSearch("all", keyword);
    Router.push({ pathname: "/cari" });
  }

  async function _loadRecent() {
    try {
      if (loading) return;
      //console.log("loading product " + category + "?" + router.query.keyword);
      setLoading(true);
      await userActions.recentProducts();
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    //console.log("keyword", router.query.keyword);
    _loadRecent();
  }, []);

  return (
    <>
      <NextSeo title="Belanja Produk Halal" />
      {/* <Message warning style={{ marginBottom: 10 }}>
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
      </Message> */}
      <p>Selamat datang di Pasar Karsagi</p>
      <SearchBox
        defaultValue=""
        size="huge"
        onSubmit={(keyword) => handleSearch(keyword)}
      />
      <Header as="h4">Kategori</Header>
      <Card.Group itemsPerRow={2}>
        {productCategories.map((cat) => (
          <Card
            color="blue"
            key={cat.key}
            onClick={() => openCategory(cat.value)}
          >
            <Card.Content style={{ backgroundColor: "#fbfbfb" }}>
              <div style={{ fontSize: 15, textAlign: "center" }}>
                {cat.text}
              </div>
            </Card.Content>
          </Card>
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
    products: userStore.getRecentProducts(),
  }));
