import PageContainer from "./PageContainer";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BottomTabs from "./BottomTabs";
import useResponsive from "../hooks/useResponsive";

const SiteLayout = ({ children }) => {
  const { isMobile, isClient } = useResponsive();
  return (
    <PageContainer>
      <Navbar isMobile={isMobile} />
      <div style={{ paddingTop: 60 }} />
      <>{children}</>
      <div style={{ paddingBottom: isMobile ? 70 : 0 }} />
      {isMobile ? <BottomTabs /> : <Footer />}
    </PageContainer>
  );
};

export default SiteLayout;
