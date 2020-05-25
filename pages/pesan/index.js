import { Segment, Header, Icon } from "semantic-ui-react";
import { NextSeo } from "next-seo";

export default function Pesan({ props }) {
  return (
    <>
      <NextSeo title="Pesan Masuk" />
      <Segment placeholder basic>
        <Header icon color="grey">
          <Icon name="bell outline" />
          Belum ada pesan / berita
        </Header>
      </Segment>
    </>
  );
}
