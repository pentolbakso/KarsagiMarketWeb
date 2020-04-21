import styled from "styled-components";
import { Container, Header, Segment, Button, Icon } from "semantic-ui-react";
import PageContainer from "../../components/PageContainer";
import Head from "next/head";

export default function About() {
  return (
    <PageContainer>
      <Segment placeholder>
        <Header as="h2">Success</Header>
        <p>Kajian Rutin Sabtu Pagi</p>
      </Segment>
    </PageContainer>
  );
}
