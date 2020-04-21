import React from "react";
import Router from "next/router";
import NProgress from "nprogress";

import "../.semantic/dist/semantic.min.css";
import "../static/css/nprogress.css";

// show progress on route changes
NProgress.configure({ showSpinner: false });
Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
