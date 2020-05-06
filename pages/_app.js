import React from "react";
import Router from "next/router";
import NProgress from "nprogress";
import App from "next/app";

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
      <SiteLayout>
        <Component {...pageProps} />
      </SiteLayout>
    );
  }
}

export default MyApp;
