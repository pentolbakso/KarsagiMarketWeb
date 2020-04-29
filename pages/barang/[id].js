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
import PageContainer from "../../components/PageContainer";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import { useRouter, Router } from "next/router";
import { API_URL } from "../../services/api";
import { getProduct } from "../../stores/userActions";
import { image600, image200 } from "../../utils/images";
import { currencyFormat, getCategoryName } from "../../utils/format";
import moment from "moment";

const NA = styled.em`
  color: #aaa;
`;

export default function DetailProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [primaryPhoto, setPrimaryPhoto] = useState("");

  async function _getDetail() {
    try {
      setLoading(true);
      const data = await getProduct(id);
      setProduct(data);
      if (data.photos && data.photos.length > 0)
        setPrimaryPhoto(data.photos[0]);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    _getDetail();
  }, [id]);

  return (
    <PageContainer>
      <Navbar />
      {/* {JSON.stringify(product)} */}
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
                  {product.isReadyStock && !!product.isPromoPrice && (
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
                            {currencyFormat(product.price)}
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
                  <Button color="orange" size="small">
                    <Icon name="whatsapp" />
                    BELI
                  </Button>{" "}
                  {product.store && (
                    <Button
                      size="small"
                      onClick={() => router.push(`/toko/${product.store._id}`)}
                    >
                      <Icon name="store" />
                      Cek Toko
                    </Button>
                  )}
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
          </>
        )}
      </Segment>
    </PageContainer>
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
