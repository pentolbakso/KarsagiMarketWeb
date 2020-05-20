import { Segment, Header, Icon } from "semantic-ui-react";

export default function Pesan({ props }) {
  return (
    <Segment placeholder basic>
      <Header icon color="grey">
        <Icon name="bell outline" />
        Belum ada pesan / berita
      </Header>
    </Segment>
  );
}
