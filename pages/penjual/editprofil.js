import React from "react";
import { Header, Segment } from "semantic-ui-react";
import { useConnect } from "remx";
import { NextSeo } from "next-seo";

export default function EditProfil() {
  return (
    <>
      <NextSeo title="Ubah Profil" noindex={true} />
      <Segment>
        <Header as="h3">Ubah Profil</Header>
        <p>Development in-progress</p>
      </Segment>
    </>
  );
}
