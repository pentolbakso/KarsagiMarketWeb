import React, { useEffect, useState } from "react";
import {
  Header,
  Segment,
  Button,
  Icon,
  Image,
  Grid,
  Table,
  Message,
  Label,
  Placeholder,
} from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getProduct } from "../../../stores/userActions";
import { image600, image200 } from "../../../utils/images";
import {
  currencyFormat,
  getCategoryName,
  whatsappUrl,
  seoDescription,
  productUrl,
  storeUrl,
} from "../../../utils/format";
import ModalBuy from "../../../components/modals/modal.beli";
import SearchBox from "../../../components/SearchBox";
import ModalChooseNumber from "../../../components/modals/modal.choosenumber";
import { event } from "../../../lib/gtag";
import ModalShare from "../../../components/modals/modal.share";
import { fetchProductIds, fetchProduct } from "../../../services/api";
import { NextSeo } from "next-seo";

const NA = ({ children }) => <em style={{ color: "#aaa" }}>{children}</em>;

const ProductTitle = ({ product }) => {
  return (
    <Segment attached="top" style={{ backgroundColor: "#f7fff8" }}>
      {product ? (
        <Header as="h2">
          {product.name}
          <Header.Subheader>
            {getCategoryName(product.category)}
          </Header.Subheader>
        </Header>
      ) : (
        <Placeholder>
          <Placeholder.Header>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
        </Placeholder>
      )}
    </Segment>
  );
};

