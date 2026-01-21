
import type { ReactElement } from "react";
import Navbar from "../shared-components/Navbar";

const Home: React.FC = (): ReactElement => {
  return (
    <>
      <Navbar fiscImageLogo="src/assets/fiscLogo.png" 
      navbarMenuIcon="fa-solid fa-bars text-slate-400 text-2xl cursor-pointer" 
      showNavbarMenuIcon={true} 
      showFiscImageLogo={true}
      />
    </>
  )
}

export default Home;
