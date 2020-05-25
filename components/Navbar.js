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
import Router, { useRouter } from "next/router";
import { useConnect } from "remx";
import { loadSession, logout } from "../stores/authActions";
import authStore from "../stores/authStore";
import useResponsive from "../hooks/useResponsive";

const topPages = ["/", "/cari", "/pesan", "/tokosaya/dashboard", "/other"];

const Navbar = (props) => {
  const { user } = connect(props);
  const router = useRouter();
  const { isMobile, isClient } = useResponsive();

  const isTopPage = topPages.indexOf(router.pathname) >= 0;
  //console.log("isTop", isTopPage);

  async function handleLogout() {
    await logout();
    Router.replace("/");
  }

  function handleBack() {
    Router.back();
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
            Pasar Karsagi
          </Header>
        </a>
      </Link> */}
      <Menu
        fixed="top"
        borderless
        style={{
          height: 50,
          background: "rgb(255,255,255)",
          background:
            "linear-gradient(93deg, rgba(255,255,255,1) 0%, rgba(239,255,241,1) 50%, rgba(255,255,255,1) 100%)",
        }}
      >
        <Container text>
          {!isTopPage && (
            <Menu.Item header onClick={() => handleBack()}>
              <Header as="h4" style={{ color: "#666" }}>
                <Icon name="left arrow" />
              </Header>
            </Menu.Item>
          )}
          <div
            style={{
              position: "absolute",
              margin: "auto",
              top: 15,
              left: 50,
              right: 50,
              textAlign: "center",
              //zIndex: -1000,
            }}
          >
            <Link href="/">
              <Header as="h3" color="green">
                Pasar Karsagi
              </Header>
            </Link>
          </div>
          {!isMobile && (
            <Menu.Menu position="right">
              {user && (
                <Dropdown item icon="caret down" text={user.fullname}>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleOpenPage("/tokosaya")}>
                      <a>Toko Saya</a>
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleOpenPage("/tokosaya/editprofil")}
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
          )}
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
