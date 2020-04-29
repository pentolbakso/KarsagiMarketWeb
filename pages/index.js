import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
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
} from "semantic-ui-react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useConnect } from "remx";
import PageContainer from "../components/PageContainer";
import Navbar from "../components/Navbar";
import { productCategoriesWithAll } from "../config/arrays";
import userStore from "../stores/userStore";
import * as userActions from "../stores/userActions";
import { image200 } from "../utils/images";
import { currencyFormat } from "../utils/format";
import { useMediaQuery } from "react-responsive";

export default function HomePage(props) {
  const [category, setCategory] = useState("all");
  const { products } = connect(props);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  function openProductDetail(product) {
    Router.push(`/barang/${product._id}`);
  }

  useEffect(() => {
    userActions.browseProducts(category);
  }, [category]);

  // useEffect(() => {
  //   userActions.browseProducts(category);
  // }, []);

  return (
    <PageContainer>
      <Head>
        <title>Karsagi Market</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Message info style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Grid>
          <Grid.Column width={10}>
            <p>
              KarsagiMarket membuka peluang bagi ikhwan yg ingin membuka toko
              online! Tidak dipungut biaya, Gratis!
            </p>
          </Grid.Column>
          <Grid.Column width={6} verticalAlign="middle">
            <Link href="/penjual">
              <Button primary>Buka Toko</Button>
            </Link>
          </Grid.Column>
        </Grid>
      </Message>
      <Segment.Group>
        <Segment>
          <Form.Select
            label=""
            name="category"
            options={productCategoriesWithAll}
            value={category}
            onChange={(e, data) => {
              //props.setFieldValue("category", data.value);
              setCategory(data.value);
            }}
          />
        </Segment>
        <Segment>
          <Card.Group itemsPerRow={isMobile ? 2 : 4}>
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
        </Segment>
      </Segment.Group>
    </PageContainer>
  );
}

const connect = (props) =>
  useConnect(() => ({
    products: userStore.getProducts(),
  }));
