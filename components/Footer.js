import React, { useEffect } from "react";
import styled from "styled-components";
import { List } from "semantic-ui-react";
import Link from "next/link";
import Router from "next/router";
import { useConnect } from "remx";
import { loadSession, logout } from "../stores/authActions";
import authStore from "../stores/authStore";

const Footer = (props) => {
  const { user } = connect(props);

  return (
    <div style={{ marginTop: "1em", marginBottom: "2em" }}>
      <List floated="right" horizontal>
        <List.Item disabled href="#">
          © Karsagi 2020.
        </List.Item>
        <List.Item href="#">
          <Link href="/kontak">Kontak</Link>
        </List.Item>
      </List>

      <List horizontal>
        <List.Item>
          <Link href="/about">Tentang</Link>
        </List.Item>
        <List.Item>
          <Link href="/bantuan">Bantuan</Link>
        </List.Item>
      </List>
    </div>
  );
};

const connect = (props) =>
  useConnect(() => ({
    user: authStore.getUser(),
  }));

export default Footer;
