import PageContainer from "./PageContainer";
import Navbar from "./Navbar";
import Footer from "./Footer";

const SiteLayout = ({ children }) => (
  <PageContainer>
    <Navbar />
    <>{children}</>
    <Footer />
  </PageContainer>
);

export default SiteLayout;
