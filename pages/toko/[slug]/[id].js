import React, { useEffect, useState } from "react";
import {
  Header,
  Segment,
  Icon,
  Grid,
  List,
  Message,
  Card,
  Visibility,
  Placeholder,
} from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getStore, getStoreProducts } from "../../../stores/userActions";
import {
  instagramUrl,
  whatsappUrl,
  productUrl,
  storeUrl,
  seoDescription,
} from "../../../utils/format";
import SearchBox from "../../../components/SearchBox";
import CardProduct from "../../../components/CardProduct";
import { NextSeo } from "next-seo";

const NA = ({ children }) => <em style={{ color: "#aaa" }}>{children}</em>;

const DummyLine = () => (
  <Placeholder fluid>
    <Placeholder.Line />
  </Placeholder>
);

const StoreInfo = ({ store }) => (
  <Segment attached="top">
    {store ? (
      <>
        <Header as="h2">
          {store.title}
          <Header.Subheader>{store.description}</Header.Subheader>
        </Header>
        <Message info>
          <Icon name="map" />
          {store.address || <NA>Penjual belum memasukkan alamat</NA>}
        </Message>
      </>
    ) : (
      <Placeholder>
        <Placeholder.Header />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder>
    )}
    <Grid>
      <Grid.Row>
        <Grid.Column width={8}>
          <List>
            <List.Item
              icon="user"
              content={
                store ? `Pemilik: ${store.user.fullname}` : <DummyLine />
              }
            />
            <List.Item
              icon="whatsapp"
              content={
                store ? (
                  <>
                    <a href={whatsappUrl(store.phonenumber)}>
                      {store.phonenumber}
                    </a>
                  </>
                ) : (
                  <DummyLine />
                )
              }
            />
            {store && store.phonenumberAkhwat && (
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
            {store && store.instagram && (
              <List.Item
                icon="instagram"
                content={
                  <a href={instagramUrl(store.instagram)}>{store.instagram}</a>
                }
              />
            )}
            {store && store.website && (
              <List.Item
                icon="globe"
                content={store.website}
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              />
            )}
          </List>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

export default function DetailToko({ store: storeProps, error: errorProps }) {
  const router = useRouter();
  const { id } = router.query;
  const [error, setError] = useState(errorProps || null);
  const [store, setStore] = useState(storeProps || null);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  //const isMobile = useMediaQuery({ maxWidth: 767 });

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
      <NextSeo
        title={store ? store.title : undefined}
        description={store ? seoDescription(store.description) : undefined}
        canonical={storeUrl(store, true)}
      />
      {error && (
        <Message error>
          <Message.Header>
            {(error.raw && error.raw.name) || "Error"}
          </Message.Header>
          {error.message}
        </Message>
      )}
      <SearchBox />
      <StoreInfo store={store} />
      {store && store.status == "close" && (
        <Segment attached>
          <Message color="yellow">
            <Message.Header>Tidak Menerima Order</Message.Header>
            <Message.Content>
              Penjual sedang meliburkan tokonya untuk sementara waktu.
            </Message.Content>
          </Message>
        </Segment>
      )}
      <Segment attached>
        <Header as="h3">Semua Produk</Header>
        {!loadingProduct ? (
          <Card.Group itemsPerRow={2}>
            {products.map((p, idx) => (
              <Link key={idx} href={productUrl(p)}>
                <CardProduct product={p} />
              </Link>
            ))}
          </Card.Group>
        ) : (
          <Card.Group itemsPerRow={2}>
            <CardProduct placeholder />
            <CardProduct placeholder />
          </Card.Group>
        )}
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
    </>
  );
}

export async function getStaticPaths() {
  // const resp = await fetchStoreIds();
  // const paths = resp.data.data.map((p) => {
  //   return {
  //     params: { id: p._id, slug: p.slug || "-" },
  //   };
  // });
  const paths = [];
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const id = params.id;
  try {
    const resp = await getStore(id);
    // Pass post data to the page via props
    return { props: { store: resp, error: null } };
  } catch (error) {
    return { props: { store: null, error: error.response.data } };
  }
}
