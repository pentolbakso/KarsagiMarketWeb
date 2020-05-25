import React, { useEffect } from "react";
import { List } from "semantic-ui-react";
import Link from "next/link";
import Router from "next/router";

const Footer = (props) => {
  return (
    <div style={{ marginTop: "1em", marginBottom: "2em" }}>
      <List floated="right" horizontal>
        {/* <List.Item disabled>© Karsagi 2020.</List.Item> */}
        <List.Item>
          <Link href="/kontak">
            <a>Kontak</a>
          </Link>
        </List.Item>
      </List>

      <List horizontal>
        <List.Item>
          <Link href="/">
            <a>Home</a>
          </Link>
        </List.Item>
        <List.Item>
          <Link href="/about">
            <a>Tentang</a>
          </Link>
        </List.Item>
        <List.Item>
          <Link href="/carakerja">
            <a>Cara Kerja</a>
          </Link>
        </List.Item>
        <List.Item>
          <Link href="/bantuan">
            <a>Bantuan</a>
          </Link>
        </List.Item>
        <List.Item>
          <Link href="/ketentuan">
            <a>Syarat Ketentuan</a>
          </Link>
        </List.Item>
      </List>
    </div>
  );
};

export default Footer;
