import { List, Icon, Button } from "semantic-ui-react";
import Link from "next/link";

export default function LainLain({ props }) {
  return (
    <List relaxed>
      <List.Item>
        <Link href="/bantuan">
          <Button fluid>Bantuan</Button>
        </Link>
      </List.Item>
      <List.Item>
        <Link href="/carakerja">
          <Button fluid>Cara Kerja</Button>
        </Link>
      </List.Item>
      <List.Item>
        <Link href="/about">
          <Button fluid>Tentang Kami</Button>
        </Link>
      </List.Item>
      <List.Item>
        <Link href="/kontak">
          <Button fluid>Kontak Kami</Button>
        </Link>
      </List.Item>
    </List>
  );
}
