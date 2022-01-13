import { Container, Center } from "@chakra-ui/layout";
import { Box, Image } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Header from "components/Header";
import Footer from "components/Footer";
import HomeBanner from "components/HomeBanner";
import { Outlet } from "react-router-dom";

const Root = ({
  appchains,
  appchainInfo,
}: {
  appchains: any[];
  appchainInfo: any;
}) => {
  const location = useLocation();
  const isHome = location.pathname == "/home";
  return (
    <div>
      <Header appchains={appchains} appchainInfo={appchainInfo} />
      {isHome && <HomeBanner />}
      <Container
        maxW="container.xl"
        p={5}
        minH={isHome ? `calc(100vh - 457px)` : `calc(100vh - 157px)`}
      >
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default Root;
