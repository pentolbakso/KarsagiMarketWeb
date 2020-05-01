import React from "react";
import Router from "next/router";
import NProgress from "nprogress";
import App from "next/app";

import "../.semantic/dist/semantic.min.css";
import "../static/css/nprogress.css";
//import "dayjs/locale/id"; // set locale to indonesia
import SiteLayout from "../components/SiteLayout";

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

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

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