const ProductInfoDescription = ({ product, onBuy, onChat, onShare }) => {
  const [primaryPhoto, setPrimaryPhoto] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (product != null) {
      if (product.photos && product.photos.length > 0)
        setPrimaryPhoto(product.photos[0]);
    }
  }, [product]);

  return (
    <Segment attached>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={8}>
            {product ? (
              product.photos && product.photos.length > 0 ? (
                <div>
                  <Image
                    wrapped
                    bordered
                    src={primaryPhoto ? image600(primaryPhoto.filename) : ""}
                  />
                  <Image.Group>
                    {product.photos.length > 1 &&
                      product.photos.map((photo, idx) => {
                        return (
                          <Image
                            key={idx}
                            src={image200(photo.filename)}
                            size="tiny"
                            onClick={() => setPrimaryPhoto(photo)}
                          />
                        );
                      })}
                  </Image.Group>
                </div>
              ) : (
                <NA>Belum ada foto produk</NA>
              )
            ) : (
              <Placeholder fluid>
                <Placeholder.Image />
              </Placeholder>
            )}
          </Grid.Column>
          <Grid.Column width={8}>
            <>
              {product && product.isReadyStock == false && (
                <Label color="red" compact size="small" tag>
                  Stok Kosong
                </Label>
              )}
              {product && product.isReadyStock && !!product.promoPrice && (
                <Label color="green" compact size="small" tag>
                  Harga Promo
                </Label>
              )}
              <Table compact basic="very" celled unstackable>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell collapsing>Harga</Table.Cell>
                    <Table.Cell>
                      <Header as="h2" color="orange">
                        {product ? (
                          <>
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
                          </>
                        ) : (
                          <Placeholder>
                            <Placeholder.Line />
                          </Placeholder>
                        )}
                      </Header>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell collapsing>Berat (g)</Table.Cell>
                    <Table.Cell>
                      {product ? (
                        <>{product.weight || <NA>Tidak ada info</NA>}</>
                      ) : (
                        <Placeholder>
                          <Placeholder.Line />
                        </Placeholder>
                      )}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell collapsing>Penjual</Table.Cell>
                    <Table.Cell>
                      {product ? (
                        product.store ? (
                          product.store.title
                        ) : (
                          <NA>Tidak ditemukan</NA>
                        )
                      ) : (
                        <Placeholder>
                          <Placeholder.Line />
                        </Placeholder>
                      )}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell collapsing>Catatan</Table.Cell>
                    <Table.Cell>
                      {product ? (
                        <>{product.notes || <NA>Tidak ada</NA>}</>
                      ) : (
                        <Placeholder fluid>
                          <Placeholder.Line />
                        </Placeholder>
                      )}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              {product ? (
                product.store.status == "close" ? (
                  <Message color="yellow">
                    <Message.Header>Tidak Menerima Order</Message.Header>
                    <Message.Content>
                      Penjual sedang meliburkan tokonya untuk sementara waktu.
                    </Message.Content>
                  </Message>
                ) : (
                  <>
                    <Button fluid color="green" size="big" onClick={onBuy}>
                      <Icon name="whatsapp" />
                      BELI
                    </Button>
                    <div style={{ marginTop: "0.5em" }}>
                      <Button.Group widths="2" size="small">
                        <Button basic color="red" onClick={onChat}>
                          <Icon name="whatsapp" />
                          Chat Dulu
                        </Button>
                        <Button
                          basic
                          color="teal"
                          size="small"
                          onClick={() => router.push(storeUrl(product.store))}
                        >
                          <Icon name="store" />
                          Cek Toko
                        </Button>
                      </Button.Group>
                    </div>
                    <div style={{ marginTop: "0.5em" }}>
                      <Button basic size="small" onClick={onShare}>
                        <Icon name="share alternate" />
                        Share
                      </Button>
                    </div>
                  </>
                )
              ) : (
                <Button fluid color="green" size="big" onClick={() => {}}>
                  <Icon name="whatsapp" />
                  BELI
                </Button>
              )}
            </>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as="h4" dividing>
              Deskripsi:
            </Header>
            {product ? (
              <div style={{ whiteSpace: "pre-line" }}>
                {product.description || <NA>Tidak ada deskripsi</NA>}
              </div>
            ) : (
              <Placeholder>
                <Placeholder.Paragraph>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Paragraph>
              </Placeholder>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

const ProductStoreInfo = ({ product }) => (
  <Segment attached="bottom" style={{ backgroundColor: "#fbfbfb" }}>
    {product ? (
      product.store ? (
        <>
          <Header as="h3" dividing>
            {product.store.title}
            <Header.Subheader>{product.store.description}</Header.Subheader>
          </Header>
          <p>
            <Icon name="user" /> Pemilik Toko: {product.store.user.fullname}
            {" - "}
            <Link href={storeUrl(product.store)}>
              <a>
                <Icon name="store" /> Cek jualan lainnya
              </a>
            </Link>
          </p>
        </>
      ) : (
        <NA>Tidak ada info toko</NA>
      )
    ) : (
      <Placeholder>
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder>
    )}
  </Segment>
);

export default function DetailProduct({
  product: productProps,
  error: errorProps,
}) {
  const router = useRouter();
  const { id } = router.query;
  const [error, setError] = useState(errorProps || null);
  const [product, setProduct] = useState(productProps || null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [chooseModalVisible, setChooseModalVisible] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);

  async function _getDetail() {
    try {
      setLoading(true);
      const data = await getProduct(id);
      setProduct(data);
      setError(null);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  function handleBuy() {
    event("begin_checkout", "ecommerce");
    setModalVisible(true);
  }

  function handleChat() {
    if (product.store.phonenumberAkhwat) {
      setChooseModalVisible(true);
      return;
    }
    sendChat(product.store.phonenumber);
  }

  function handleShare() {
    setShareModalVisible(true);
  }

  function sendChat(number) {
    let message =
      "Assalamu'alaikum," +
      "\nAna mau bertanya ttg produk yg sedang dijual di KarsagiMarket: " +
      "\n" +
      product.name;
    window.open(whatsappUrl(number, message));
    event("chat", "ecommerce");
  }

  useEffect(() => {
    // refresh with new data
    if (id && !router.isFallback) _getDetail();
  }, [id, router.isFallback]);

  // useEffect(() => {
  //   if (productProps) setProduct(productProps);
  // }, [productProps]);

  // useEffect(() => {
  //   if (errorProps) setError(errorProps);
  // }, [errorProps]);

  return (
    <>
      <NextSeo
        title={product ? `Jual ${product.name}` : undefined}
        description={
          product
            ? seoDescription(
                `Dijual ${product.name} ${currencyFormat(
                  product.promoPrice || product.price
                )} ${product.description}`
              )
            : undefined
        }
        canonical={productUrl(product, true)}
      />
      <SearchBox />
      {error && (
        <Message error>
          {error.raw && error.raw.name == "NotFound" ? (
            <>
              <Message.Header>Produk tidak ditemukan</Message.Header>
              Oops, kami tidak menemukan produk yg anda cari. Ada beberapa
              kemungkinan:
              <br />- Apakah alamat URL produk sudah benar ?
              <br />- Penjual sudah menghapus produk ini dari toko
              <br />- ID: {id}
            </>
          ) : (
            <>
              <Message.Header>
                {(error.raw && error.raw.name) || "Error"}
              </Message.Header>
              {error.message}
            </>
          )}
        </Message>
      )}
      {!error && (
        <>
          <ProductTitle product={product} />
          <ProductInfoDescription
            product={product}
            onBuy={handleBuy}
            onChat={handleChat}
            onShare={handleShare}
          />
          <ProductStoreInfo product={product} />
        </>
      )}
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
            onClose={() => {
              setChooseModalVisible(false);
            }}
            onSelected={(phonenumber) => {
              setChooseModalVisible(false);
              sendChat(phonenumber);
            }}
            store={product.store}
            size="tiny"
          />
        </>
      )}
      <ModalShare
        open={shareModalVisible}
        onClose={() => {
          setShareModalVisible(false);
        }}
        size="tiny"
      />
    </>
  );
}

// IF YOU WANT TO ENABLE SSG
export async function getStaticPaths() {
  //generate nothing
  const resp = await fetchProductIds();
  const paths = resp.data.data.map((p) => {
    return {
      params: { id: p._id, slug: p.slug || "-" },
    };
  });
  return {
    //paths: [{ params: { id: "5eb79cf83676344d73d6b457" } }],
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const id = params.id;
  try {
    const resp = await fetchProduct(id);
    // Pass post data to the page via props
    return { props: { product: resp.data, error: null } };
  } catch (error) {
    return { props: { product: null, error: error.response.data } };
  }
}
