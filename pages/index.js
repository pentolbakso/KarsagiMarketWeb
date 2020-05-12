import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Header,
  Segment,
  Button,
  Icon,
  Menu,
  Grid,
  Message,
  Form,
  Card,
  Image,
  Label,
  Visibility,
} from "semantic-ui-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useConnect } from "remx";
import { productCategoriesWithAll } from "../config/arrays";
import userStore from "../stores/userStore";
import * as userActions from "../stores/userActions";
import { image200 } from "../utils/images";
import { currencyFormat } from "../utils/format";
import { useMediaQuery } from "react-responsive";
import SearchBox from "../components/SearchBox";
import CardProduct from "../components/CardProduct";

export default function HomePage(props) {
  const [category, setCategory] = useState("all");
  const { products, hasMore } = connect(props);
  //const isMobile = useMediaQuery({ maxWidth: 767 });
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const router = useRouter();

  function handleLoadMore() {
    _loadMore();
  }

  async function _browse() {
    try {
      if (loading) return;
      //console.log("loading product " + category + "?" + router.query.keyword);
      setLoading(true);
      await userActions.browseProducts(category, router.query.keyword || "");
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  async function _loadMore() {
    if (loading || loadingMore || !hasMore) return; //loading in progress or no more data
    try {
      setLoadingMore(true);
      await userActions.moreProducts(category, router.query.keyword || "");
    } catch (err) {
    } finally {
      setLoadingMore(false);
    }
  }

  useEffect(() => {
    //console.log("keyword", router.query.keyword);
    _browse();
  }, [category, router.query.keyword]);

  return (
    <>
      <Head>
        <title key="title">Karsagi Market</title>
      </Head>
      <Message warning style={{ paddingTop: 10, paddingBottom: 10 }}>
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
      <SearchBox value={router.query.keyword || ""} />
      <Segment.Group>
        <Segment>
          <Form.Select
            label=""
            name="category"
            options={productCategoriesWithAll}
            value={category}
            onChange={(e, data) => {
              setCategory(data.value);
            }}
          />
        </Segment>
        <Segment>
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
                <Link key={idx} href={`/p/${p._id}/${p.slug || "-"}`}>
                  <CardProduct product={p} />
                </Link>
              ))}
            </Card.Group>
          )}
          {hasMore && !loading && (
            <Visibility
              offset={[10, 10]}
              onOnScreen={handleLoadMore}
              continuous={true}
            >
              <Icon name="caret down" />
            </Visibility>
          )}
        </Segment>
      </Segment.Group>
    </>
  );
}

const connect = (props) =>
  useConnect(() => ({
    products: userStore.getProducts(),
    hasMore: userStore.hasMoreProducts(),
  }));
