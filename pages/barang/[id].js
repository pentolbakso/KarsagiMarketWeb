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
  Table,
  Message,
  Label,
} from "semantic-ui-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter, Router } from "next/router";
import { API_URL } from "../../services/api";
import { getProduct } from "../../stores/userActions";
import { image600, image200 } from "../../utils/images";
import {
  currencyFormat,
  getCategoryName,
  whatsappUrl,
} from "../../utils/format";
import ModalBuy from "../../components/modals/modal.beli";
import SearchBox from "../../components/SearchBox";
import ModalChooseNumber from "../../components/modals/modal.choosenumber";

const NA = styled.em`
  color: #aaa;
`;

export default function DetailProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [primaryPhoto, setPrimaryPhoto] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [chooseModalVisible, setChooseModalVisible] = useState(false);

  async function _getDetail() {
    try {
      setLoading(true);
      const data = await getProduct(id);
      setProduct(data);
      if (data.photos && data.photos.length > 0)
        setPrimaryPhoto(data.photos[0]);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  function handleBuy() {
    setModalVisible(true);
  }

  function handleChat() {
    if (product.store.phonenumberAkhwat) {
      setChooseModalVisible(true);
      return;
    }
    sendChat(product.store.phonenumber);
  }

  function sendChat(number) {
    let message =
      "Assalamu'alaikum," +
      "\nAna mau bertanya ttg produk yg sedang dijual di KarsagiMarket: " +
      "\n" +
      product.name;
    window.open(whatsappUrl(number, message));
  }

  useEffect(() => {
    if (id) _getDetail();
  }, [id]);

  return (
    <>
      <Head>
        <title>{(product && product.name) || "Karsagi Market"}</title>
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
      {product && (
        <Segment attached="top" style={{ backgroundColor: "#f5f5f5" }}>
          <Header as="h2">
            {product.name}
            <Header.Subheader>
              {getCategoryName(product.category)}
            </Header.Subheader>
          </Header>
        </Segment>
      )}
      <Segment attached>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={8}>
              {product && product.photos && product.photos.length > 0 ? (
                <>
                  <Image
                    wrapped
                    bordered
                    src={primaryPhoto ? image600(primaryPhoto.filename) : ""}
                  />
                  <Image.Group>
                    {product.photos.length > 1 &&
                      product.photos.map((photo) => {
                        return (
                          <Image
                            href="#"
                            src={image200(photo.filename)}
                            size="tiny"
                            onClick={() => setPrimaryPhoto(photo)}
                          />
                        );
                      })}
                  </Image.Group>
                </>
              ) : (
                <NA>Belum ada foto produk</NA>
              )}
            </Grid.Column>
            <Grid.Column width={8}>
              {product && (
                <>
                  {/* <Header as="h2">
                    {product.name}
                    <Header.Subheader>
                      {getCategoryName(product.category)}
                    </Header.Subheader>
                  </Header> */}
                  {product.isReadyStock == false && (
                    <Label color="red" compact size="small" tag>
                      Stok Kosong
                    </Label>
                  )}
                  {product.isReadyStock && !!product.promoPrice && (
                    <Label color="green" compact size="small" tag>
                      Harga Promo
                    </Label>
                  )}
                  <Table compact basic="very" celled collapsing unstackable>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>Harga</Table.Cell>
                        <Table.Cell>
                          <Header as="h2" color="orange">
                            {currencyFormat(
                              product.promoPrice || product.price
                            )}
                            {!!product.promoPrice && (
                              <Header.Subheader>
                                <span
                                  style={{ textDecoration: "line-through" }}
                                >
                                  {currencyFormat(product.price, false)}
                                </span>
                              </Header.Subheader>
                            )}
                          </Header>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Berat (g)</Table.Cell>
                        <Table.Cell>
                          {product.weight || <NA>Tidak ada info</NA>}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Penjual</Table.Cell>
                        <Table.Cell>
                          {product.store ? (
                            product.store.title
                          ) : (
                            <NA>Tidak ditemukan</NA>
                          )}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Catatan</Table.Cell>
                        <Table.Cell>
                          {product.notes || <NA>Tidak ada</NA>}
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  <Button color="green" size="big" onClick={handleBuy}>
                    <Icon name="whatsapp" />
                    BELI
                  </Button>
                  <p style={{ marginTop: "0.5em" }}>
                    <Button size="small" onClick={handleChat}>
                      <Icon name="whatsapp" />
                      Chat Dulu
                    </Button>{" "}
                    {product.store && (
                      <Button
                        size="small"
                        onClick={() =>
                          router.push(`/toko/${product.store._id}`)
                        }
                      >
                        <Icon name="store" />
                        Cek Toko
                      </Button>
                    )}
                  </p>
                </>
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              {product && (
                <>
                  <Header as="h4" dividing>
                    Deskripsi:
                  </Header>
                  <div style={{ whiteSpace: "pre-line" }}>
                    {product.description || <NA>Tidak ada deskripsi</NA>}
                  </div>
                </>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment attached="bottom">
        {product && product.store && (
          <>
            <Header as="h4">
              {product.store.title}
              <Header.Subheader>{product.store.description}</Header.Subheader>
            </Header>
            <p>
              <Icon name="user" /> Pemilik Toko: {product.store.user.fullname}
            </p>
            <p>
              <Link href={`/toko/${product.store._id}`}>
                Cek produk lainnya dari toko
              </Link>
            </p>
          </>
        )}
      </Segment>
      {product && (
        <>
          <ModalBuy
            open={modalVisible}
            onClose={() => {
              setModalVisible(false);
            }}
            size="small"
            product={product}
            closeOnDimmerClick={false}
          />
          <ModalChooseNumber
            open={chooseModalVisible}
            onClose={() => setChooseModalVisible(false)}
            onSelected={(phonenumber) => {
              setChooseModalVisible(false);
              sendChat(phonenumber);
            }}
            store={product.store}
            size="tiny"
          />
        </>
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
