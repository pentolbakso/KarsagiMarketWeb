import React, { useEffect } from "react";
import Router from "next/router";
import { useConnect } from "remx";
import authStore from "../../stores/authStore";
import { logout } from "../../stores/authActions";

export default function Home(props) {
  const { user, tokenExpired } = connect(props);

  useEffect(() => {
    if (tokenExpired) {
      if (user) {
        logout().then(() => {
          Router.push(
            "/login?message=Sesi%20sudah%20kadaluwarsa%21%20Silahkan%20login%20ulang."
          );
        });
      } else {
        Router.push("/login");
      }
    } else {
      Router.push("/tokosaya/dashboard");
    }
  }, [user, tokenExpired]);

  return <p>Loading...</p>;
}

const connect = () =>
  useConnect(() => ({
    tokenExpired: authStore.isTokenExpired(),
    user: authStore.getUser(),
  }));
