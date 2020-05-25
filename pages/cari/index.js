import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  Header,
  Segment,
  Button,
  Icon,
  Message,
  Form,
  Card,
  Visibility,
} from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useConnect } from "remx";
import { productCategoriesWithAll } from "../../config/arrays";
import userStore from "../../stores/userStore";
import * as userActions from "../../stores/userActions";
import { productUrl } from "../../utils/format";
import SearchBox from "../../components/SearchBox";
import CardProduct from "../../components/CardProduct";
import { NextSeo } from "next-seo";

export default function Cari({ props }) {
  const router = useRouter();
  const { products, hasMore, search, total } = connect(props);
  const { category, keyword } = search;
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  function handleLoadMore() {
    _loadMore();
  }

  function handleSearch(key) {
    userStore.setSearch(category, key);
  }

  async function _doSearch(cat, key) {
    try {
      if (loading) return;
      console.log("search product '" + cat + "'?" + key);
      setLoading(true);
      await userActions.browseProducts(cat, key);
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
    _doSearch(search.category, search.keyword);
  }, [search]);

  return (
    <>
      <NextSeo title="Cari Produk" />
      <div style={{ marginBottom: 10 }}>
        <Form.Select
          label=""
          name="category"
          options={productCategoriesWithAll}
          value={category}
          onChange={(e, data) => {
            userStore.setSearch(data.value, keyword);
          }}
          fluid
        />
      </div>
      <SearchBox
        defaultValue={keyword || ""}
        style={{ marginBottom: 10 }}
        onSubmit={handleSearch}
      />
      {total > 0 && (
        <div style={{ marginBottom: 5 }}>
          <strong>Menemukan {total} produk:</strong>
        </div>
      )}
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
      {hasMore && !loading && (
        <Visibility
          offset={[10, 10]}
          onOnScreen={handleLoadMore}
          continuous={true}
        >
          <Icon name="caret down" />
        </Visibility>
      )}
    </>
  );
}

const connect = () =>
  useConnect(() => ({
    products: userStore.getProducts(),
    total: userStore.getProductTotal(),
    hasMore: userStore.hasMoreProducts(),
    search: userStore.getSearch(),
  }));
