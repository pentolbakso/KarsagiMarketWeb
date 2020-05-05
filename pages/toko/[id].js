import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import {
  Container,
  Header,
  Segment,
  Button,
  Icon,
  Item,
  Image,
  Grid,
  List,
  Message,
  Label,
  Card,
  Visibility,
} from "semantic-ui-react";
import PageContainer from "../../components/PageContainer";
import Head from "next/head";
import { useRouter } from "next/router";
import { API_URL } from "../../services/api";
import { getStore, getStoreProducts } from "../../stores/userActions";
import {
  currencyFormat,
  getCategoryName,
  instagramUrl,
  whatsappUrl,
  callUrl,
} from "../../utils/format";
import { image200 } from "../../utils/images";
import { useMediaQuery } from "react-responsive";
import SearchBox from "../../components/SearchBox";

const NA = styled.em`
  color: #aaa;
`;

export default function DetailToko() {
  const router = useRouter();
  const { id } = router.query;
  const [error, setError] = useState(null);
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  //const isMobile = useMediaQuery({ maxWidth: 767 });

  function openProductDetail(product) {
    router.push(`/barang/${product._id}`);
  }

  function handleLoadMore() {
    _moreProducts();
  }

  async function _getDetail() {
    try {
      setLoading(true);
      const data = await getStore(id);
      setStore(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  async function _getProducts() {
    try {
      if (loading) return;
      setLoadingProduct(true);
      const { limit, data } = await getStoreProducts(id);
      setProducts(data);
      if (data.length < limit) setHasMore(false);
    } catch (err) {
    } finally {
      setLoadingProduct(false);
    }
  }

  async function _moreProducts() {
    try {
      if (loading || loadingMore || !hasMore) return; //loading in progress or no more data

      setLoadingMore(true);
      const { limit, data } = await getStoreProducts(id, products.length);
      setProducts(products.concat(data));
      if (data.length < limit) setHasMore(false);
    } catch (err) {
    } finally {
      setLoadingMore(false);
    }
  }

  useEffect(() => {
    if (id) {
      _getDetail();
      _getProducts();
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>{(store && store.title) || "Karsagi Market"}</title>
      </Head>
      {error && (
        <Message error>
          <Message.Header>
            {(error.raw && error.raw.name) || "Error"}
          </Message.Header>
          {error.message}
        </Message>
      )}
      <SearchBox />
      {store && (
        <Segment attached="top">
          <Header as="h2">
            {store.title}
            <Header.Subheader>{store.description}</Header.Subheader>
          </Header>
          <Message info>
            <Icon name="map" />
            {store.address || <NA>Penjual belum memasukkan alamat</NA>}
          </Message>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <List>
                  <List.Item
                    icon="user"
                    content={`Pemilik: ${store.user.fullname}`}
                  />
                  <List.Item
                    icon="whatsapp"
                    content={
                      <a href={callUrl(store.phonenumber)}>
                        {store.phonenumber || <NA>Belum ada nomor telpon</NA>}
                      </a>
                    }
                  />
                  {store.phonenumberAkhwat && (
                    <List.Item
                      icon="whatsapp"
                      content={
                        <>
                          <a href={whatsappUrl(store.phonenumberAkhwat)}>
                            {store.phonenumberAkhwat}
                          </a>{" "}
                          (khusus akhwat)
                        </>
                      }
                    />
                  )}
                </List>
              </Grid.Column>
              <Grid.Column width={8}>
                <List>
                  {store.instagram && (
                    <List.Item
                      icon="instagram"
                      content={
                        <a href={instagramUrl(store.instagram)}>
                          {store.instagram}
                        </a>
                      }
                    />
                  )}
                  {store.website && (
                    <List.Item icon="globe" content={store.website} />
                  )}
                </List>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      )}
      {products && (
        <Segment attached>
          <Header as="h3">Semua Produk</Header>
          <Card.Group itemsPerRow={2}>
            {products.map((p) => (
              <Card link onClick={() => openProductDetail(p)}>
                <Image
                  wrapped
                  ui={false}
                  src={
                    p.photos && p.photos.length > 0
                      ? image200(p.photos[0].filename)
                      : "http://placehold.jp/150x150.png"
                  }
                  label={
                    !p.isReadyStock
                      ? {
                          color: "red",
                          content: "Kosong",
                          ribbon: "right",
                        }
                      : p.isPromoPrice
                      ? {
                          color: "green",
                          content: "Promo",
                          ribbon: "right",
                        }
                      : null
                  }
                />
                <Card.Content>
                  <Card.Header style={{ fontSize: 14 }}>{p.name}</Card.Header>
                  <Card.Meta>{currencyFormat(p.price, false)}</Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
          {hasMore && (
            <Visibility
              offset={[10, 10]}
              onOnScreen={handleLoadMore}
              continuous={true}
            >
              <Icon name="caret down" />
            </Visibility>
          )}
        </Segment>
      )}
    </>
  );
}

/*
// IF YOU WANT TO ENABLE SSG
export async function getStaticPaths() {
  // TODO: get all products
  const res = await fetch("https://.../posts");
  const products = await res.json();

  const paths = products.map((p) => ({
    params: { id: p._id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${API_URL}/products?_id=${params.id}`);
  const post = await res.json();
  // Pass post data to the page via props
  return { props: { post } };
}
*/
