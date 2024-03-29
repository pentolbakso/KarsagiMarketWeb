import React, { useEffect } from "react";
import { Icon, Menu } from "semantic-ui-react";
import Router, { useRouter } from "next/router";
import { useConnect } from "remx";
import authStore from "../stores/authStore";

const MenuItem = ({ to, icon, text, active }) => {
  function handleOpenPage(page) {
    Router.push(page);
  }

  return (
    <Menu.Item link onClick={() => handleOpenPage(to)}>
      <Icon name={icon} style={{ color: active ? "#21BB46" : "#666" }} />
      <span
        style={{
          fontWeight: 400,
          color: active ? "#21BB46" : "#666",
          letterSpacing: 0.5,
        }}
      >
        {text}
      </span>
    </Menu.Item>
  );
};

const BottomTabs = (props) => {
  const router = useRouter();
  const path = router.pathname;
  const { user } = connect(props);

  return (
    <>
      <Menu fixed="bottom" widths={5} icon="labeled" size="small">
        <MenuItem text="Beranda" to="/" icon="home" active={path === "/"} />
        <MenuItem
          text="Cari"
          to="/cari"
          icon="search"
          active={path == "/cari"}
        />
        <MenuItem
          text="Pesan"
          to="/pesan"
          icon="bell outline"
          active={path == "/pesan"}
        />
        <MenuItem
          text="Toko Saya"
          to={user ? "/tokosaya/dashboard" : "/login"}
          icon="store"
          active={path == "/tokosaya/dashboard"}
        />
        <MenuItem
          text="Lain-Lain"
          to="/other"
          icon="ellipsis horizontal"
          active={path == "/other"}
        />
      </Menu>
    </>
  );
};

const connect = () =>
  useConnect(() => ({
    user: authStore.getUser(),
  }));

export default BottomTabs;
