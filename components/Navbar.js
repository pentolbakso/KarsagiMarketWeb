import React, { useEffect } from "react";
import {
  Container,
  Header,
  Segment,
  Button,
  Icon,
  Menu,
  Dropdown,
} from "semantic-ui-react";
import Link from "next/link";
import Router from "next/router";
import { useConnect } from "remx";
import { loadSession, logout } from "../stores/authActions";
import authStore from "../stores/authStore";

const Navbar = (props) => {
  const { user } = connect(props);

  async function handleLogout() {
    await logout();
    Router.replace("/");
  }

  function handleOpenPage(page) {
    Router.push(page);
  }

  useEffect(() => {
    loadSession();
  }, []);

  return (
    <>
      {/* <Link href="/">
        <a>
          <Header as="h3" color="green">
            <Icon name="store" />
            KarsagiMarket
          </Header>
        </a>
      </Link> */}
      <Menu fixed="top" borderless>
        <Container text>
          <Menu.Item header onClick={() => handleOpenPage("/")}>
            <Header as="h4" color="green">
              <Icon name="store" />
              KarsagiMarket
            </Header>
          </Menu.Item>
          <Menu.Menu position="right">
            {user && (
              <Dropdown item icon="caret down" text={user.fullname}>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handleOpenPage("/penjual/tokosaya")}
                  >
                    <a>Toko Saya</a>
                  </Dropdown.Item>
                  {/* <Dropdown.Item
                onClick={() => handleOpenPage("/penjual/edittoko")}
              >
                <a>Edit Toko</a>
              </Dropdown.Item> */}
                  <Dropdown.Item
                    onClick={() => handleOpenPage("/penjual/editprofil")}
                  >
                    <a>Edit Profil</a>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    <a>Logout</a>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
            {!user && (
              <Link href="/login">
                <Menu.Item name="login" />
              </Link>
            )}
          </Menu.Menu>
        </Container>
      </Menu>
    </>
  );
};

const connect = (props) =>
  useConnect(() => ({
    user: authStore.getUser(),
  }));

export default Navbar;
