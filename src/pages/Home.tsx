
import type { ReactElement } from "react";
import Navbar from "../shared-components/layout/Navbar";

const Home: React.FC = (): ReactElement => {
  return (
    <>
      <Navbar showNavbarMenuIcon={true} showFiscImageLogo={false} />
    </>
  )
}

export default Home;
