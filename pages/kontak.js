import styled from "styled-components";
import { Container, Header, Segment, Button, Icon } from "semantic-ui-react";
import PageContainer from "../components/PageContainer";
import Head from "next/head";
import Link from "next/link";

export default function Help() {
  return (
    <PageContainer>
      <Segment>
        <Header as="h2">Kontak Kami</Header>
        <p>Silahkan menghubungi tim kami jika:</p>
        <ul>
          <li>Ada kendala/bug teknis yg dialami</li>
          <li>Ada masukan/feedback mengenai web ini</li>
          <li>Penawaran peluang/kerjasama</li>
          <li>Info lainnya</li>
        </ul>
        <Button
          color="blue"
          onClick={() => window.open("mailto:bayufa@live.com")}
        >
          <Icon name="mail" />
          Kirim Email
        </Button>
      </Segment>
    </PageContainer>
  );
}
