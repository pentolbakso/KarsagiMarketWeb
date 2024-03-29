import React, { useEffect, useState } from "react";
import {
  Placeholder,
  Header,
  Segment,
  Button,
  Icon,
  Item,
  Label,
  Message,
  Divider,
} from "semantic-ui-react";
import Router from "next/router";
import { useConnect } from "remx";
import dayjs from "dayjs";
import sellerStore from "../../stores/sellerStore";
import * as sellerActions from "../../stores/sellerActions";
import ProductModal from "../../components/modals/modal.editproduct";
import { image200 } from "../../utils/images";
import { currencyFormat } from "../../utils/format";
import relativeTime from "dayjs/plugin/relativeTime";
import { NextSeo } from "next-seo";
import authStore from "../../stores/authStore";

dayjs.extend(relativeTime);

const MyProduct = ({ product: p, onEdit, onDelete, placeholder }) => {
  if (placeholder)
    return (
      <Placeholder>
        <Placeholder.Header image>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
      </Placeholder>
    );

  return (
    <Item>
      <Item.Image
        size="tiny"
        src={
          p.photos && p.photos.length > 0 ? image200(p.photos[0].filename) : ""
        }
      />
      <Item.Content>
        <Item.Header>{p.name}</Item.Header>
        <Item.Meta>
          {p.price ? (
            <Label basic>{currencyFormat(p.promoPrice || p.price)}</Label>
          ) : (
            "Belum ada harga"
          )}
          {!!p.promoPrice ? (
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
          <a onClick={onEdit}>
            <Icon name="pencil" />
            Edit
          </a>{" "}
          <a onClick={onDelete}>
            <Icon color="red" name="close" />
            Hapus
          </a>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default function Dashboard(props) {
  const { shop, products, user } = connect(props);
  const [loadingShop, setLoadingShop] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productModalVisible, setProductModalVisible] = useState(false);
  const [productEdit, setProductEdit] = useState(false);

  async function _loadStore() {
    try {
      setLoadingShop(true);
      await sellerActions.getStore();
    } catch (err) {
    } finally {
      setLoadingShop(false);
    }
  }

  async function _loadProducts() {
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

  async function showConfirmDeleteModal(product) {
    if (confirm("Yakin akan menghapus barang '" + product.name + "' ?")) {
      await sellerActions.deleteProduct(product._id);
    }
  }

  async function handleCloseShop() {
    if (
      confirm(
        "Yakin akan meliburkan toko sementara ? Barang-barang anda tetap ditampilkan, namun pembeli tidak bisa melakukan order melalui chat/WA"
      )
    ) {
      await sellerActions.closeStore();
    }
  }

  async function handleReopenShop() {
    await sellerActions.reopenStore();
  }

  useEffect(() => {
    if (shop) {
      _loadProducts();
    }
  }, [shop]);

  useEffect(() => {
    console.log("user", user);
    if (user) _loadStore();
  }, [user]);

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <NextSeo title="Toko Saya" noindex={true} />
      <Segment color="green">
        {loadingShop && (
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        )}
        {!loadingShop && !shop && <Button primary>Buat Toko</Button>}
        {shop && (
          <div>
            {shop.status == "close" && (
              <Message color="yellow">
                <Message.Header>Toko Sedang Libur</Message.Header>
                <Message.Content>
                  Anda sedang meliburkan toko ini. Untuk membuka kembali toko
                  dan agar bisa menerima orderan, silahkan klik tombol "Buka
                  Toko".
                </Message.Content>
              </Message>
            )}
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
              {shop.phonenumberAkhwat && (
                <Label basic color="pink">
                  <Icon name="whatsapp" />{" "}
                  {shop.phonenumberAkhwat || "Belum ada nomor WA"}
                </Label>
              )}
            </p>
            <Button
              //color="teal"
              basic
              onClick={() => Router.push("/tokosaya/edittoko")}
            >
              <span style={{ textDecoration: "underline", color: "#2185D1" }}>
                Edit Toko
              </span>
              <Icon name="pencil right" />
            </Button>
            {shop.status != "close" ? (
              <Button basic onClick={handleCloseShop}>
                <span style={{ textDecoration: "underline", color: "#2185D1" }}>
                  Liburkan Toko
                </span>
                <Icon name="close right" />
              </Button>
            ) : (
              <Button color="green" onClick={handleReopenShop}>
                <span style={{ textDecoration: "underline" }}>Buka Toko</span>
                <Icon name="play right" />
              </Button>
            )}
          </div>
        )}
      </Segment>
      {shop && (
        <>
          <Header as="h3">Barang yg sedang dijual</Header>
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
            {loadingProducts ? (
              <>
                <MyProduct placeholder />
                <MyProduct placeholder />
              </>
            ) : (
              products.map((p) => (
                <MyProduct
                  product={p}
                  key={p._id}
                  onEdit={() => showProductModal(p)}
                  onDelete={() => showConfirmDeleteModal(p)}
                />
              ))
            )}
          </Item.Group>
        </>
      )}
      <ProductModal
        open={productModalVisible}
        onClose={() => {
          //console.log("onClose");
          setProductModalVisible(false);
        }}
        size="small"
        product={productEdit}
        closeOnDimmerClick={false}
      />
    </>
  );
}

const connect = () =>
  useConnect(() => ({
    shop: sellerStore.getShop(),
    products: sellerStore.getProducts(),
    user: authStore.getUser(),
  }));
