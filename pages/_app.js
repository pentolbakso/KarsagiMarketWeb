import React from "react";
import Router from "next/router";
import NProgress from "nprogress";
import App from "next/app";
import { DefaultSeo } from "next-seo";

import "../.semantic/dist/semantic.min.css";
import "../static/css/nprogress.css";
import SiteLayout from "../components/SiteLayout";
import * as gtag from "../lib/gtag";

// show progress on route changes
NProgress.configure({ showSpinner: false });
Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = (url) => {
  NProgress.done();
  gtag.pageview(url);
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <DefaultSeo
          openGraph={{
            type: "website",
            locale: "id_ID",
            url: "https://karsagi.com/",
            site_name: "Karsagi Pasar Halal",
          }}
          titleTemplate="%s | Pasar Karsagi"
        />
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
      </>
    );
  }
}

export default MyApp;
