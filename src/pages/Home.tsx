
import type { ReactElement } from "react";
import Navbar from "../shared-components/Navbar";

const Home: React.FC = (): ReactElement => {
  return (
    <>
      <Navbar img="src/assets/fiscLogo.png" menuIcon="fa-solid fa-bars text-slate-400 text-2xl cursor-pointer" showIcon={true}/>
      
    </>
  )
}

export default Home;
