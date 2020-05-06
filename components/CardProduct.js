import React, { useEffect } from "react";
//import styled from "styled-components";
import { Card, Image } from "semantic-ui-react";
import { currencyFormat } from "../utils/format";
import { image200, image600 } from "../utils/images";

const Product = ({ product: p, ...props }) => {
  return (
    <Card link {...props}>
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
            : !!p.promoPrice
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
        <Card.Meta>
          <span style={{ color: "#f2711c" }}>
            {currencyFormat(p.promoPrice || p.price, true)}
          </span>
          {!!p.promoPrice && (
            <>
              {" "}
              <span style={{ textDecoration: "line-through" }}>
                {currencyFormat(p.price, false)}
              </span>
            </>
          )}
        </Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default Product;
