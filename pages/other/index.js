import { List, Icon, Button, Divider } from "semantic-ui-react";
import Link from "next/link";
import Router from "next/router";
import { useConnect } from "remx";
import authStore from "../../stores/authStore";
import { logout } from "../../stores/authActions";
import { NextSeo } from "next-seo";

export default function LainLain({ props }) {
  const { user } = connect(props);

  async function handleLogout() {
    await logout();
    Router.replace("/");
  }

  return (
    <>
      <NextSeo title="Lain-Lain" />
      <List relaxed>
        <List.Item>
          <Link href="/about">
            <Button fluid>Tentang Kami</Button>
          </Link>
        </List.Item>
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
          <Link href="/ketentuan">
            <Button fluid>Syarat & Ketentuan</Button>
          </Link>
        </List.Item>
        <List.Item>
          <Link href="/kontak">
            <Button fluid>Kontak / Lapor</Button>
          </Link>
        </List.Item>
        {user && (
          <>
            <Divider />
            <List.Item>
              <Button basic fluid color="red" onClick={handleLogout}>
                LOGOUT ({user.fullname})
              </Button>
            </List.Item>
          </>
        )}
      </List>
    </>
  );
}

const connect = (props) =>
  useConnect(() => ({
    user: authStore.getUser(),
  }));
